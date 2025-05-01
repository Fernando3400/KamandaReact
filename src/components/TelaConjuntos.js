import React from "react";
import HeaderEstabelecimento from "./HeaderEstabelecimento";
import BarraLateral from "./BarraLateral";
import Rodape from "./Rodape";
import "./minhaLoja.css";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { useNavigate } from "react-router-dom";
import { propiedadesDoTema } from "../utils/tema";
import { useState, useEffect } from "react";
import {
  TextField,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  Button,
  Box,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
} from "@mui/material";
import "../utils/StringUtil"
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import { formatarPreco } from "../utils/StringUtil";
import { Padding } from "@mui/icons-material";


function TelaConjuntos() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [dialogoDeErro, definirExibicaoDialogoDeErro] = useState(false)
  const [conjuntos, setConjuntos] = useState([])
  const [conjuntoInspecionado, setConjuntoInspecionado] = useState(null)
  const [produtoASerAdicionado, setProdutoASerAdicionado] = useState(null)
  const [telaConjunto, setTelaConjunto] = useState(false)
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([])

  const [textoDeErro, definirTextoDeErro] = useState("")
  const tema = createTheme(propiedadesDoTema);

  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  const adicionarProdutoAoConjunto = async () => {

    try {
      const response = await axios.post(
        ip + "/loja/conjunto/adicionarproduto",
        {
          idProduto: produtoASerAdicionado.id,
          idConjunto: conjuntoInspecionado.id,

        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );
      window.location.reload()
      setTelaConjunto(false)
      setProdutoASerAdicionado(null)
    } catch (error) {

    }

  };
  const removerProdutoDoConjunto = async (produto) => {

    try {
      console.log( produto)
      const response = await axios.post(
        ip + "/loja/conjunto/removerproduto",
        {
          idProduto: produto.id,
          idConjunto: conjuntoInspecionado.id,

        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );
      var c= response.data
      setConjuntoInspecionado(c)
      setTelaConjunto(false)
      window.location.reload()
      setProdutoASerAdicionado(null)
    } catch (error) {

    }

  };
  const criarConjunto = async () => {

    try {
      const response = await axios.post(
        ip + "/loja/conjunto/criar",
        {

        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );
      window.location.reload()
    } catch (error) {

    }
  };
  const obterTelaConjunto = async () => {

    try {
      const response = await axios.post(
        ip + "/loja/conjunto/inicio",
        {

        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );
      console.log(response.data)
      setConjuntos(response.data.conjuntos)
      setProdutosDisponiveis(response.data.produtos)
      console.log(produtosDisponiveis)
      console.log(conjuntos)
    } catch (error) {

    }
  };
  useEffect(() => {
    obterTelaConjunto()
  }, []);

  const deletarConjunto = async (id) => {

    try {
      const response = await axios.post(
        ip + "/loja/conjunto/deletar",
        {
          id: id
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );
    } catch (error) {

    }
    window.location.reload()
  };
  useEffect(() => {

  }, []);

  return (
    <ThemeProvider theme={tema}>

      <Dialog open={telaConjunto}>
        <DialogTitle><Typography color={"black"} variant="h5">Conjunto</Typography></DialogTitle>
        <DialogContent >

          <Stack direction={"column"} justifyContent={"start"} alignItems={"center"} width={"30vw"} height={"50vh"}>
            <Stack direction={"row"} width={" 100%"} display={"flex"} paddingBottom={"20px"} justifyContent={"space-around"}>
              <TextField

                select
                label="Produtos da loja"
                variant="outlined"
                sx={{ width: "100%" }}
                value={produtoASerAdicionado}
                onChange={(e) => {
                  setProdutoASerAdicionado(e.target.value);
                }}
              >
                {produtosDisponiveis.map((p) => (
                  <MenuItem sx={{ margin: "5px" }} key={p.nome} value={p}>
                    {p.nome}
                  </MenuItem>
                ))
                }
              </TextField>
              <Button variant="contained" onClick={() => {

                adicionarProdutoAoConjunto()
              }}>
                <Typography textTransform={"none"}>
                  Adicionar
                </Typography>
              </Button>
            </Stack>

            <Stack justifyContent={"center"} width={"100%"} border={"2px"} borderColor={"black"}>

              {

              }
              <Button onClick={() => {
                adicionarProdutoAoConjunto(produtoASerAdicionado, conjuntoInspecionado.id)
              }}>
              </Button>
              {conjuntoInspecionado != null && conjuntoInspecionado.produtos != null && conjuntoInspecionado.produtos.map((produto) => (
                <Stack direction={"row"} display="flex" justifyContent={"space-around"}>
                  <Typography>{produto.nome}</Typography>
                  <Button variant="contained" onClick={(e) => {
                      removerProdutoDoConjunto(produto)
                  }}>
                    <Typography textTransform={"none"}>
                      Remover Produto
                    </Typography>
                  </Button>
                </Stack>
              ))}





            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>


          <Button onClick={() => {
            setTelaConjunto(false)
          }}>
            <Typography>
              Fechar
            </Typography>
          </Button>

        </DialogActions>
      </Dialog>
      <HeaderEstabelecimento logo={true} />
      <Stack direction={"row"} width={"100%"}>
        <BarraLateral width="30vw" />
        <Stack direction={"column"} width={"100%"}>
          <Stack direction={"row"} width={"100%"} justifyContent={"center"} marginTop={"20px"}>
            <Button variant="contained" onClick={() => { criarConjunto() }}> <Typography textTransform={"none"} fontSize={"1em"}>Criar Conjunto</Typography></Button>
          </Stack>
          {conjuntos.length > 0 && conjuntos.map((conjunto) => (
            <Stack direction={"row"} border="2px" display={"flex"} sx={{ paddingY: "5px", justifyContent: "space-evenly" }} width={"100%"} alignItems={"center"}>
              <Typography color={"black"}>{conjunto.id}</Typography>
              <Typography color={"black"}>
                {" Conjunto com " + conjunto.produtos.length + " Produtos"}
              </Typography>
              <Stack direction={"column"}>
                <Button variant="contained" onClick={() => {
                  deletarConjunto(conjunto.id)
                }}>
                  <Typography textTransform={"none"}>
                    Deletar Conjunto
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(conjunto)
                    setConjuntoInspecionado(conjunto)
                    setTelaConjunto(true)
                  }}>
                  <Typography textTransform={"none"}>
                    Editar Conjunto
                  </Typography>
                </Button>
              </Stack>

            </Stack>
          ))}
          {conjuntos.length == 0 && (
            <Stack direction={"column"} alignItems={"center"} width={"70vw"}>
              <RenderizadorDeImagem preto="true" width="150px" height="150px" />
              <Typography color={"black"}>
                Não há conjuntos cadastrados
              </Typography>
            </Stack>
          )}
        </Stack>
        <Typography color={"black"}></Typography>
      </Stack>

      <Rodape />
    </ThemeProvider>
  );
}

export default TelaConjuntos;
