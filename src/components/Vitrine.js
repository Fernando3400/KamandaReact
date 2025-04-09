import "./header.modules.css";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { propiedadesDoTema } from "../utils/tema";
import carregamento from "../assets/img/Carregamento.mp4";
import supere_seus_limites from "../assets/img/supere_seus_limites.mp4";

import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  createTheme,
  Dialog,
  DialogContent,
  Stack,
  DialogActions,
  DialogTitle,
  Checkbox,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { useEffect, useState, contentRef } from "react";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import StringUtil, { formatarPreco } from "../utils/StringUtil"
import SelecionarQuantidade from "./SelecionarQuantidade";
import { RadioButtonChecked } from "@mui/icons-material";
import { delay } from "framer-motion";
import logoUbuntuStore from "../assets/img/novo-logo-ubuntu.png";
function Vitrine(carrinho) {

  const tema = createTheme(propiedadesDoTema);
  const token = localStorage.getItem("token")
  const usuario = localStorage.getItem("usuario")
  const [preco, setPreco] = useState("")
  const [produtos, setProdutos] = useState([])
  const [inspecaoProduto, setInspecaoProduto] = useState(false)
  const [inspecaoProdutoPronta, setInspecaoProdutoPronta] = useState(false)
  const [produtoInspecionado, setProdutoInspecionado] = useState(null)
  const [produtoInspecionadoId, setProdutoInspecionadoId] = useState(null)
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [tamanhosProdutoInspecionado, setTamanhosProdutoInspecionado] = useState([])
  const [p, setP] = useState(false)
  const [m, setM] = useState(false)
  const [g, setG] = useState(false)
  const [gg, setGG] = useState(false)
  const [g1, setG1] = useState(false)
  const [g2, setG2] = useState(false)
  const [g3, setG3] = useState(false)
  const [g4, setG4] = useState(false)
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [dialogoErro, setDialogoErro] = useState(false);
  const [dialogoErroPagamentoPendente, setDialogoPagamentoPendente] = useState(false);
  const [dialogoInformativo, setDialogoInformativo] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [textoDialogoErro, setTextoDialogoErro] = useState("");
  const [akinDialog, setAkinDialog] = useState(false);
  const [textoPagamentoPendente, setTextoPagamentoPendente] = useState("");
  const [textoDialogoInformativo, setTextoDialogoInformativo] = useState("");

  const navigate = useNavigate();
  let ip = "";

  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  useEffect(() => {
    obterVitrine();
  }, [inspecaoProdutoPronta]);

  const obterVitrine = async () => {
    try {
      const response = await axios.get(
        ip + "/loja/vitrine"
      );

      setProdutos(response.data.produtos)
      await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 10 segundos
      setCarregando(false)
    } catch (error) {
      console.log(error);
    }
  };


  const obterProduto = async (id) => {
    console.log(produtoInspecionadoId)
    try {
      const response = await axios.post(
        ip + "/loja/produto/obter", {
        id: id
      },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );


      setProdutoInspecionado(response.data)
      setTamanhosProdutoInspecionado([]);
      if (response.data.p) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "P"]);
      }
      if (response.data.m) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "M"]);
      }
      if (response.data.g) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "G"]);
      }
      if (response.data.gg) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "GG"]);
      }
      if (response.data.g1) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "G1"]);
      }
      if (response.data.g2) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "G2"]);
      }
      if (response.data.g3) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "G3"]);
      }
      if (response.data.g4) {
        setTamanhosProdutoInspecionado((prev) => [...prev, "G4"]);
      }

      setInspecaoProdutoPronta(true)
      setPreco(produtoInspecionado.textoPreco)
    } catch (error) {
      console.log(error);
    }
    console.log(produtoInspecionado)
  };
  const adicionarAoCarrinho = async () => {
    console.log(tamanhoSelecionado)
    if (tamanhoSelecionado == "") {
      setDialogoInformativo(true)
      setTextoDialogoInformativo("Selecione a quantidade")
      return
    }
    try {
      const response = await axios.post(
        ip + "/loja/adicionarprodutoaocarrinho",
        {
          produtos:
            [
              {
                id: produtoInspecionadoId,
                tamanho: tamanhoSelecionado,
                quantidade: quantidadeSelecionada
              }
            ]

        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );
      if (response.status == 200) {
        localStorage.setItem("carrinhoAberto", true)
        window.location.reload();
        setInspecaoProdutoPronta(false)

      }

    } catch (error) {
      console.log(error);
      if (error.response.status == 420) {
        navigate("/resumo")
        setDialogoPagamentoPendente(true)
        setTextoPagamentoPendente("Para adicionar produtos ao carrinho. Você não deve ter pagamentos pendentes clique no botão abaixo para resgatar o código para pagamento ")
      }
      if (error.response.status == 422) {
        navigate("/")
        setTextoPagamentoPendente("Os produtos do carrinho foram alterados, por favor, remonte seu carrinho")
      }


    }
  };


  return carregando ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh" width="100%" overflow="hidden">
      <RenderizadorDeImagem imagem={null} width="200px" height="200px" />
      <video width="100vw" height="100vh" autoPlay loop muted style={{ border: "none" }}>
        <source src={carregamento} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </Box>
  ) : (
    <ThemeProvider theme={tema}>
      <Modal open={akinDialog} onClose={() => setAkinDialog(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

        <Stack direction={"row"} sx={{paddingTop:"5vh", width: "100vw", height: "100vh", bgcolor: "black", p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

          <video width="100%" height="40%"  autoPlay loop muted style={{ border: "none" }}>
            <source src={supere_seus_limites} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <Typography variant="h4" fontSize={"1em"} fontFamily={"sans-serif"} width={"50vw"} textAlign={"center"} marginTop={"100px"}> Para sabermos melhor como podemos te ajudar, nos conte um pouco sobre você.<br />
            Qual seu esporte preferido?
          </Typography>


          <Button variant="contained" color="secondary" onClick={()=>{
            setAkinDialog(false)
          }} sx={{ mt: 2 }}>
            <Typography textTransform={"none"} fontSize={"1em"}>
              Futebol
            </Typography>
          </Button>
          <Button variant="contained" color="secondary" fontSize={"1em"} onClick={()=>{
            setAkinDialog(false)
          }} sx={{ mt: 2 }}>

            <Typography textTransform={"none"}fontSize={"1em"}>
              Basquete

            </Typography>
          </Button>
          <Button variant="contained" color="secondary" onClick={()=>{
            setAkinDialog(false)
          }} sx={{ mt: 2 }}>

            <Typography textTransform={"none"} fontSize={"1em"}>
              Outro
            </Typography>
          </Button>
        </Stack>
      </Modal>
      {/* <Modal open={akinDialog} onClose={() => setAkinDialog(false)} sx={{ display: "flex", width:"100%",height:"100%", alignItems: "center", justifyContent: "center" }} >
       
          < Stack sx={{width: "100vw", height:"100vh", backgroundColor:"white"}} direction={"row"}>
            <Stack sx={{} } direction={"column"}>

            </Stack>
            <Stack direction={"column"}>
              <Button>
                <Typography>
                  Ir para a loja
                </Typography>
              </Button>
            </Stack>
          </Stack>
       
      </Modal> */}
      <Dialog open={dialogoErroPagamentoPendente}>
        <DialogTitle>
          <Typography>
            Pagamento Pendente
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography> {textoPagamentoPendente}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { navigate("entrega") }}>
            <Typography textTransform={"none"}>
              Prosseguir
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogoErro}>
        <DialogTitle>

        </DialogTitle>
        <DialogContent>
          <Typography> {textoDialogoErro}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { navigate("portal/login") }}>
            <Typography textTransform={"none"}>
              Login
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogoInformativo}>
        <DialogTitle>

        </DialogTitle>
        <DialogContent>
          <Typography> {textoDialogoInformativo}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDialogoInformativo(false)
          }}>
            <Typography textTransform={"none"}>
              Ok
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={inspecaoProduto} >
        <DialogContent >
          <Stack direction={"column"} height={"100%"} width={"400px"} sx={{
            backgroundColor: "white",
            paddingTop: "60px",
            paddingBottom: "60px"
          }} alignItems={"center"}>
            {inspecaoProdutoPronta &&
              <Stack alignItems={"center"}>
                <RenderizadorDeImagem imagem={produtoInspecionado.image} width="200px" height="300px" />
                <Typography margin={"20px"} color={"black"} fontFamily={"fantasy"} fontSize={30}>
                  {produtoInspecionado.title}
                </Typography>
                <Typography fontSize={30} marginBottom={"10px"}>{preco}</Typography>
                <Typography fontSize={20}>{produtoInspecionado.description}</Typography>

                {/* Componente de seleção de quantidade */}
                <SelecionarQuantidade onChange={(quantidade) => setQuantidadeSelecionada(quantidade)} />
                <Select
                  sx={{
                    marginTop: "10px",
                    width: "50%"
                  }}

                  value={tamanhoSelecionado}
                  onChange={(e) => setTamanhoSelecionado(e.target.value)}
                  displayEmpty
                  maxWidth
                >
                  <MenuItem value="" disabled>Selecione um tamanho</MenuItem>
                  {tamanhosProdutoInspecionado.map((tamanho) => (
                    <MenuItem key={tamanho} value={tamanho} >
                      <Typography variant="">
                        {tamanho}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            }
          </Stack>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined"
            onClick={() => {
              setInspecaoProdutoPronta(false)
              setInspecaoProduto(false)
            }}>
            <Typography textTransform={"none"} fontSize={20}>Fechar</Typography>
          </Button>
          <Button variant="contained"
            onClick={() => {


              if (usuario != null && usuario != "null" && usuario != "") {
                adicionarAoCarrinho()
                setInspecaoProduto(false)
              } else {
                setDialogoErro(true)
                setTextoDialogoErro(" Para continuar é necessario fazer Login")
              }


            }}>
            <Typography textTransform={"none"} fontSize={20}>Adicionar ao Carrinho</Typography>
          </Button>

        </DialogActions>
      </Dialog>


      {
        (
          <Grid className="grid-maior" container spacing={3} justifyContent="center">

            {produtos.map((produto) => (
              <Grid className="grid-item" item key={produto.id} xs={6} sm={4} md={3} >

                <Card sx={{ maxWidth: "100vw", alignItems: "center" }} onClick={() => {
                  setProdutoInspecionadoId(produto.id)
                  obterProduto(produto.id)
                  setInspecaoProduto(true)
                }} >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"

                  >
                    <RenderizadorDeImagem width="220px" height="300px" imagem={produto.imagem} />
                  </Box>
                  {/* <CardMedia component="img" height="150" image={produto.imagem} alt={produto.nome} /> Este card Media  */}
                  <CardContent >
                    <Typography fontFamily={"fantasy"} variant="h6">{produto.nome}</Typography>
                    <Typography variant="body1">{produto.preco}</Typography>

                  </CardContent>
                </Card>

              </Grid>

            ))}
          </Grid>

        )
      }





    </ThemeProvider >
  );
};


export default Vitrine;
