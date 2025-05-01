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

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import animacao from "../assets/img/animacao.mp4";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState, useRef } from "react";
function Cabecalho(props) {

  const tema = createTheme(propiedadesDoTema);
  const token = localStorage.getItem("token")
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tipoConta, setTipoConta] = localStorage.getItem("tipoConta");

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const [nome, setNome] = useState("")
  const [usuario, setUsuario] = useState(null)
  const [dialogoKamanda, setDialogoKamanda] = useState(false)

  const videoRef = useRef(null);
  const estaLogado = usuario && usuario !== "null" && token !== "null";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    };

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
      <AppBar sx={{ height: "10vh" }} position="sticky" style={{ backgroundColor: tema.palette.primary.main }}>
        <Toolbar
          sx={{
            display: "flex",
            flexWrap: "wrap", // permite quebra de linha
            alignItems: "center",
            justifyContent: "space-between",
            rowGap: 1, // espaço vertical entre linhas
          }}
        >
          {/* Linha Esquerda */}
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <IconButton
              disableRipple
              color="inherit"
              onClick={() => {
                navigate("/");
              }}
            >
              <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
                <video ref={videoRef} height="60px" width="200px" muted>
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
                    fontSize={10}
                  >
                    O que é kamanda
                  </Typography>
                </Button>
              </Stack>
            </IconButton>

            <IconButton onClick={() => setShowSearch(!showSearch)} color="secondary">
              <SearchIcon />
            </IconButton>

            <Collapse
              in={showSearch}
              orientation="horizontal"
              sx={{
                display: showSearch ? "flex" : "none",
                alignItems: "center",
              }}
            >
              <InputBase
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => {
                  setTimeout(() => setShowSearch(false), 100);
                }}
                autoFocus
                sx={{
                  color: "white",
                  bgcolor: "#66000000",
                  px: 1,
                  borderRadius: 1,
                  border: "1px solid #ccc",
                  height: 36,
                  width: "30vw",
                  minWidth: "200px",
                  fontSize: "1rem",
                  '& input::placeholder': {
                    fontSize: "0.85rem",
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontStyle: "italic",
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/loja?search=${searchTerm}`);
                    setShowSearch(false);
                  }
                }}
              />
            </Collapse>
          </Stack>

          {/* Linha Direita (vai pra linha de baixo em telas pequenas) */}
          <Typography
            variant="h6"
            color="white"
            sx={{
              mt: { xs: 1, sm: 0 }, // margin top só em telas pequenas
              width: { xs: "100%", sm: "auto" }, // quebra em 100% no mobile
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            {props.nome}
          </Typography>

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

          {/* Nome do usuário e botões à direita (peso médio) */}

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
            {/* Botões à esquerda */}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>


              <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>

              </Box>
            </Box>

            {/* Usuário / Login / Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {usuario ? (
                <Typography variant="h6">{usuario}</Typography>
              ) : (
                <Button color="secondary" sx={{ px: "20px" }} variant="contained" onClick={() => navigate("portal/login")}>
                  <Typography color="black" textTransform="none">Entrar</Typography>
                </Button>
              )}

              {estaLogado && (
                <>
                  <IconButton color="inherit" onClick={handleClick}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {}
                    <MenuItem onClick={() => navigate("/loja/meuspedidos")}>Meus Pedidos</MenuItem>
                    <MenuItem onClick={() => navigate("/portal/estabelecimentos/minhaloja")}>Area de Estabelecimentos</MenuItem>
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
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};


export default Cabecalho;
