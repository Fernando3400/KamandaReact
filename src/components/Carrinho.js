import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { ambiente, devIp, prodIp } from "../propriedades";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import { InicioContext } from "./InicioContext";

function Carrinho() {
  const tema = useTheme();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const contexto = useContext(InicioContext);


  const [carrinhoAberto, setCarrinhoAberto] = useState(localStorage.getItem("carrinhoAberto") == "true");
  const [carrinho, setCarrinho] = useState(null);
  const [quantidadeOriginal, setQuantidadeOriginal] = useState(new Map()); // Armazena a quantidade original
  const [produtosEditados, setProdutosEditados] = useState(new Map()); // Armazena a diferença da quantidade

  let ip = ambiente === "dev" ? devIp : prodIp;
  console.log(carrinhoAberto)
  useEffect(() => {
    obterCarrinho();
    
  }, []);
  const obterCarrinho = async () => {
    try {
      const resposta = await axios.get(ip + "/loja/carrinho", {
        headers: { Authorization: token },
      });

      if (resposta.status === 200) {
        setCarrinho(resposta.data);
        console.log(resposta.data)
        // Armazena as quantidades originais ao carregar o carrinho
        const originalMap = new Map();
        resposta.data.produtos.forEach((produto, index) => {
          originalMap.set(index, produto.quantidade);
        });
        setQuantidadeOriginal(originalMap);
        setProdutosEditados(new Map()); // Reseta as edições
      }
    } catch (error) {
      if(error.response.status ==  403){
        localStorage.setItem("token", null)
        localStorage.setItem("usuario", null)
      }
      console.error("Erro ao obter carrinho:", error);
    }
  };

  const editarCarrinho = async () => {
    if (!carrinho) return;

    const produtosParaAtualizar = [];
    produtosEditados.forEach((diferenca, index) => {
      if (diferenca !== 0) {
        produtosParaAtualizar.push({
          id: carrinho.produtos[index].id,
          quantidade: diferenca, // Envia apenas a diferença
          tamanho:carrinho.produtos[index].tamanho
        });
      }
    });

    console.log("Enviando para o backend:", produtosParaAtualizar);

    if (produtosParaAtualizar.length === 0) return;

    try {
      const resposta = await axios.post(
        ip + "/loja/adicionarprodutoaocarrinho",
        { produtos: produtosParaAtualizar },
        { headers: { Authorization: token } }
      );

      if (resposta.status === 200) {
        setProdutosEditados(new Map()); // Limpa a lista de edições após salvar
        obterCarrinho(); // Repopula o carrinho
      }
    } catch (error) {
      console.error("Erro ao editar carrinho:", error);
    }
  };

  const alterarQuantidadeItem = (index, novaQuantidade) => {
    if (novaQuantidade < 0) return;

    setCarrinho((prevCarrinho) => {
      const novoCarrinho = { ...prevCarrinho };
      novoCarrinho.produtos[index].quantidade = novaQuantidade;
      return novoCarrinho;
    });

    // Calcula a diferença em relação à quantidade original
    setProdutosEditados((prevEdicoes) => {
      const novaDiferenca = novaQuantidade - quantidadeOriginal.get(index);
      const novoMapa = new Map(prevEdicoes);
      novoMapa.set(index, novaDiferenca);
      return novoMapa;
    });
  };

  return (
    <>
      <IconButton
        onClick={() => {
          obterCarrinho();
          setCarrinhoAberto(true);
        }}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          border: 2,
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        <ShoppingCartIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={carrinhoAberto}
        onClose={() => {
          localStorage.setItem("carrinhoAberto", "false");
          setCarrinhoAberto(false);
        }}
      >
        <Box height width={300} p={2} sx={{ backgroundColor: "white" }}>
          <Typography variant="h6" textAlign="center">Carrinho</Typography>
          <Stack spacing={2} mt={2} display="flex" alignItems="center" direction="column">
            {carrinho && carrinho.produtos.length > 0 ? (
              carrinho.produtos.map((item, index) => (
                <Box key={index} display="flex" justifyContent="space-between" gap={"15px"}>
                  <RenderizadorDeImagem width="70px" imagem={item.imagem} />
                  <Typography color={"black"}>{item.titulo}</Typography>

                  <Box display="flex" alignItems="center" gap={2} marginTop={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => alterarQuantidadeItem(index, item.quantidade - 1)}
                      sx={{ minWidth: "30px", padding: "5px" }}
                    >
                      <Remove fontSize="small" />
                    </Button>
                    <Typography fontSize={20}>{item.quantidade}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => alterarQuantidadeItem(index, item.quantidade + 1)}
                      sx={{ minWidth: "30px", padding: "5px" }}
                    >
                      <Add fontSize="small" />
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography color={"black"}>Nenhum item no carrinho.</Typography>
            )}
          </Stack>

          {produtosEditados.size > 0 && (
            <Button fullWidth color="info" variant="contained" sx={{ mt: 2 }} onClick={

              editarCarrinho}>
              <Typography textTransform={"none"}>Salvar Alterações</Typography>
            </Button>

          )}
          {carrinho && carrinho.produtos.length > 0 &&
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => {
              if (carrinho)
                navigate("/entrega")
            }}>
              <Typography textTransform={"none"}>Finalizar Compra</Typography>
            </Button>
          }


        </Box>
      </Drawer>
    </>
  );
}

export default Carrinho;
