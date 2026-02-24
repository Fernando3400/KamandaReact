import "./header.modules.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { propiedadesDoTema } from "../utils/tema";
import carregamento from "../assets/img/Carregamento.mp4";
import informaticaImg from '../assets/img/informatica.png';
import casal from '../assets/img/casal.png';
import banner from '../assets/img/banner_loggi.png';
import bannerMobile from '../assets/img/banner_loggi_mobile.png';
import categoriaEsportes from '../assets/img/categoria_esportes_V2.png';
import categoriaTecnologia from '../assets/img/Informática.png';
import categoriaLiteratura from '../assets/img/categoria_literaturav2.png';
import anuncio from '../assets/img/Anuncio-site.png';

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
  FormControlLabel,
  Checkbox,
  FormGroup,
  IconButton,
  iconClasses,
  Divider,
} from "@mui/material";
import { useEffect, useState, contentRef, useRef } from "react";
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

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { LogoDev } from "@mui/icons-material";
function Vitrine(carrinho) {
  const tema = createTheme(propiedadesDoTema);
  const token = localStorage.getItem("token")
  const usuario = localStorage.getItem("usuario")
  const [tags, setTags] = useState(["MASCULINO"])
  const [preco, setPreco] = useState("")
  const [precoPromocional, setPrecoPromocional] = useState("")
  const [categoriaEspecifica, setCategoriaEspecifica] = useState(null)
  const [carregandoCategoria, setCarregandoCategoria] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [produtosLoop, setProdutosLoop] = useState([])
  const [produtosPromocionais, setProdutosPromocionais] = useState([])
  const [inspecaoProduto, setInspecaoProduto] = useState(false)
  const [inspecaoProdutoPronta, setInspecaoProdutoPronta] = useState(false)
  const [produtoInspecionado, setProdutoInspecionado] = useState(null)
  const [produtoInspecionadoId, setProdutoInspecionadoId] = useState(null)
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [corSelecionadaEnum, setCorSelecionadaEnum] = useState(null);
  const [tamanhosProdutoInspecionado, setTamanhosProdutoInspecionado] = useState([])
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [dialogoErro, setDialogoErro] = useState(false);
  const [dialogoErroPagamentoPendente, setDialogoPagamentoPendente] = useState(false);
  const [dialogoInformativo, setDialogoInformativo] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [textoDialogoErro, setTextoDialogoErro] = useState("");
  const [akinDialog, setAkinDialog] = useState(false);
  const [textoPagamentoPendente, setTextoPagamentoPendente] = useState("");
  const [textoDialogoInformativo, setTextoDialogoInformativo] = useState("");
  const minhaSecaoRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);

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
    let timer; // <- importante ficar fora da função assíncrona
    if (!carregando) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    const iniciarCronometro = async () => {
      const segundosRestantes = await obterVitrine();

      if (isNaN(segundosRestantes) || segundosRestantes <= 0) {
        setTimeLeft(0);
        return;
      }

      setTimeLeft(segundosRestantes);

      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    iniciarCronometro();

    // Limpeza REAL do timer no useEffect
    return () => clearInterval(timer);
  }, [carregando]);

  const rolarParaElemento = () => {
    minhaSecaoRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start', // ou 'center', 'end'
    });
  };

  const obterVitrine = async (tagsModal) => {
    try {
      if (!tagsModal) {
        tagsModal = tags;
      }

      const response = await axios.post(
        ip + "/loja/vitrine",
        {
          tags: tagsModal,
          home: true
        }
      );
      console.log(response.data)
      setProdutos(response.data.produtos);
      setProdutosLoop([...produtos, ...produtos])
      setProdutosPromocionais(response.data.promocoesDiarias);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Aguarda 0.5s

      setCarregando(false);
      setCarregandoCategoria(false);



      const dataFinal = new Date(response.data.tempoRestanteDaPromocoesDiarias); // ex: "2025-05-31T11:00:01"
      const agora = new Date();
      const segundosRestantes = Math.floor((dataFinal.getTime() - agora.getTime()) / 1000);

      return segundosRestantes;
    } catch (error) {
      console.log(error);
      return 0; // Evita retornar undefined
    }
  };


  const obterProduto = async (id) => {

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
      console.log(produtoInspecionado)
    } catch (error) {
      console.log(error);
    }

  };
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  const adicionarAoCarrinho = async () => {
    console.log(tamanhoSelecionado)
    console.log(corSelecionada)
    if (produtoInspecionado.escolhaDeTamanho == true) {
      if (tamanhoSelecionado == "") {
        setDialogoInformativo(true)
        setTextoDialogoInformativo("Selecione o tamanho")
        return
      }
    }
    if (produtoInspecionado.escolhaDeCor == true) {
      if (corSelecionada == "") {
        setDialogoInformativo(true)
        setTextoDialogoInformativo("Selecione a cor")
        return
      }
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
                cor: corSelecionadaEnum,
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
    <Stack justifyContent="center" alignItems="center" height={"100vh"} width="100%" overflow="hidden">
      <Stack position="fixed" top={0} left={0} width="100vw" height="100vh" bgcolor={tema.palette.primary.main} alignItems={"center"} justifyContent={"center"} >
        <video width="100vw" height="100vh" autoPlay loop muted style={{ border: "none" }}>
          <source src={carregamento} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
      </Stack>

    </Stack>
  ) : (
    <ThemeProvider theme={tema}>
      <Modal open={akinDialog} onClose={() => setAkinDialog(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

        <Stack direction={"row"} sx={{ paddingTop: "5vh", width: "100vw", height: "100vh", bgcolor: "black", p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

          {/* <video width="100%" height="40%" autoPlay loop muted style={{ border: "none" }}>
            <source src={supere_seus_limites} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video> */}
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
      <Dialog open={inspecaoProduto} width="100%" height="100%" >
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

                <Box width="100%" >
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
                            height: isMobile ? "35vh" : "60vh",
                            overflow: "hidden",
                            borderRadius: 3,
                            backgroundColor: "#f4f4f4",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} direction={"column"} width={"100%"} height={"100%"}>
                            <RenderizadorDeImagem imagem={produtoInspecionado.image} width="400px" height="400px" />

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
                {
                  produtoInspecionado.emPromocao ? (
                    <Stack>
                      <Typography style={{ textDecoration: 'line-through' }} color={"black"} variant="body1">
                        {produtoInspecionado.textoPreco}
                      </Typography>
                      <Stack width={"100%"}>
                        <Typography color={"black"} fontWeight={"700"} fontSize={"2em"} sx={{}} variant="body1">
                          {produtoInspecionado.precoPromocional}
                        </Typography>
                      </Stack>

                    </Stack>

                  ) : (

                    <Typography
                      fontSize={isMobile ? 20 : 26}
                      fontWeight={600}
                      color="tertiary.main"
                    >
                      {produtoInspecionado.textoPreco}
                    </Typography>
                  )
                }

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
                {
                  produtoInspecionado.escolhaDeTamanho == true && (
                    <Select
                      sx={{ marginTop: "10px", width: "70%" }}
                      value={tamanhoSelecionado}
                      onChange={(e) => setTamanhoSelecionado(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <Typography color="gray">Selecione o tamanho</Typography>
                      </MenuItem>
                      {tamanhosProdutoInspecionado.map((tamanho) => (

                        <MenuItem key={tamanho} value={tamanho}>
                          <Typography>{tamanho}</Typography>
                        </MenuItem>

                      ))}
                    </Select>
                  )
                }
                {produtoInspecionado.escolhaDeCor === true && (
                  <Select
                    sx={{ marginTop: "10px", width: "70%" }}
                    value={corSelecionada || ""}
                    onChange={(e) => {
                      const selecionada = produtoInspecionado.cores.find(
                        (c) => c.cor === e.target.value
                      );

                      setCorSelecionada(selecionada?.cor || "");
                      setCorSelecionadaEnum(selecionada?.corEnum || "");
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <Typography color="gray">Selecione a cor</Typography>
                    </MenuItem>

                    {produtoInspecionado.cores.map((c) => (
                      <MenuItem key={c.cor} value={c.cor}>
                        <Typography>{c.cor}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                )}

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

      <Box direction={"column"} sx={{
        width: "100%",
        backgroundColor: tema.palette.tertiary.main
      }}
      >

        {isMobile == true ? (
          <Stack direction={"column"} width={"100%"} height="100%" display={"flex"}>

            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              style={{ height: "100%", width: "100%" }}   // 🔥 importante
            >
              <SwiperSlide key={0}>
                <Stack
                  height="100%"
                  width={"100%"}
                  minHeight={"200px"}
                  justifyContent="center"
                  alignItems="center"
                  onClick={()=>{ navigate("/produto/21")}}
                  sx={{ backgroundColor: tema.palette.primary.main, borderRadius: 2 }}
                >
                  <RenderizadorDeImagem imagemCrua={anuncio} width="100%" height="100%"></RenderizadorDeImagem>
                </Stack>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <Box
                  width={"100%"}
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ backgroundColor: tema.palette.primary.main }}
                >
                  <RenderizadorDeImagem
                    imagemCrua={casal}
                    width="100%"
                    height="100%"
                  />
                </Box>
              </SwiperSlide>
            </Swiper>
            <Stack

              spacing={3}
              sx={{
                width: "100%",
                backgroundColor: tema.palette.secondary.main,
                paddingY: 4,
              }}
            >
              <Button
                onClick={() => navigate(`/catalogo?tag=ESPORTES`)}
                fullWidth
                sx={{
                  height: 140,
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  padding: 0,
                  textTransform: "none",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    justifyContent: "center"
                  }}
                >
                  <RenderizadorDeImagem
                    width="100px"
                    height="100px"
                    imagemCrua={categoriaEsportes}
                  />
                </Box>

                {/* Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
                  }}
                />

                {/* Conteúdo */}
                <Stack
                  sx={{
                    height: 140,
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    padding: 0,
                    textTransform: "none",
                  }}
                >
                  <Stack
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      height: "100%",
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Typography fontSize="1.4rem" fontWeight={700} color="white">
                      Esportes
                    </Typography>
                  </Stack>

                </Stack>
              </Button>
              <Button
                onClick={() => navigate(`/catalogo?tag=INFORMATICA`)}
                fullWidth
                sx={{
                  height: 140,
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  padding: 0,
                  textTransform: "none"
                }}
              >
                <Box sx={{ position: "absolute", inset: 0 }}>
                  <RenderizadorDeImagem
                    width="100px"
                    height="100px"
                    imagemCrua={categoriaTecnologia}
                  />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
                  }}
                />

                <Stack
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <Typography fontSize="1.4rem" fontWeight={700} color="white">
                    Informática
                  </Typography>
                </Stack>
              </Button>
              <Button
                onClick={() => navigate(`/catalogo?tag=LITERATURA`)}
                fullWidth
                sx={{
                  height: 140,
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  padding: 0,
                  marginBottom: 2,
                  textTransform: "none",
                }}
              >
                <Box sx={{ position: "absolute", inset: 0, marginBottom: "20px" }}>
                  <RenderizadorDeImagem
                    width="100px"
                    height="100px"
                    imagemCrua={categoriaLiteratura}
                  />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
                  }}
                />

                <Stack
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    justifyContent: "flex-end",
                    alignItems: "center",

                  }}
                >
                  <Typography fontSize="1.4rem" fontWeight={700} color="white">
                    Literatura
                  </Typography>
                </Stack>
              </Button>

            </Stack>
            {
              carregandoCategoria == true ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%" overflow="hidden">

                  <video width="100vw" height="100vh" autoPlay loop muted style={{ border: "none" }}>
                    <source src={carregamento} type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                  </video>
                </Box>

              ) : (

                <Stack direction={"column"} sx={{ backgroundColor: "white" }}>

                  <Grid container spacing={4} justifyContent="center" sx={{ backgroundColor: tema.palette.primary.main }}>
                    {/* Vitrine de Produtos */}
                    <Grid item xs={12} md={9}>
                      <Box sx={{
                        maxWidth: "100%", overflow: "hidden", height: "100%", maskImage:
                          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
                      }}>
                        <Swiper
                          modules={[Autoplay, FreeMode]}
                          loop={true}
                          freeMode={{
                            enabled: true,
                            momentum: false
                          }}
                          speed={20000}
                          autoplay={{
                            delay: 0,
                            disableOnInteraction: false
                          }}
                          slidesPerView="auto"
                          spaceBetween={24}

                          watchSlidesProgress={true}
                          loopAdditionalSlides={produtos.length}

                        >
                          {produtosLoop.map((produto, index) => (
                            <SwiperSlide
                              key={`${produto.id}-${index}`}
                              style={{ width: 200 }}

                            >
                              <Card
                                sx={{
                                  width: "100%",
                                  marginTop: "10px",
                                  backgroundColor: "white",
                                  borderRadius: 3,
                                  boxShadow: 3,
                                  cursor: "pointer",
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "scale(1.03)"
                                  },
                                  marginBottom: "30px"
                                }}
                                onClick={() => {
                                  // setProdutoInspecionadoId(produto.id);
                                  // setInspecaoProduto(true);
                                  navigate(`produto/${produto.id}`)
                                }}
                              >

                                <CardMedia
                                  component="img"
                                  image={`data:image/jpeg;base64,${produto.imagem}`}
                                  alt={produto.nome}
                                  height="150px"
                                  sx={{
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    width: "150px",
                                    mx: "auto",
                                    display: "block"
                                  }}
                                />

                                {produto.emPromocao ? (
                                  <CardContent>
                                    <Typography
                                      color="black"
                                      variant="h6"
                                      fontFamily="fantasy"
                                      gutterBottom
                                    >
                                      {produto.nome}
                                    </Typography>

                                    <Typography
                                      color="black"
                                      variant="body1"
                                      sx={{ textDecoration: "line-through" }}
                                    >
                                      {produto.preco}
                                    </Typography>

                                    <Typography
                                      color="black"
                                      fontWeight="700"
                                      fontSize="2em"
                                    >
                                      {produto.precoPromocional}
                                    </Typography>
                                  </CardContent>
                                ) : (
                                  <CardContent>
                                    <Typography
                                      color="black"
                                      variant="h6"
                                      fontFamily="fantasy"
                                      gutterBottom
                                    >
                                      {produto.nome}
                                    </Typography>

                                    <Typography
                                      color="black"
                                      variant="body1"
                                    >
                                      {produto.preco}
                                    </Typography>
                                  </CardContent>
                                )}
                              </Card>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </Box>
                    </Grid>
                  </Grid>


                </Stack>
              )

            }
            <img
              src={bannerMobile}
              alt="Banner Frete"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
              }}
            />
          </Stack>
        ) : (
          <Stack direction={"column"}>
            <Stack
              direction="row"
              width="100%"
              height="800px"
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "#777777" }}
                />
              }
              sx={{
                backgroundColor: tema.palette.tertiary.main
              }}
            >
              <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                style={{ height: "100%", width: "100%" }}   // 🔥 importante
              >
                <SwiperSlide key={0}>
                  <Stack
                    height="100%"
                    width={"100%"}
                    minHeight={"200px"}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ backgroundColor: tema.palette.primary.main, borderRadius: 2 }}
                    onClick={() => { navigate("/produto/21") }}
                  >
                    <RenderizadorDeImagem imagemCrua={anuncio} width="700px" height="700px"></RenderizadorDeImagem>
                  </Stack>
                </SwiperSlide>
              </Swiper>

              <Box
                width={"100%"}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: tema.palette.primary.main }}
              >
                <RenderizadorDeImagem
                  imagemCrua={casal}
                  width="700px"
                  height="700px"
                />
              </Box>
            </Stack>
            <Stack height={"100%"} fullWidth className="categorias" direction={"row"} justifyContent={"space-evenly"} sx={{ padding: 0, margin: 0, backgroundColor: tema.palette.secondary.main }}>
              <Button onClick={() => {
                navigate(`/catalogo?tag=ESPORTES`)
              }} sx={{ transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", }, }}>
                <Stack direction="column" alignItems="center" >
                  <RenderizadorDeImagem width="350px" height="350px" imagemCrua={categoriaEsportes} />
                  <Typography color={tema.palette.primary.main} textTransform="none" fontSize="3em">
                    Esportes
                  </Typography>

                </Stack>
              </Button>
              <Button onClick={() => {
                navigate(`/catalogo?tag=INFORMATICA`)
              }} sx={{ transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", }, }}>
                <Stack direction="column" alignItems="center">
                  <RenderizadorDeImagem width="350px" height="350px" imagemCrua={categoriaTecnologia} />
                  <Typography color={tema.palette.primary.main} textTransform="none" fontSize="3em">
                    Informática
                  </Typography>
                </Stack>
              </Button>
              <Button onClick={() => {
                navigate(`/catalogo?tag=LITERATURA`)
              }} sx={{ transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", }, }}
              >
                <Stack direction="column" alignItems="center" >

                  <RenderizadorDeImagem width="350px" height="350px" imagemCrua={categoriaLiteratura} />
                  <Typography color={tema.palette.primary.main} textTransform="none" fontSize="3em">
                    Literatura
                  </Typography>

                </Stack>
              </Button>

            </Stack>
            {
              carregandoCategoria == true ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%" overflow="hidden">

                  <video width="100vw" height="100vh" autoPlay loop muted style={{ border: "none" }}>
                    <source src={carregamento} type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                  </video>
                </Box>

              ) : (

                <Stack direction={"column"} sx={{ backgroundColor: "white" }}>

                  <Grid container  justifyContent="center" sx={{ backgroundColor: tema.palette.primary.main }}>
                    {/* Vitrine de Produtos */}
                    <Grid item xs={12} md={9}>
                      <Box sx={{
                        maxWidth: "100%", overflow: "hidden", height: "100%", maskImage:
                          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)"
                      }}>
                        <Swiper
                          modules={[Autoplay, FreeMode]}
                          loop={true}
                          freeMode={{
                            enabled: true,
                            momentum: false
                          }}
                          speed={20000}
                          autoplay={{
                            delay: 0,
                            disableOnInteraction: false
                          }}
                          slidesPerView="auto"
                          spaceBetween={24}
                          watchSlidesProgress={true}
                          loopAdditionalSlides={produtos.length}

                        >
                          {produtosLoop.map((produto, index) => (
                            <SwiperSlide
                              key={`${produto.id}-${index}`}
                              style={{ width: 300 }}

                            >
                              <Card
                                sx={{
                                  width: "100%",
                                  marginTop: "10px",
                                  backgroundColor: "white",
                                  borderRadius: 3,
                                  boxShadow: 3,
                                  cursor: "pointer",
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "scale(1.03)"
                                  },
                                  marginBottom: "30px"
                                }}
                                onClick={() => {
                                  // setProdutoInspecionadoId(produto.id);
                                  // setInspecaoProduto(true);
                                  navigate(`produto/${produto.id}`)
                                }}
                              >

                                <CardMedia
                                  component="img"
                                  image={`data:image/jpeg;base64,${produto.imagem}`}
                                  alt={produto.nome}
                                  height="250px"
                                  sx={{
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    width: "250px",
                                    mx: "auto",
                                    display: "block"
                                  }}
                                />

                                {produto.emPromocao ? (
                                  <CardContent>
                                    <Typography
                                      color="black"
                                      variant="h6"
                                      fontFamily="fantasy"
                                      gutterBottom
                                    >
                                      {produto.nome}
                                    </Typography>

                                    <Typography
                                      color="black"
                                      variant="body1"
                                      sx={{ textDecoration: "line-through" }}
                                    >
                                      {produto.preco}
                                    </Typography>

                                    <Typography
                                      color="black"
                                      fontWeight="700"
                                      fontSize="2em"
                                    >
                                      {produto.precoPromocional}
                                    </Typography>
                                  </CardContent>
                                ) : (
                                  <CardContent>
                                    <Typography
                                      color="black"
                                      variant="h6"
                                      fontFamily="fantasy"
                                      gutterBottom
                                    >
                                      {produto.nome}
                                    </Typography>

                                    <Typography
                                      color="black"
                                      variant="body1"
                                    >
                                      {produto.preco}
                                    </Typography>
                                  </CardContent>
                                )}
                              </Card>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                  >
                    <img
                      src={banner}
                      alt="Banner Frete"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        objectFit: "contain"
                      }}
                    />
                  </Box>

                </Stack>
              )
            }
          </Stack>

        )
        }






      </Box>

    </ThemeProvider >
  );
};


export default Vitrine;
