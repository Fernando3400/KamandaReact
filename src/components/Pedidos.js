import React from "react";
import BarraLateral from "./BarraLateral";
import axios from "axios";
import { useState, useEffect } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import CardPedido from "./ItemPedido";
import "./pedidos.css";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Tab,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import GradeDePedidos from "./GradeDePedidos";
import RingBell from "./RingBell";
import { propiedadesDoTema } from "../utils/tema";
import { Howl } from "howler";
import Cabecalho from "./Cabecalho";

function Pedidos() {
  const [lista, setLista] = useState([]);
  const [secoesPedidos, setSecoesPedidos] = useState([]);
  const [guia, setguia] = useState(0);
  const tema = createTheme(propiedadesDoTema);

  let ip = "";

  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  const obterPedidos = async () => {
    try {
      const response = await axios.get(
        ip + "/estabelecimento/listarpedidos",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);

      setSecoesPedidos(response.data.pedidos);
      if (response.data.pedidos[0].secao.length > 0) {
        new RingBell().playSound();
        const sound = new Howl({
          src: RingBell,
        });
        sound.play();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obterPedidos();
  }, []);

  // Function to fetch data and refresh every 10 seconds
  const refreshData = () => {
    obterPedidos();
  };

  // Set up an interval to refresh data every 10 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 10000); // 10,000 milliseconds = 10 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={tema}>
       <Cabecalho  />
      <div className="homeEstabelecimento">
        <BarraLateral />
        <Stack alignIntems={"center"} direction={"column"} sx={{backgroundColor: "#e2ffe4"}}>
          <Typography
            textAlign="center"
            color={tema.palette.secondary.dark}
            marginTop={"20px"}
            marginBottom={"20px"}
            variant="h3"
          >
            Painel de Pedidos
          </Typography>

          <GradeDePedidos props={secoesPedidos}></GradeDePedidos>
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default Pedidos;
