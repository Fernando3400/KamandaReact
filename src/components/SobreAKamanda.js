import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { Box, Button, createTheme, MenuItem, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import Cabecalho from "./Cabecalho";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import { propiedadesDoTema } from "../utils/tema";
import axios from "axios";

function SobreAKamanda() {

  const navigate = useNavigate();
  const [idMateria, setIdMateria] = useState(localStorage.getItem("idMateria"));
  const tema = createTheme(propiedadesDoTema);



  useEffect(() => {

  }, []);
  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  const enviarContato = async (id) => {
    try {
      const response = await axios.post(
        ip + "/contato/registrar",
        {
          temaDoAtendimento: temaSelecionado[1],
          descricao: descricao
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

    } catch (error) {
      console.log(error);
    }

  };
  return (
    <ThemeProvider theme={tema}>
      <Stack
        bgcolor={tema.palette.tertiary.main}
        direction={"column"}
        height={"100%"}
      >
        <Cabecalho />
      <Typography  />
      </Stack>
    </ThemeProvider>
  );
}

export default SobreAKamanda;