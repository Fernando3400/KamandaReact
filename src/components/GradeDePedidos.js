import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Tab,
  Typography,
  colors,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import CardPedido from "./ItemPedido";
import ItemPedido from "./ItemPedido";

function GradeDePedidos(props) {
  const [lista, setLista] = useState([]);
  const [secoesPedidos, setSecoesPedidos] = useState([]);
  const [guia, setguia] = useState(0);
  
  useEffect(()=>{
      setSecoesPedidos(props.props)
    });
    console.log(secoesPedidos )

    if (secoesPedidos.length > 0) {
    return (
      
        <TabContext value={guia}>
          <TabList variant="fullWidth" value={guia}>
            {secoesPedidos.map((obj, index) => {
              let titulo= obj.titulo + "\n  ("+ obj.secao.length + ")"
              {/* let titulo= obj.titulo +  " ("+ secoesPedidos.secao[0].length + ")" */}
              return (
                <Tab 
                  onClick={() => {
                    setguia(index);
                  }}
                  value={index}
                  label={titulo}
                ></Tab>
              );
            })}
          </TabList>

          {secoesPedidos.map((secao, index) => {
            return (
              <TabPanel value={index}>
                <Grid
                  container
                  className="grade-pedidos"
                  justifyItems={"center"}
                >
                  {secao.secao.map((card) => {
                 
                 return (
                      <ItemPedido
                        status={card.status}
                        id={card.pedidoId}
                        titulo={card.nomeDoCliente}
                        composicao={card.composicao}
                        endereco={card.endereco}
                        valor = {card.valor}
                      ></ItemPedido>
                    );
                  })}
                </Grid>
              </TabPanel>
            );
          })}
        </TabContext>
     
    );
  } else {
    return (
      <Paper
        sx={{ padding: "20px" }}
        elevation={4}
        width="200px"
        height="200px"
      >
        <Typography textAlign={"center"} className="texto-Pedidos">
          Ainda não houve pedidos
        </Typography>
      </Paper>
    );
  }
}

export default GradeDePedidos;
