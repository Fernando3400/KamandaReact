import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { Box, Button, createTheme, MenuItem, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import Cabecalho from "./Cabecalho";
import { propiedadesDoTema } from "../utils/tema";
import axios from "axios";
import RenderizadorDeImagem from "./RenderizadorDeImagem";

function Produto() {

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
        bgcolor={tema.palette.secondary.main}
        direction={"column"}
        height={"100%"}
 
      >
        <Cabecalho />
        <Stack direction={"row"} paddingY={"50px"}>
          <Stack direction={"column"} alignItems={"center"}>
            <Stack direction={"row"} width={"50vw"}>
              <Stack direction={"column"}width={"30%"}>
                <RenderizadorDeImagem loggi={true} width="100px" />
                <RenderizadorDeImagem loggi={true} width="100px" />
                <RenderizadorDeImagem loggi={true} width="100px" />
              </Stack>
              <Stack direction={"column"} ali width="70%">
                <RenderizadorDeImagem loggi={true} width={"300px"}/>
              </Stack>
            </Stack>
          
          </Stack>

          <Stack direction={"column"}alignItems={"center"} width={"100%"}>
            <Typography color={tema.palette.primary.main}> Nome do produto</Typography>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default Produto;