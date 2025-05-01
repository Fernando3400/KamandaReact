import HeaderEstabelecimento from "./HeaderEstabelecimento";
import BarraLateral from "./BarraLateral";
import "./editar-item-cardapio.modules.css";
import axios, { AxiosHeaders } from "axios";
import { useState, useEffect } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { propiedadesDoTema } from "../utils/tema";
import { useNavigate } from "react-router-dom";
import FormCriarEditarProduto from "./FormCriarEditarProduto";
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
} from "@mui/material";
import "../utils/StringUtil"
import { formatarPreco, formatarPrecoProduto } from "../utils/StringUtil";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import Rodape from "./Rodape";

function EditarItemCardapio(props) {
  const navigate = useNavigate();
  const id = localStorage.getItem("produto");
  const token = localStorage.getItem("token");
  const estabelecimentoId = useState(localStorage.getItem("estabelecimentoId"));
  const [trocouImagem, setTrocouImagem] = useState(false);
  const [telaEdicaoTags, setTelaEdicaoTags] = useState(false);
  const [rotulos, setRotulos] = useState([]);
  const [todosOsRotulos, setTodosOsRotulos] = useState(null);
  const [rotuloSelecionado, setRotuloSelecionado] = useState(null);
  const [campoImagem, setCampoImagem] = useState(null);
  const tema = createTheme(propiedadesDoTema);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [confirmacaoDelecao, setConfirmacaoDelecao] = useState(false);
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");

  const [disponivel, setDisponivel] = useState(true);

  const [descricao, setDescricao] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [p, setP] = useState(false)
  const [m, setM] = useState(false)
  const [g, setG] = useState(false)
  const [gg, setGG] = useState(false)
  const [g1, setG1] = useState(false)
  const [g2, setG2] = useState(false)
  const [g3, setG3] = useState(false)
  const [g4, setG4] = useState(false)


  useEffect(() => {
    obterTela();
  }, []);

  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }
  const enviarProduto = async () => {

    let precoEnviado = precoProduto
    precoEnviado = precoEnviado.split(",")[0]
    precoEnviado = precoEnviado.replace("R$", "")

    const resposta = await axios.post(
      ip.toString() + "/loja/produto/editar",
      {
        idDoProduto: id,
        nome: nomeProduto,
        preco: precoEnviado,
        imagem: campoImagem,
        trocouImagem: trocouImagem,
        descricao: descricao,
        disponivel: disponivel,
        categoria: categoriaSelecionada,
        p: p,
        m: m,
        g: g,
        gg: gg,
        g1: g1,
        g2: g2,
        g3: g3,
        g4: g4
        
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    window.location.reload()
  };
  const obterTela = async () => {
    const resposta = await axios.post(
      ip.toString() + "/loja/editarproduto",
      {
        idDoProduto: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    let precoRecebido = "R$" + resposta.data.preco + ",00"

    setRotulos(resposta.data.tags)

    console.log(resposta.data.tags)
    setTodosOsRotulos(resposta.data.todasAsTags)
    setCategoriaSelecionada(resposta.data.categoriaDoProduto.categoriaEnum);
    setCategorias(resposta.data.categorias);
    setNomeProduto(resposta.data.nome);
    setPrecoProduto(precoRecebido);
    console.log(resposta.data)
    setCampoImagem(resposta.data.image);
    setDescricao(resposta.data.descricao);
    setDisponivel(resposta.data.disponivel);
    setP(resposta.data.p)
    setM(resposta.data.m)
    setG(resposta.data.g)
    setGG(resposta.data.gg)
    setG1(resposta.data.g1)
    setG2(resposta.data.g2)
    setG3(resposta.data.g3)
    setG4(resposta.data.g4)
  };

  const deletarProduto = async () => {
    const resposta = await axios.post(
      ip.toString() + "/loja/produto/remover",
      {
        idProduto: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (resposta.status == 200) {
      navigate("/portal/estabelecimentos/produtos");
    }
  };

  const definirImagemProdutoEditado = (event) => {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        let url = event.target.result;


        let image = document.createElement("img");
        image.src = url;

        image.onload = () => {
          const larguraDesejada = 200;
          const alturaDesejada = 200;

          let canvas = document.createElement("canvas");
          canvas.width = larguraDesejada;
          canvas.height = alturaDesejada;

          let context = canvas.getContext("2d");

          context.drawImage(image, 0, 0, larguraDesejada, alturaDesejada);
          canvas.toBlob(
            async (blob) => {
              const arrayBuffer = await blob.arrayBuffer();
              const byteArray = new Uint8Array(arrayBuffer);
              const base64Data = btoa(
                String.fromCharCode.apply(null, byteArray)
              );
              setCampoImagem(base64Data);
              setTrocouImagem(true);
            },
            "image/png",
            0.9
          );
        };
      };
    } catch (error) {
      console.error("Erro ao processar a imagem:", error);
    }
  };





  const adicionarRotulo = async () => {
    console.log(rotuloSelecionado.tagEnum)
    const resposta = await axios.post(
      ip.toString() + "/loja/produto/tag/adicionar",
      {
        idProduto: id,
        rotuloEnum: rotuloSelecionado.tagEnum
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    window.location.reload()
  };
  const removerRotulo = async (tagEnum) => {
    const resposta = await axios.post(
      ip.toString() + "/loja/produto/tag/remover",
      {

        rotuloEnum: tagEnum,
        idProduto: id
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    window.location.reload()
  };

  const dialogoConfirmacaoDelecao = async () => {
    setConfirmacaoDelecao(true);
  };

  return (
    <ThemeProvider theme={tema}>
      <HeaderEstabelecimento logo={true} />
      <Stack direction={"row"}>
        <BarraLateral />

        <Stack direction={"row"} display={"flex"} sx={{
          justifyContent: "space-around",
          width: "100%"
        }}>
          <Stack direction={"column"} paddingTop={"50px"}>
            <RenderizadorDeImagem imagem={campoImagem} width={250} height={250} />
            <Button variant="outlined" onClick={() => {
              setTelaEdicaoTags(true)
            }} >
              <Typography textTransform={"none"}>Editar Tags</Typography>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setConfirmacaoDelecao(true);
              }}
            >
              {" "}
              <Typography textTransform={"none"}>Remover</Typography>{" "}
            </Button>
          </Stack>
          <Stack direction={"column"} paddingTop={"50px"}>
            <Typography color="black">
              Imagens do produto
            </Typography>
            <Stack direction={"row"} width={"100%"} marginTop="20px" justifyContent={"center"} sx={{
              border: 2,
              borderColor: "black",
              padding: 2
            }}>

            </Stack>
            <TextField
              type="file"
              variant="outlined"
              width="50%"
              margin="normal"
              name="imagem"
              accept="image/*"
              onChange={(e) => {
                definirImagemProdutoEditado(e);
              }}
            />
            <TextField
              label="Nome"
              variant="outlined"
              width="50%"
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
              {categorias.map((opcao) => (
                <MenuItem color="black" value={opcao.categoriaEnum}>
                  {opcao.nome}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Preço"
              variant="outlined"
              type="text"
              width="50%"
              margin="normal"
              name="preco"
              value={precoProduto}
              onChange={(e) => {
                formatarPreco(e.target.value, setPrecoProduto);
              }}
            />


            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              margin="normal"
              name="descricao"
              multiline
              value={descricao}
              onChange={(e) => {
                setDescricao(e.target.value);
              }}
            />
          </Stack>
          <Stack direction={"column"} paddingTop={"50px"}>
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
              label={<span style={{ color: "black" }}>Disponível</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="P"
                  checked={p}
                  onChange={(e) => {
                    setP(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>P</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="M"
                  checked={m}
                  onChange={(e) => {
                    setM(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>M</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="G"
                  checked={g}
                  onChange={(e) => {
                    setG(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>G</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="gg"
                  checked={gg}
                  onChange={(e) => {
                    setGG(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>GG</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="g1"
                  checked={g1}
                  onChange={(e) => {
                    setG1(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>G1</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="g2"
                  checked={g2}
                  onChange={(e) => {
                    setG2(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>G2</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="g3"
                  checked={g3}
                  onChange={(e) => {
                    setG3(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>G3</span>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="g4"
                  checked={g4}
                  onChange={(e) => {
                    setG4(e.target.checked);
                  }}
                />
              }
              label={<span style={{ color: "black" }}>G4</span>}
            />

          </Stack>
        </Stack>

        <Stack alignItems={"center"} justifyContent="end" direction={"row"}>
          <Button
            onClick={() => {
              navigate("/portal/estabelecimentos/produtos");
            }}
            color="primary"
          >
            <Typography textTransform={"none"}>Cancelar</Typography>
          </Button>
          <Button onClick={() => {
            enviarProduto()

           
          }} variant="contained" color="primary">
            <Typography textTransform={"none"}>Salvar</Typography>
          </Button>
        </Stack>
        <Dialog open={telaEdicaoTags}>
          <DialogContent >
            <Stack width="50vw" height="50vh">
              <Stack direction={"row"} width={"100%"}>
                <TextField
                  select
                  label="Rotulos da loja"
                  variant="outlined"
                  sx={{ width: "50%" }}
                  value={rotuloSelecionado}
                  onChange={(e) => {
                    setRotuloSelecionado(e.target.value);
                  }}
                >
                  {
                    todosOsRotulos != null && (
                      todosOsRotulos.map((p) => (
                        <MenuItem sx={{ margin: "5px" }} key={p.tagEnum} value={p}>
                          <Typography textTransform={"initial"}>{p.tagEnum.toLocaleLowerCase()}</Typography>
                        </MenuItem>
                      ))
                    )
                  }

                </TextField>
                <Button variant="outlined" onClick={() => {
                  adicionarRotulo()
                }}>
                  <Typography textTransform={"none"}>Adicionar Rotulo</Typography>
                </Button>
              </Stack>
              <Stack direction={"column"} width={"100%"} height={"100%"} marginTop={"20px"}>

                {rotulos.map((r) => (
                  <Stack direction="row" height={"50px"} display="flex" alignItems="center" justifyContent={"space-evenly"} width={"100%"}>
                    <Typography>
                      {r.tagEnum}
                    </Typography>
                    <Button sx={{ height: "80%" }}
                      variant="contained"
                      onClick={() => {
                        removerRotulo(r.tagEnum)
                      }}> <Typography textTransform={"none"}>Remover Rótulo</Typography></Button>
                  </Stack>
                ))}


              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => { setTelaEdicaoTags(false) }}>
              <Typography textTransform={"none"}>
                Fechar
              </Typography>
            </Button>

          </DialogActions>
        </Dialog>
        <Dialog
          open={confirmacaoDelecao}
          onClose={() => {
            setConfirmacaoDelecao(false);
          }}
        >
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogContent>Esta ação é irreversível.</DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setConfirmacaoDelecao(false);
              }}
            >
              <Typography textTransform={"none"}>Cancelar</Typography>
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                deletarProduto();
              }}
            >
              <Typography textTransform={"none"}>Deletar</Typography>
            </Button>
          </DialogActions>
        </Dialog>


      </Stack>
      <Rodape />
    </ThemeProvider>
  );
}
export default EditarItemCardapio;
