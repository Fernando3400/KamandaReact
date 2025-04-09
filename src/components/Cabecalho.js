import "./header.modules.css";
import { useNavigate } from "react-router-dom";
import logoUbuntuStore from "../assets/img/novo-logo-ubuntu.png";
import { BotaoBaixeApp } from "./BotaoBaixeApp";
import { menuItems } from "./MenuItems";
import BotaoLogin from "./BotaoLogin";
import HamburgerMenu from "./HamburgerMenu";
import { AppBar, Toolbar, IconButton, Stack, Typography, createTheme, Box, TextField, Button, Menu, MenuItem, DialogContent, Dialog, DialogActions } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { propiedadesDoTema } from "../utils/tema";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import animacao from "../assets/img/animacao.mp4";


import { useEffect, useState, useRef } from "react";
function Cabecalho(props) {

  const tema = createTheme(propiedadesDoTema);
  const token = localStorage.getItem("token")

  const [nome, setNome] = useState("")
  const [usuario, setUsuario] = useState(null)
  const [dialogoKamanda, setDialogoKamanda] = useState(false)

  const videoRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
      <AppBar sx={{height:"10vh"}} position="sticky" style={{ backgroundColor: tema.palette.primary.main }}>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>

          <Stack direction={"row"} sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexGrow: 1 }}>
            <IconButton
              disableRipple
              color="inherit"
              onClick={() => {
                navigate("/");
              }}
            >
              <Stack direction={"column"} alignItems={"center"}>
                <video ref={videoRef} height="60px" width="200px" muted>
                  <source src={animacao} type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setDialogoKamanda(true);
                  }}
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
            <Typography variant="h6" color={"white"}>{props.nome}</Typography>

          </Stack>

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1, justifyContent: "flex-end" }}>
            {usuario ? <Typography variant="h6">{usuario}</Typography> :
              <Button color="secondary" sx={{ paddingX: "20px"}} variant="contained" onClick={() => {
                navigate("portal/login")
              }}>
                <Typography color={"black"} textTransform={"none"}>Entrar</Typography>
              </Button>
            }
            {usuario != "null" && usuario != null && token != "null" &&
              <IconButton color="inherit" onClick={handleClick}>
                <AccountCircleIcon />
              </IconButton>
            }
            {usuario != "null" && usuario != null && token != "null" && <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => {
                navigate("/loja/meuspedidos")

              }}>Meus Pedidos</MenuItem>
              <MenuItem onClick={() => {
                localStorage.setItem("token", null)
                localStorage.setItem("usuario", null)
                navigate("/")
                window.location.reload()
              }}>Sair</MenuItem>
            </Menu>}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};


export default Cabecalho;
