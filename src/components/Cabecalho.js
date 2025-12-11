import "./header.modules.css";
import { useNavigate } from "react-router-dom";
import logoUbuntuStore from "../assets/img/novo-logo-ubuntu.png";
import { BotaoBaixeApp } from "./BotaoBaixeApp";
import { menuItems } from "./MenuItems";
import BotaoLogin from "./BotaoLogin";
import HamburgerMenu from "./HamburgerMenu";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { AppBar, Toolbar, IconButton, Stack, Typography, createTheme, Box, TextField, Button, Menu, MenuItem, DialogContent, Dialog, DialogActions, Collapse, InputBase } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { propiedadesDoTema } from "../utils/tema";
import informaticaImg from '../assets/img/informatica.png';
import esportesImg from '../assets/img/esportes.png';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import animacao from "../assets/img/animacao_kamanda_cinza.mp4";
import SearchIcon from "@mui/icons-material/Search";
import { isMobile } from 'react-device-detect';
import { useEffect, useState, useRef } from "react";

function Cabecalho(props) {
  const tema = createTheme(propiedadesDoTema);
  const token = localStorage.getItem("token")
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const [nome, setNome] = useState("")
  const [usuario, setUsuario] = useState(null)
  const [valorBusca, setValorBusca] = useState("")
  const [dialogoKamanda, setDialogoKamanda] = useState(false)
  const [barraDePesquisa, setBarraDePesquisa] = useState(props.barraDePesquisa)
  const videoRef = useRef(null);
  const estaLogado = usuario && usuario !== "null" && token !== "null";
  const [anchorEl, setAnchorEl] = useState(null);
  const [alternarMenu, setAlternarMenu] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fecharMenu = () => {
    setAnchorEl(null);
  };
  const definirPontoDeAncora = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const pesquisar = () => {
    console.log("Pesquisando por:", valorBusca);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    };
    console.log(isMobile)
    playVideo();

    const interval = setInterval(playVideo, 8000);

    const storedUser = localStorage.getItem("usuario");
    if (storedUser && storedUser !== "null") {
      setUsuario(storedUser);
    }

    return () => clearInterval(interval);

  }, []);
  function irParaHome() {
    navigate("/");
  }

  return (
    <ThemeProvider theme={tema}>
      {
        isMobile ? (
          <Stack
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            padding="5px"
            sx={{ backgroundColor: "black" }}
            direction="column"
          >

            <video ref={videoRef} height="60px" width="200px" muted>
              <source src={animacao} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>

            <Stack direction="row" justifyContent="center" alignItems="center" marginTop="10px">
              {!estaLogado && (
                <Button color="secondary" variant="outlined" onClick={() => navigate("portal/login")}>
                  <Typography color="white" textTransform="none">Entrar</Typography>
                </Button>
              )}
              {estaLogado && (
                <Stack
                  onClick={(e) => {
                    setAlternarMenu(!alternarMenu)
                    definirPontoDeAncora(e)
                  }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography color="white" variant="h6">{usuario}</Typography>
                  <IconButton color="inherit">
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={alternarMenu}
                    onClose={() => {
                      setAlternarMenu(!alternarMenu)
                    }
                    }
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem onClick={() => navigate("/loja/meuspedidos")}>Meus Pedidos</MenuItem>
                    <MenuItem onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("usuario");
                      navigate("/");
                      window.location.reload();
                    }}>
                      Sair
                    </MenuItem>
                  </Menu>
                </Stack>
              )}
            </Stack>
          </Stack>) :
          (<AppBar sx={{}} position="sticky" style={{ backgroundColor: tema.palette.primary.main }}>

            <Toolbar
              className="cabecalho"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2
              }}
            >
              <Stack direction="row" className="grupoDeBotoes" sx={{ width: "33vw" }}>
                <Stack direction={"column"}>
                  <IconButton
                    disableRipple
                    color="inherit"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
                      <video ref={videoRef} height="50px" width="200px" muted>
                        <source src={animacao} type="video/mp4" />
                        Seu navegador não suporta vídeos.
                      </video>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setDialogoKamanda(true)}
                      >
                        <Typography
                          width={"100px"}
                          textTransform="none"
                          color={"white"}
                          fontSize={7}
                        >
                          O que é kamanda
                        </Typography>
                      </Button>
                    </Stack>
                  </IconButton>
                </Stack>
                <Button
                  onClick={() => navigate("/quemsomos")}
                >
                  <Typography
                    color="white"
                    textTransform="none"
                    sx={{
                      fontSize: "1rem",   // ajuste aqui o tamanho da fonte
                      whiteSpace: "nowrap", // impede quebrar linha
                    }}
                  >
                    Quem Somos
                  </Typography>
                </Button>

                <Button>
                  <Typography
                    color="white"
                    textTransform="none"
                    sx={{
                      fontSize: "1rem",      // ajuste o tamanho que quiser
                      whiteSpace: "nowrap",  // impede quebra de linha
                    }}
                  >
                    Siga nos
                  </Typography>
                </Button>
              </Stack>

              {barraDePesquisa &&
                <Box
                  className="barraDePesquisa"
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    width: "33vw",
                    maxWidth: 500
                  }}
                >
                  <TextField
                    value={valorBusca}
                    placeholder="Pesquisar..."
                    onChange={(e) => setValorBusca(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && pesquisar()}

                    sx={{
                      marginLeft: "20px",
                      width: "100%",
                      "& .MuiInputBase-root": {
                        height: 42,                      // altura fixa elegante
                        backgroundColor: "white",
                        borderRadius: "10px",
                        paddingLeft: "8px",              // texto alinhado à esquerda com espaço
                        fontSize: "15px",                // tamanho do texto
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontSize: "15px",                // placeholder do mesmo tamanho
                        color: "#1d1d1dff",                   // placeholder mais suave
                      }
                    }}

                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={pesquisar} sx={{ padding: "4px" }}>
                          <SearchIcon color="primary" fontSize="medium" />
                        </IconButton>
                      )
                    }}
                  />
                </Box>
              }

              <Stack direction="row" className="grupoDeBotoes2" sx={{
                display: "flex",
                width: "33vw", gap: "20px", alignItems: "end", justifyContent: "end", px: 2
              }}>
                {usuario ? (
                  <Typography
                    variant="h6"
                    sx={{
                      maxWidth: "20vw",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      wordBreak: "keep-all",
                    }}
                  >
                    {usuario}
                  </Typography>
                ) : (
                  <Stack direction={"row"} gap={"4px"}>
                    <Button color="secondary" sx={{ px: "20px" }} variant="text" onClick={() => navigate("/portal/login")}>
                      <Typography color="white" textTransform="none" fontWeight={"40"}>Cadastrar</Typography>
                    </Button>
                    <Button color="secondary" sx={{ px: "20px" }} variant="text" onClick={() => navigate("/portal/login")}>
                      <Typography color="white" textTransform="none">Entrar</Typography>
                    </Button>

                  </Stack>

                )}

                {estaLogado && (
                  <>
                    <IconButton color="inherit" onClick={(e) => {
                      definirPontoDeAncora(e)
                      setAlternarMenu(!alternarMenu)
                    }}>
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={alternarMenu}
                      onClose={() => setAlternarMenu(false)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      { }
                      <MenuItem onClick={() => navigate("/loja/meuspedidos")}>Meus Pedidos</MenuItem>

                      <MenuItem onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("usuario");
                        navigate("/");
                        window.location.reload();
                      }}>
                        Sair
                      </MenuItem>
                    </Menu>
                  </>
                )}

              </Stack>
            </Toolbar>
          </AppBar>)
      }
      <Dialog open={dialogoKamanda}>
        <DialogContent>
          <Typography  >Kamanda significa "Camarada". É como os falantes de refenciavam as pessoas que tinham afinidade intelectual, assim como chamamos Camarada ou Companheiro aqui no Brasil.
          </Typography>
          <Typography marginTop={"5px"} > Swahili, um idioma Bantu (análogo ao Latim), é o terceiro idioma mais falado no continente africano, atrás do Inglês e o Francês. Logo,
            a referencia ao nome "Kamanda" é um resgate a um fragmento das raízes do povo negro
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outline" onClick={() => {
            setDialogoKamanda(false)
          }}>Fechar</Button></DialogActions>
      </Dialog>
    </ThemeProvider >
  );
};


export default Cabecalho;
