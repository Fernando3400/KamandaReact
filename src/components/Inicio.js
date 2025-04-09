import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Card, CardContent, CardMedia,
  Typography,
  colors,
  useTheme,
  Stack,
  DialogContent,
  Dialog,
} from "@mui/material";
import Cabecalho from "./Cabecalho";
import Vitrine from "./Vitrine";
import Carrinho from "./Carrinho";
import { InicioContext } from "./InicioContext";
import FeedDrawer from "./FeedDrawer";

function Inicio() {
  const [format, setFormat] = useState([]);

  const tema = useTheme();
  const navigate = useNavigate();


  function irParaLogin() {
    navigate("/portal/login");
  }



  return (

    <Stack
      width="100%"
      height="120vh"
      className="Inicio"
      sx={{
        backgroundColor: tema.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        flexGrow: 1
      }}
    >
      <Cabecalho />
      
      <Stack direction={"row"} width="100vw" height="100vh">
        <Vitrine />
      </Stack>
      <Carrinho></Carrinho>
      <FeedDrawer />
    </Stack>


  );
}

export default Inicio;
