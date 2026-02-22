import { Form, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { Box, Button, Card, CardContent, CardMedia, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Select, Stack, TextField, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import { propiedadesDoTema } from "../utils/tema";
import axios from "axios";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import { Square } from "@mui/icons-material";
import estrela from "../assets/img/Estrela.png"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import SelecionarQuantidade from "./SelecionarQuantidade";

function Produto() {

  const navigate = useNavigate();
  const [idMateria, setIdMateria] = useState(localStorage.getItem("idMateria"));
  const [estoque, setEstoque] = useState("4");
  const [preco, setPreco] = useState("");
  const [produto, setProduto] = useState({})
  const [outrosProdutosLoop, setProdutosLoop] = useState([])
  const [tamanhosProduto, setTamanhosProduto] = useState([])
  const [dialogoInformativo, setDialogoInformativo] = useState(false);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [corSelecionadaEnum, setCorSelecionadaEnum] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [textoDialogoInformativo, setTextoDialogoInformativo] = useState("");
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
  const [textoPagamentoPendente, setTextoPagamentoPendente] = useState("");
  const [dialogoErroPagamentoPendente, setDialogoPagamentoPendente] = useState(false);
  const tema = createTheme(propiedadesDoTema);
  const isMobile = useMediaQuery(tema.breakpoints.down("sm"));
  const { id } = useParams();
  const Square = ({ children, color }) => (
    <Stack
      width={"50px"}
      height={"50px"}
      bgcolor={color}
      borderRadius={3}
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Stack>
  );



  useEffect(() => {
    obterProduto(id)
  }, []);
  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }
  const adicionarAoCarrinho = async (comprarAgora) => {
    console.log(tamanhoSelecionado)
    console.log(corSelecionada)
    console.log(comprarAgora)
    if (produto.escolhaDeTamanho == true) {
      if (tamanhoSelecionado == "") {
        setDialogoInformativo(true)
        setTextoDialogoInformativo("Selecione o tamanho")
        return
      }
    }

    if (produto.escolhaDeCor == true) {
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
                id: id,
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
        if (comprarAgora == true) {
          console.log("entrega")
          navigate("/entrega")
        } else {
          localStorage.setItem("carrinhoAberto", "true")
          navigate("/")

        }

      }

    } catch (error) {
      console.log(error);
      if (error.response.status == 420) {
        setDialogoPagamentoPendente(true)

        setTextoPagamentoPendente("Para adicionar produtos ao carrinho. Você não deve ter pagamentos pendentes clique no botão abaixo para resgatar o código para pagamento ")
      }
      if (error.response.status == 422) {

        setTextoPagamentoPendente("Os produtos do carrinho foram alterados, por favor, remonte seu carrinho")
      }


    }
  };
  const obterProduto = async () => {

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
      setProdutosLoop(response.data.outrosProdutos)
      console.log(response.data)
      setProduto(response.data)
      if (response.data.p) {
        setTamanhosProduto((prev) => [...prev, "P"]);
      }
      if (response.data.m) {
        setTamanhosProduto((prev) => [...prev, "M"]);
      }
      if (response.data.g) {
        setTamanhosProduto((prev) => [...prev, "G"]);
      }
      if (response.data.gg) {
        setTamanhosProduto((prev) => [...prev, "GG"]);
      }
      if (response.data.g1) {
        setTamanhosProduto((prev) => [...prev, "G1"]);
      }
      if (response.data.g2) {
        setTamanhosProduto((prev) => [...prev, "G2"]);
      }
      if (response.data.g3) {
        setTamanhosProduto((prev) => [...prev, "G3"]);
      }
      if (response.data.g4) {
        setTamanhosProduto((prev) => [...prev, "G4"]);
      }
      console.log(produto)
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <ThemeProvider theme={tema}>
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
          <Button onClick={() => { navigate("/entrega") }}>
            <Typography textTransform={"none"}>
              Prosseguir
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      {
        // <Box
        //   display="grid"
        //   gridTemplateColumns={{
        //     xs: "1fr",
        //     sm: "1fr 3fr",
        //   }}
        //   gap={2}
        // >


      }
      {isMobile == true ? (
        <Stack direction="column" px={2} py={3} spacing={3} bgcolor={tema.palette.primary.main}>
          <Cabecalho />
          {/* IMAGEM PRINCIPAL */}
          <Stack alignItems="center">
            <RenderizadorDeImagem
              imagem={produto.image}
              width="100%"
            />
          </Stack>

          {/* MINIATURAS */}
          <Stack direction="row" spacing={1} justifyContent="center">
            {[produto.image2, produto.image3, produto.image4]
              .filter(Boolean)
              .map((img, index) => (
                <RenderizadorDeImagem
                  key={index}
                  imagem={img}
                  width="70px"
                />
              ))}
          </Stack>

          {/* NOME */}
          <Typography fontSize="1.5rem" fontWeight="bold">
            {produto.nome}
          </Typography>

          {/* AVALIAÇÃO */}
          {/* <Stack direction="row" alignItems="center">
            {[...Array(5)].map((_, i) => (
              <RenderizadorDeImagem key={i} imagemCrua={estrela} width="20px" />
            ))}
            <Typography ml={1} fontSize="0.9rem">
              ver avaliações
            </Typography>
          </Stack> */}

          {/* ESTOQUE */}
          {produto.estoque && (
            <Typography fontSize="0.9rem">
              {produto.estoque} unidades disponíveis
            </Typography>
          )}
          <Stack direction={"row"} justifyContent={"space-around"} width={"100%"} >
            {/* PREÇO */}
            <Typography fontSize="2rem" fontWeight="bold">
              {produto.textoPreco}
            </Typography>
            {/* QUANTIDADE */}
            <SelecionarQuantidade
              cor="secondary"
              onChange={(q) => setQuantidadeSelecionada(q)}
            />
          </Stack>

          {produto.parcelamento && (
            <Typography fontSize="1rem">
              {produto.parcelamento}
            </Typography>
          )}

          {/* VARIAÇÕES */}
          {produto.escolhaDeTamanho && (
            <Select
              fullWidth
              value={tamanhoSelecionado}
              onChange={(e) => setTamanhoSelecionado(e.target.value)}
              displayEmpty
              sx={{
                color: "secondary.main", // texto selecionado branco
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main"
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main"
                },
                ".MuiSvgIcon-root": {
                  color: "secondary.main" // seta branca
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#111", // fundo escuro no dropdown
                    color: "secondary.main"
                  }
                }
              }}
            >
              <MenuItem value="">
                <Typography color="secondary.main">
                  Selecione o tamanho
                </Typography>
              </MenuItem>

              {tamanhosProduto.map((t) => (
                <MenuItem key={t} value={t}>
                  <Typography color="secondary.main">
                    {t}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          )}

          {produto.escolhaDeCor && (
            <Select
              fullWidth
              value={corSelecionada || ""}
              onChange={(e) => setCorSelecionada(e.target.value)}
            >
              <MenuItem value="">Selecione a cor</MenuItem>
              {produtoInspecionado.cores.map((c) => (
                <MenuItem key={c.cor} value={c.cor}>{c.cor}</MenuItem>
              ))}
            </Select>
          )}

          {/* BOTÕES */}
          <Button
            fullWidth
            color={"secondary"}

            size="large"
            onClick={() => adicionarAoCarrinho(false)}
          >
            <Typography texttransform={"none"} fontWeight={600}>Adicionar ao carrinho</Typography>
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="quinary"
            size="large"
            onClick={() => adicionarAoCarrinho(true)}
          >
            <Typography text transform={"none"} fontWeight={600}>Comprar </Typography>
          </Button>

        </Stack>) : (
        <Stack
          bgcolor={tema.palette.secondary.main}
          direction={"column"}
          height={"100%"}
          color={tema.palette.primary.main}
        >
          <Cabecalho />
          <Stack direction={"row"} paddingY={"50px"}
          >
            <Stack direction={"column"} width={"40vw"} alignItems={"center"} paddingLeft={"10vw"} paddingRight={"5vw"}>
              <Stack direction={"row"} >
                <Stack direction={"column"} width={"30%"}>
                  {
                    produto.imagem2 != null && (
                      <RenderizadorDeImagem imagem={produto.image2} width="100px" />

                    )
                  }
                  {
                    produto.imagem3 != null && (
                      <RenderizadorDeImagem imagem={produto.image3} width="100px" />

                    )
                  }
                  {
                    produto.imagem4 != null && (
                      <RenderizadorDeImagem imagem={produto.image4} width="100px" />

                    )
                  }

                </Stack>
                <Stack direction={"column"} ali width="70%">
                  <RenderizadorDeImagem imagem={produto.image} width={"300px"} />
                </Stack>
              </Stack>
              <Typography alignSelf={"start"} marginTop={"20%"} fontSize={"1.9em"} fontFamily={"sans-serif"} > {produto.nome}</Typography>
              <Typography alignSelf={"start"} marginTop={"40px"} fontSize={"1.4em"} fontFamily={"sans-serif"} > {produto.description}</Typography>

            </Stack>
            <Stack flex={1} direction={"column"} alignItems={"center"} height="100%" width={"100%"}>
              <Typography color={tema.palette.primary.main} justifyContent={"start"} fontSize={"3em"} width={"100%"}> {produto.nome}</Typography>
              <Stack direction={"row"} width={"100%"}>
                <RenderizadorDeImagem imagemCrua={estrela} width="40px"></RenderizadorDeImagem>
                <RenderizadorDeImagem imagemCrua={estrela} width="40px"></RenderizadorDeImagem>
                <RenderizadorDeImagem imagemCrua={estrela} width="40px"></RenderizadorDeImagem>
                <RenderizadorDeImagem imagemCrua={estrela} width="40px"></RenderizadorDeImagem>
                <RenderizadorDeImagem imagemCrua={estrela} width="40px"></RenderizadorDeImagem>


                <Typography marginLeft="20px" textTransform={"none"} color={tema.palette.primary.main} fontSize={"2.4em"}> ver avaliações</Typography>
              </Stack>
              {
                produto.estoque != null && (
                  <Typography alignSelf={"start"} color={tema.palette.primary.main} fontSize={"1.4em"}>  {produto.estoque} unidades disponíveis </Typography>

                )
              }
              <Typography color={tema.palette.primary.main} fontSize={"3em"} alignSelf={"start"} > {produto.textoPreco}</Typography>
              {
                produto.parcelamento != null && (
                  <Typography color={tema.palette.primary.main} fontSize={"2.4em"} alignSelf={"start"} > ou 5x de 35,80 sem juros</Typography>

                )
              }
              {
                produto.precoPromocional != null && (
                  <Stack direction={"row"} alignItems={"start"} gap={"10px"} width={"100%"}>
                    <Typography color={tema.palette.primary.main} fontSize={"2.4em"} alignSelf={"start"} > ou {produto.precoPromocional} com </Typography>
                    <Square color={tema.palette.primary.main} >
                      <RenderizadorDeImagem width="50px" logo preto />
                    </Square>

                  </Stack>


                )
              }

              <Typography color={tema.palette.primary.main} fontSize={"1.4em"} alignSelf={"start"}>
                Formas de pagamento disponíveis:
              </Typography>
              <Stack direction={"row"} width={"100%"}>
                <Square color={tema.palette.primary.main}>
                  <RenderizadorDeImagem width="50px" logo preto />
                </Square>
                <Square color={tema.palette.secondary.main}>
                  <RenderizadorDeImagem width="50px" pix="true" />
                </Square>
              </Stack>
              <Stack direction={"column"} width={"100%"} justifyContent={"center"} gap="5px" marginY={"20px"}>
                {
                  produto.escolhaDeTamanho == true && (
                    <Select
                      sx={{ marginTop: "10px", width: "70%" }}
                      value={tamanhoSelecionado}
                      onChange={(e) => setTamanhoSelecionado(e.target.value)}

                      displayEmpty
                    >
                      <MenuItem value="">
                        <Typography color={tema.palette.primary.light} fontSize={"1.4em"} >Selecione o tamanho</Typography>
                      </MenuItem>
                      {tamanhosProduto.map((tamanho) => (

                        <MenuItem key={tamanho} value={tamanho}>
                          <Typography fontSize={"1.4em"}>{tamanho}</Typography>
                        </MenuItem>

                      ))}
                    </Select>
                  )
                }

                {produto.escolhaDeCor === true && (
                  <Select
                    sx={{ marginTop: "10px", width: "40%" }}
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
                      <MenuItem key={c.cor} value={c.cor} sx={{ width: "100%" }}>
                        <Typography width={"100%"} justifyContent={"center"}>{c.cor}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                )}
                <Box alignSelf={"center"} marginY={"20px"}>
                  <SelecionarQuantidade
                    onChange={(quantidade) => setQuantidadeSelecionada(quantidade)}
                  />

                </Box>
              </Stack>
              <Button variant="contained" color="primary" width="100%" sx={{
                paddingX: "20%",
                marginY: "20px"
              }}
                onClick={() => {
                  adicionarAoCarrinho(false)

                }}
              >
                <Typography fontSize={"1.9em"} textTransform={"none"}> Adicionar ao carrinho</Typography>
              </Button>
              <Button
                variant="contained"
                color="quinary"
                width="100%"
                sx={{
                  paddingX: "20%",
                  marginY: "20px"
                }}
                onClick={() => {
                  adicionarAoCarrinho(true)

                }}
              >
                <Typography color={"secondary"} fontSize={"1.9em"} textTransform={"none"} > Comprar Agora</Typography>
              </Button>
              <Typography fontSize={"2.9em"}> Compre também </Typography>
              {
                produto.compreTambem != null && (
                  <Card
                    sx={{
                      marginX: "30px",
                      paddingTop: "10px",
                      backgroundColor: "white",
                      borderRadius: 3,
                      boxShadow: 3,
                      width: "10vw",
                      minWidth: "280px",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.03)"
                      }
                    }}
                    onClick={() => {
                      navigate(`/produto/${produto.id}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`data:image/jpeg;base64,${produto.compreTambem.imagem}`}
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
                          fontSize="2.4em"
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
                )
              }

            </Stack>
          </Stack>
          <Stack direction={"column"} alignItems={"center"} fullwidth gap="30px">
            <Typography color={tema.palette.primary.main} fontSize={"3em"} > Produtos em destaque</Typography>
            <Grid
              container spacing={3} justifyContent="flex-start" height="100%">
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
                allowTouchMove={false}
                watchSlidesProgress={true}
                loopAdditionalSlides={outrosProdutosLoop.length}
              >
                {outrosProdutosLoop.map((produto, index) => (
                  <SwiperSlide
                    key={`${produto.id}-${index}`}
                    style={{ width: "300px" }}
                  >
                    <Card
                      sx={{
                        paddingTop: "10px",
                        backgroundColor: "white",
                        borderRadius: 3,
                        boxShadow: 3,
                        width: "10vw",
                        minWidth: "280px",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.03)"
                        }
                      }}
                      onClick={() => {
                        // setProdutoInspecionadoId(produto.id);
                        // obterProduto(produto.id);
                        // setInspecaoProduto(true);
                        // navigate(`produto/${produto.id}`)
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

            </Grid>
          </Stack>
          <Rodape />
        </Stack>
      )}

    </ThemeProvider>
  );
}

export default Produto;