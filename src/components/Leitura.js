import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import "./card-pedido.css";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import Cabecalho from "./Cabecalho";
import Materia from "./Materia";
import { use } from "react";

function Leitura() {
  const navigate = useNavigate();
  const [imagemMateria, setImagemMateria] = useState(null);
  const [textoMateria, setTextoMateria] = useState("");
  const [manchete, setMancheteMateria] = useState("");
  const [resumo, setResumoMateria] = useState("");
  const [idMateria, setIdMateria] = useState(localStorage.getItem("idMateria"));

  const detalhesDePedido = async () => {
    navigate("/estabelecimentos/pedidos/detalhes");
  };
  useEffect(() => {
    setIdMateria();
    obterPublicacao();
  }, []);
  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  const obterPublicacao = async (id) => {
    try {
      const response = await axios.post(
        ip + "/feed/obterpublicacao",
        {
          idPublicacao: idMateria

        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setImagemMateria(response.data.imagem)
      setTextoMateria(response.data.texto)
      setMancheteMateria(response.data.manchete)
      setResumoMateria(response.data.resumo)
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <Stack
      direction={"column"}
    >
      <Cabecalho />
      <Materia imagem={imagemMateria} texto={textoMateria} manchete={manchete} resumo= {resumo} />
    </Stack>
  );
}

export default Leitura;
