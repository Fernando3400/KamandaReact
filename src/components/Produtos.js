import React from "react";
import HeaderEstabelecimento from "./HeaderEstabelecimento";
import BarraLateral from "./BarraLateral";
import Rodape from "./Rodape";
import axios from "axios";
import { useState, useEffect } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import ItemCardapio from "./ItemCardapio";
import "./cardapio.css";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { propiedadesDoTema } from "../utils/tema";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function Produtos() {
  const [lista, setLista] = useState([]);
  const tema = createTheme(propiedadesDoTema);
  const [open, setOpen] = useState(false);
  const [dialogoAdicionarProdutoAberto, setDialogoAdicionarProdutoAberto] =
    useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [material, setMaterial] = useState("");
  const [estoqueProduto, setEstoque] = useState("");
  const [prazoDeEntrega, setPrazoDeEntrega] = useState("");
  const [calorias, setCalorias] = useState("");
  const [disponivel, setDisponivel] = useState(true);
  const [contemGluten, setContemGluten] = useState(false);
  const [telaAdicionarConjunto, setTelaAdicionarConjunto] = useState(false);
  const [produtosSelecionados,setProdutosSelecionados]= useState([]);
  const [categoria, setCategoria] = useState([]);
  const [cores, setCores] = useState([]);
  const [corSelecionada, setCorSelecionada] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [descricao, setDescricao] = useState("");
  const [campoImagemProdutoAdicionado, setCampoImagemProdutoAdicionado] =
    useState("");
  const [textoDialogoAdicionarProduto, setTextoDialogoAdicionarProduto] =
    useState(null);

  const definirImagemProdutoAdicionado = (event) => {
    try {
      // Verifica se o arquivo foi selecionado
      const file = event.target.files[0];
      if (!file) {
        throw new Error("Nenhum arquivo foi selecionado.");
      }

      // Valida o tipo do arquivo
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Tipo de arquivo inválido. Apenas JPEG e PNG são suportados.");
      }

      // Valida o tamanho do arquivo (opcional)
      const maxSizeMB = 5; // Tamanho máximo permitido (em MB)
      if (file.size > maxSizeMB * 1024 * 1024) {
        throw new Error(`O arquivo excede o tamanho máximo permitido de ${maxSizeMB} MB.`);
      }

      // Lê o arquivo como DataURL
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const url = event.target.result;

        const image = document.createElement("img");
        image.src = url;

        image.onload = () => {
          const larguraDesejada = 200;
          const alturaDesejada = 200;

          const canvas = document.createElement("canvas");
          canvas.width = larguraDesejada;
          canvas.height = alturaDesejada;

          const context = canvas.getContext("2d");
          context.clearRect(0, 0, larguraDesejada, alturaDesejada); // Limpa o canvas antes de desenhar
          context.drawImage(image, 0, 0, larguraDesejada, alturaDesejada);

          canvas.toBlob(
            async (blob) => {
              try {
                const arrayBuffer = await blob.arrayBuffer();
                const byteArray = new Uint8Array(arrayBuffer);

                // Converte o binário para Base64 de forma segura
                const base64Data = btoa(
                  new Uint8Array(arrayBuffer).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );

                // Define a imagem no campo, sem prefixo
                setCampoImagemProdutoAdicionado(base64Data);
              } catch (blobError) {
                console.error("Erro ao processar o blob:", blobError);
              }
            },
            "image/jpeg",
            0.9
          );
        };

        image.onerror = () => {
          console.error("Erro ao carregar a imagem.");
        };
      };

      reader.onerror = () => {
        console.error("Erro ao ler o arquivo.");
      };
    } catch (error) {
      console.error("Erro ao processar a imagem:", error.message);
    }
  };

  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const navegar = useNavigate();

  const adicionarProduto = async () => {
    let textoDialogo = "";
    let primeiraInvalidez = true;
    let numeroCamposInvalidos = 0;
    if (campoImagemProdutoAdicionado == null) {
      numeroCamposInvalidos += 1;
      if (primeiraInvalidez) {
        primeiraInvalidez = false;
        textoDialogo = "Imagem do produto";
      } else {
        textoDialogo = textoDialogo + ", imagem";
      }
    }

    if (nomeProduto == "") {
      numeroCamposInvalidos += 1;
      if (primeiraInvalidez) {
        textoDialogo = "nome";
        primeiraInvalidez = false;
      } else {
        textoDialogo = textoDialogo + ", nome";
      }
    }

    if (precoProduto == "") {
      numeroCamposInvalidos += 1;
      if (primeiraInvalidez) {
        textoDialogo = "Preço";
        primeiraInvalidez = false;
      } else {
        textoDialogo = textoDialogo + ", preço";
      }
    }
    if (marca == "") {
      numeroCamposInvalidos += 1;
      if (primeiraInvalidez) {
        textoDialogo = "nome";
        primeiraInvalidez = false;
      } else {
        textoDialogo = textoDialogo + ", nome";
      }
    }

    if (modelo == "") {
      if (primeiraInvalidez) {
        numeroCamposInvalidos += 1;
        textoDialogo = "Modelo";
        primeiraInvalidez = false;
      } else {
        textoDialogo = textoDialogo + ", modelo";
      }
    }
    if (descricao == "") {
      if (primeiraInvalidez) {
        numeroCamposInvalidos += 1;
        textoDialogo = "Descricao";
        primeiraInvalidez = false;
      } else {
        textoDialogo += ", descricao";
      }
    }


    if (estoqueProduto == "") {
      if (primeiraInvalidez) {
        numeroCamposInvalidos += 1;
        textoDialogo = "Estoque";
        primeiraInvalidez = false;
      } else {
        textoDialogo += ", estoque";
      }
    }


    if (textoDialogo != "") {
      if (numeroCamposInvalidos == 1) {
        textoDialogo += " invalido(a)";
      } else {
        textoDialogo += " invalidos(as)";
      }
      setDialogoAdicionarProdutoAberto(true);
      setTextoDialogoAdicionarProduto(textoDialogo);

      return;
    }

    const estabelecimentoId = localStorage.getItem("estabelecimentoId");
    
    try {
      const axiosInstance = axios.create({});
      console.log(categoriaSelecionada)
      const response = await axiosInstance.post(
        ip + "/loja/produto/adicionar",
        {
          imagem: campoImagemProdutoAdicionado,
          nome: nomeProduto,
          categoria: categoriaSelecionada,
          idDoEstabelecimento: estabelecimentoId,
          preco: precoProduto,
          cor: corSelecionada,
          marca: marca,
          modelo: modelo,
          descricao: descricao,
          tamanho: tamanho,
          material: material,
          estoque: estoqueProduto,
          disponivel: disponivel,
          prazoDeEntrega: prazoDeEntrega,
        },
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: localStorage.getItem("token"),
          }
        }
      );
      console.log(response.status)
      setOpen(false);
      setNomeProduto("");
      setPrecoProduto("");

      setCalorias("");
      setDisponivel(true);
      setContemGluten(false);
      setDescricao("");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error.response.status === 402) {
        navegar("/portal/login");
      }
    }
  };
  const obterProdutos = async () => {
    try {
      const response = await axios.post(
        ip + "/estabelecimento/listarprodutos",
        null,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setLista(response.data.lista);
      setCategoriaSelecionada(response.data.categoriaSelecionada);
      setCategoria(response.data.categorias);
      setCores(response.data.cores);
    } catch (error) {
      if (error.response.status === 402) {
        navegar("/portal/login");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    obterProdutos();
  }, []);

  return (
    <ThemeProvider theme={tema}>
      <HeaderEstabelecimento logo={true} />
      <div className="homeEstabelecimento">
        <BarraLateral />
        <Stack direction={"column"} alignItems={"center"} sx={{ backgroundColor: "#e2ffe4" }}>
          <Box>
            <Box>
              <Typography
                marginTop={"20px"}
                marginBottom={"20px"}
                textAlign="center"
                color={tema.palette.secondary.dark}
                variant="h3"
              >
                Produtos
              </Typography>
            </Box>
            <Stack direction={"row"} display={"flex"} gap={"20px"} fullWidth alignItems="center" >
              <Button
                variant="contained"
                onClick={handleOpen}
                marginTop={"20px"}
              >
                <Typography textTransform={"none"}>
                  Adicionar Produto
                </Typography>
              </Button>
              <Button
                
                variant="contained"
                onClick={() => {
                  navegar("/produtos/conjuntos")
                }}
                marginTop={"20px"}
              >
                <Typography textTransform={"none"} >
                  Conjuntos
                </Typography>
              </Button>
            </Stack>
            <Grid
              container
              width={"100%"}
              className="grade-cardapio"
              xs={"auto"}
              sx={{ gap: "15px", margin: "50px" }}
            >
              {lista.map((i) => {
                return <ItemCardapio props={i}></ItemCardapio>;
              })}
            </Grid>
          </Box>
        </Stack>
      </div>

      <Rodape />
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Item</DialogTitle>
        <DialogContent>
          <Dialog open={dialogoAdicionarProdutoAberto}>
            <DialogContent>
              <Typography>{textoDialogoAdicionarProduto}</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setDialogoAdicionarProdutoAberto(false);
                }}
              >
                <Typography textTransform="none">Ok</Typography>
              </Button>
            </DialogActions>
          </Dialog>
          <Stack direction={"row"}>
            <Typography alignContent="center" marginRight={"10px"}>
              Miniatura
            </Typography>
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              margin="normal"
              name="imagem"
              accept="image/*"
              onChange={(e) => {
                definirImagemProdutoAdicionado(e);
              }}
            />

          </Stack>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              adicionarProduto();
            }}
          >
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              name="nome"
              value={nomeProduto}
              onChange={(e) => {
                setNomeProduto(e.target.value);
              }}
            />
            <TextField
              select
              fullWidth
              label="Selecione a categoria"
              variant="outlined"
              margin="normal"
              value={categoriaSelecionada}
              onChange={(e) => {
                setCategoriaSelecionada(e.target.value);
              }}
            >
              {categoria.map((opcao) => (
                <MenuItem color="black" value={opcao.categoriaEnum}>
                  {opcao.nome}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Preço (R$)"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              name="preco"
              value={precoProduto}
              onChange={(e) => {
                setPrecoProduto(e.target.value);
              }}
            />
            <TextField
              select
              fullWidth
              label="Selecione a cor"
              variant="outlined"
              margin="normal"
              value={corSelecionada}
              onChange={(e) => {
                setCorSelecionada(e.target.value);
              }}
            >
              {cores.map((opcao) => (
                <MenuItem color="black" value={opcao.cor}>
                  {opcao.cor}
                </MenuItem>
              ))}
            </TextField>


            <TextField
              label="Marca"
              variant="outlined"
              fullWidth
              margin="normal"
              name="marca"
              value={marca}
              onChange={(e) => {
                setMarca(e.target.value);
              }}
            />
            <TextField
              label="Modelo"
              variant="outlined"
              fullWidth
              margin="normal"
              name="modelo"
              value={modelo}
              onChange={(e) => {
                setModelo(e.target.value);
              }}
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              margin="normal"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              multiline
              rows={4} // Define a quantidade de linhas visíveis
            />
            <TextField
              label="Tamanho"
              variant="outlined"
              fullWidth
              margin="normal"
              name="tamanho"
              value={tamanho}
              onChange={(e) => {
                setTamanho(e.target.value);
              }}
            />
            <TextField
              label="Material"
              variant="outlined"
              fullWidth
              margin="normal"
              name="material"
              value={material}
              onChange={(e) => {
                setMaterial(e.target.value);
              }}
            />
            <TextField
              label="Estoque"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              name="estoque"
              value={estoqueProduto}
              onChange={(e) => {
                setEstoque(e.target.value);
              }}
            />
            <TextField
              label="Prazo de entreda (em dias)"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              name="estoque"
              value={prazoDeEntrega}
              onChange={(e) => {
                setPrazoDeEntrega(e.target.value);
              }}
            />


            <FormControlLabel
              control={
                <Checkbox
                  name="disponivel"
                  checked={disponivel}
                  onChange={(e) => {
                    setDisponivel(e.target.checked);
                  }}
                />
              }
              label="Disponível"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                <Typography textTransform={"none"}>Cancelar</Typography>
              </Button>
              <Button type="submit" variant="contained" color="primary">
                <Typography textTransform={"none"}>Enviar</Typography>
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Adicionar Item</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              adicionarProduto();
            }}
          >
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              margin="normal"
              name="imagem"
              accept="image/*"
              onChange={(e) => {
                setCampoImagemProdutoAdicionado(e);
              }}
            />
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              name="nome"
              value={nomeProduto}
              onChange={(e) => {
                setNomeProduto(e.target.value);
              }}
            />
            <TextField
              label="Preço"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              name="preco"
              value={precoProduto}
              onChange={(e) => {
                setPrecoProduto(e.target.value);
              }}
            />

            <TextField
              label="Calorias"
              variant="outlined"
              fullWidth
              margin="normal"
              name="calorias"
              value={calorias}
              onChange={(e) => {
                setCalorias(e.target.value);
              }}
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              margin="normal"
              name="descricao"
              value={descricao}
              onChange={(e) => {
                setDescricao(e.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="contemGluten"
                  checked={contemGluten}
                  onChange={(e) => {
                    setContemGluten(e.target.checked);
                  }}
                />
              }
              label="Contém Glúten"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="disponivel"
                  checked={disponivel}
                  onChange={(e) => {
                    setDisponivel(e.target.checked);
                  }}
                />
              }
              label="Disponível"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                <Typography textTransform={"none"}>Cancelar</Typography>
              </Button>
              <Button type="submit" variant="contained" color="primary">
                <Typography textTransform={"none"}>Enviar</Typography>
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default Produtos;
