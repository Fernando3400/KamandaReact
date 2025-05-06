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
  Select,
  MenuItem,
  Modal,
  Paper,
  useMediaQuery,
  Menu,
} from "@mui/material";
import { useEffect, useState, contentRef } from "react";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import SelecionarQuantidade from "./SelecionarQuantidade";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
function Vitrine(carrinho) {

  const tema = createTheme(propiedadesDoTema);
  const token = localStorage.getItem("token")
  const usuario = localStorage.getItem("usuario")
  const [tags, setTags] = useState(["MASCULINO"])

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
  const [anchorEsportes, setAnchorEsportes] = useState(null);
  const [anchorGenero, setAnchorGenero] = useState(null);

  const handleOpenEsportes = (event) => {
    setAnchorEsportes(event.currentTarget);
  };

  const handleCloseEsportes = () => {
    setAnchorEsportes(null);
  };

  const handleOpenGenero = (event) => {
    setAnchorGenero(event.currentTarget);
  };

  const handleCloseGenero = () => {
    setAnchorGenero(null);
  };


  const isMobile = useMediaQuery(tema.breakpoints.down("sm"));

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

  const obterVitrine = async (tagsModal) => {
    try {
      if (tagsModal == null) {
        tagsModal = tags
      }
      const response = await axios.post(
        ip + "/loja/vitrine",
        {
          tags: tagsModal
        }
      );
      console.log(response)
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

      <video width="100vw" height="100vh" autoPlay loop muted style={{ border: "none" }}>
        <source src={carregamento} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </Box>
  ) : (
    <ThemeProvider theme={tema}>
      <Modal open={akinDialog} onClose={() => setAkinDialog(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

        <Stack direction={"row"} sx={{ paddingTop: "5vh", width: "100vw", height: "100vh", bgcolor: "black", p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

          <video width="100%" height="40%" autoPlay loop muted style={{ border: "none" }}>
            <source src={supere_seus_limites} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <Typography variant="h4" fontSize={"1em"} fontFamily={"sans-serif"} width={"50vw"} textAlign={"center"} marginTop={"100px"}> Para sabermos melhor como podemos te ajudar, nos conte um pouco sobre você.<br />
            Qual seu esporte preferido?
          </Typography>


          <Button variant="contained" color="secondary" onClick={() => {
            // Exibir camisas de futebol

            obterVitrine(["FUTEBOL"])
            setAkinDialog(false)
          }} sx={{ mt: 2 }}>
            <Typography textTransform={"none"} fontSize={"1em"}>
              Futebol
            </Typography>
          </Button>
          <Button variant="contained" color="secondary" fontSize={"1em"} onClick={() => {

            obterVitrine(["BASQUETE"])
            setAkinDialog(false)

          }} sx={{ mt: 2 }}>

            <Typography textTransform={"none"} fontSize={"1em"}>
              Basquete

            </Typography>
          </Button>
          <Button variant="contained" color="secondary" onClick={() => {
            obterVitrine(["VOLEI"])
            setAkinDialog(false)
          }} sx={{ mt: 2 }}>

            <Typography textTransform={"none"} fontSize={"1em"}>
              Vôlei
            </Typography>
          </Button>
        </Stack>
      </Modal>

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
      <Dialog open={inspecaoProduto} fullWidth maxWidth="xs">
        <DialogContent>
          <Stack
            direction="column"
            width="100%"
            sx={{
              backgroundColor: "white"
            }}
            alignItems="center"
          >
            {inspecaoProdutoPronta && (
              <Stack alignItems="center" spacing={3} width="100%">
                {/* Carrossel de imagens */}
                <Box width="100%">
                  <Slider
                    dots
                    infinite
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                    autoplay
                    autoplaySpeed={3000}
                    fade
                    pauseOnHover
                  >
                    {[produtoInspecionado.image, produtoInspecionado.image2]
                      .filter(img => !!img)
                      .map((img, index) => (
                        <Paper
                          key={index}
                          elevation={3}
                          sx={{
                            width: "100%",
                            height: isMobile ? "35vh" : "40vh",
                            overflow: "hidden",
                            borderRadius: 3,
                            backgroundColor: "#f4f4f4",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} direction={"column"} width={"100%"} height={"100%"}>
                            <RenderizadorDeImagem imagem={produtoInspecionado.image} width="200px" height="200px" />

                          </Stack>
                        </Paper>
                      ))}
                  </Slider>
                </Box>

                {/* Título */}
                <Typography
                  color="black"
                  fontFamily="fantasy"
                  fontSize={isMobile ? 22 : 30}
                  textAlign="center"
                  mt={2}
                >
                  {produtoInspecionado.title}
                </Typography>

                {/* Preço */}
                <Typography
                  fontSize={isMobile ? 20 : 26}
                  fontWeight={600}
                  color="primary.main"
                >
                  {preco}
                </Typography>

                {/* Descrição */}
                <Typography
                  fontSize={isMobile ? 14 : 18}
                  textAlign="center"
                  px={1}
                >
                  {produtoInspecionado.description}
                </Typography>

                {/* Quantidade */}
                <SelecionarQuantidade
                  onChange={(quantidade) => setQuantidadeSelecionada(quantidade)}
                />

                {/* Tamanhos */}
                <Select
                  sx={{ marginTop: "10px", width: "70%" }}
                  value={tamanhoSelecionado}
                  onChange={(e) => setTamanhoSelecionado(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Selecione um tamanho
                  </MenuItem>
                  {tamanhosProdutoInspecionado.map((tamanho) => (
                    <MenuItem key={tamanho} value={tamanho}>
                      <Typography>{tamanho}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            )}
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            paddingX: isMobile ? "10px" : "24px",
            paddingBottom: isMobile ? "10px" : "20px",
            justifyContent: "space-between"
          }}
        >
          <Button
            variant="outlined"
            fullWidth={isMobile}
            onClick={() => {
              setInspecaoProdutoPronta(false);
              setInspecaoProduto(false);
            }}
          >
            <Typography textTransform="none" fontSize={isMobile ? 16 : 20}>
              Fechar
            </Typography>
          </Button>

          <Button
            variant="contained"
            fullWidth={isMobile}
            onClick={() => {
              if (usuario != null && usuario !== "null" && usuario !== "") {
                adicionarAoCarrinho();
                setInspecaoProduto(false);
              } else {
                setDialogoErro(true);
                setTextoDialogoErro("Para continuar é necessário fazer Login");
              }
            }}
          >
            <Typography textTransform="none" fontSize={isMobile ? 16 : 20}>
              Adicionar ao Carrinho
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>

      <Stack direction={"column"} sx={{
        width: "100%",
        backgroundColor: "black"
      }}>

        <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} marginBottom={"20px"} sx={{
          width: "100%"
        }}>
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            style={{ width: "100%", maxWidth: "70vw" }}
          >
            <SwiperSlide key={0}>
              <Stack
                height="30vh"
                minHeight={"200px"}
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "black", borderRadius: 2 }}
              >
                <RenderizadorDeImagem logo={true} width="200px" height="200px"></RenderizadorDeImagem>
              </Stack>
            </SwiperSlide>
            <SwiperSlide key={1}>
              <Stack
                height="30vh"
                minHeight={"200px"}
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "black", borderRadius: 2 }}
              >
                <Typography fontFamily={"fantasy"} fontSize={"3em"}>
                  Vá alem
                </Typography>
              </Stack>
            </SwiperSlide>
            <SwiperSlide key={2}>
              <Stack
                height="30vh"
                minHeight={"200px"}
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "white", borderRadius: 2 }}
              >
                <Typography color={"black"} fontFamily={"fantasy"} fontSize={"3em"}>
                  Supere seus limites
                </Typography>
              </Stack>
            </SwiperSlide>

          </Swiper>
          {/* <Box width="100%" sx={{ backgroundColor: 'black', px: 4, py: 2 }}>
            <Stack width="100%" marginLeft="20px" justifyContent="center" direction="row" spacing={4} alignItems="center" sx={{ backgroundColor: "black" }}>
             
              <Box sx={{}}>

                <Button
                  variant="outlined"
                  onClick={handleOpenEsportes}
                  color="secondary"
                // onMouseLeave={handleCloseEsportes}
                >
                  <Typography textTransform={"none"} color={"white"}>

                    Esportes
                  </Typography>
                </Button>
                <Menu
                  anchorEl={anchorEsportes}
                  open={Boolean(anchorEsportes)}
                  onClose={handleCloseEsportes}
                  MenuListProps={{}}
                >
                  <MenuItem onClick={handleCloseEsportes}>Vôlei</MenuItem>
                  <MenuItem onClick={handleCloseEsportes}>Futebol</MenuItem>
                  <MenuItem onClick={handleCloseEsportes}>Basquete</MenuItem>
                </Menu>
              </Box>

             
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleOpenGenero}
                  color="secondary"
                >
                  Gênero
                </Button>
                <Menu
                  anchorEl={anchorGenero}
                  open={Boolean(anchorGenero)}
                  onClose={handleCloseGenero}
                >
                  <MenuItem onClick={handleCloseGenero}>Feminino</MenuItem>
                  <MenuItem onClick={handleCloseGenero}>Masculino</MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Box> */}
        </Stack>
        {
          (
            <Grid className="grid-maior" container spacing={3} justifyContent="center" sx={{ backgroundColor: "black" }}>

              {produtos.map((produto) => (
                <Grid sx={{}} className="grid-item" gap={"20px"} item key={produto.id} xs={6} sm={4} md={3} >

                  <Card

                    sx={{ backgroundColor: "black", maxWidth: "100vw", alignItems: "center", cursor: "pointer", paddingTop: "20px" }}
                    onClick={() => {
                      setProdutoInspecionadoId(produto.id);
                      obterProduto(produto.id);
                      setInspecaoProduto(true);
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`data:image/jpeg;base64,${produto.imagem}`}
                      alt={produto.nome}
                      height="300"
                      sx={{ objectFit: "contain" }} // Pode ser "cover" ou "contain", dependendo do que você quer
                    />
                    <CardContent >
                      <Typography color="white" fontFamily={"fantasy"} variant="h6">
                        {produto.nome}
                      </Typography>
                      <Typography color="white" variant="body1">{produto.preco}</Typography>
                    </CardContent>
                  </Card>

                </Grid>

              ))}
            </Grid>

          )
        }
      </Stack>






    </ThemeProvider >
  );
};


export default Vitrine;
