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

function ItemPedido(props) {
  const navigate = useNavigate();
  console.log(props)
  const detalhesDePedido = async () => {
    navigate("/estabelecimentos/pedidos/detalhes");
  };

  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }
  
  const responderPedido = async (foiAceito) => {
    try {
      localStorage.getItem("estabelecimentoId");
      const response = await axios.post(
        ip + "/loja/pedidos/responder",
        {
          idDePedido: props.id,
          foiAceito: foiAceito,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );  console.log(response);

    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  return (
    <Grid
      item
      className="card-pedido"
      m="20px"
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={4}
    >
      <Box display={"flex"} justifyContent={"center"}>
        <RenderizadorDeImagem
        loggi=""
        imagem={props.miniatura}
          width={250}
          height={250}
        ></RenderizadorDeImagem>
      </Box>
      <Box>
        <div className="card-titulo">{props.titulo}</div>
      </Box>
      <div className="card-botoes">
        {props.status === "PEDIDO" && (
          <Stack direction={"column"} >
            
            {/* <Button
              variant="contained"
              onClick={() => {
                detalhesDePedido();
              }}
            >
              <Typography variant="body2" fontSize={"12px"}>
                Ver detalhes
              </Typography>
            </Button> */}
            <Button
              variant="contained"
              onClick={() => {
                responderPedido(true);
              }}
            >
              <Typography variant="body2" fontSize={"12px"}>
                Aceitar
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                responderPedido(true);
              }}
            >
              <Typography variant="body2" fontSize={"12px"}>
                Recusar
              </Typography>
            </Button>
          </Stack>
        )}
        {props.status === "ACEITO" && (
          <Stack direction={"column"}>
            <Button
              variant="contained"
              onClick={() => {
                responderPedido(true);
              }}
            >
              <Typography
                variant="body2"
                fontSize={"12px"}
                textTransform={"capitalize"}
              >
                Iniciar Preparo
              </Typography>
            </Button>
          </Stack>
        )}
        {props.status === "PREPARANDO_PACOTES" && (
          <Stack direction={"column"}>
            <Button
              variant="contained"
              onClick={() => {
                responderPedido(true);
              }}
            >
              <Typography
                variant="body2"
                fontSize={"12px"}
                textTransform={"capitalize"}
              >
                Pronto para entrega
              </Typography>
            </Button>
          </Stack>
        )}
        {props.status === "AGUARDANDO_ENTREGA" && (
          <Stack direction={"column"}>
            {/* <Button
              variant="contained"
              onClick={() => {
                responderPedido(true);
              }}
            >
              <Typography
                variant="body2"
                fontSize={"12px"}
                textTransform={"capitalize"}
              >
                Iniciar entrega
              </Typography>
            </Button> */}
          </Stack>
        )}
        {props.status === "ENTREGANDO" && (
          <Stack direction={"column"}>
            <Button
              variant="contained"
              onClick={() => {
                responderPedido(true);
              }}
            >
              <Typography
                variant="body2"
                fontSize={"12px"}
                textTransform={"capitalize"}
              >
                Concluir entrega
              </Typography>
            </Button>
          </Stack>
        )}
        <Stack direction={"column"} marginTop="10px">
          {
            
            props.composicao.map(
              (unidade) => {
                return (
                  <Stack width={"100%"} direction= "row"  justifyContent={"center"} alignItems="center" justifyItems={"center"} spacing="10px" border={"2px"}>
                    <Typography color={"black"}  fontFamily="cursive">{unidade.quantidade} x</Typography>
                    {/* <RenderizadorDeImagem width = "50px" height = "50px"  imagem={unidade.miniatura} /> */}
                    <Typography color={"black"}> {unidade.nome}</Typography>
                  </Stack>
                )
              }
              
            )
          }
          <Box>
            <Typography color={"black"}  fontFamily="cursive">
              Valor: {props.valor}
            </Typography>
          </Box>
          <Box>
            <Typography color={"black"}  fontFamily="cursive">
              Endereço: {props.endereco}
            </Typography>
          </Box>
        </Stack>
      </div>
    </Grid>
  );
}

export default ItemPedido;
