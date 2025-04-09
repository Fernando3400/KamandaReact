import React from "react";
import HeaderEstabelecimento from "./HeaderEstabelecimento";
import BarraLateral from "./BarraLateral";
import Rodape from "./Rodape";
import axios from "axios";
import { useState, useEffect } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import ItemCardapio from "./ItemCardapio";
import "./cardapio.css";
import { Box, Grid, Typography } from "@mui/material";

function DetalheDePedido(props) {
  const [lista, setLista] = useState([]);

  const itemCardapioNotify = async () => {
    let ip = "";
    if (ambiente === "dev") {
      ip = devIp;
    }
  
    if (ambiente === "prod") {
      ip = prodIp;
    }
    try {
      const response = await axios.post(
        ip + "/estabelecimento/telas/pedidos/detalhes",
        {
            idPedido: props.id
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
  
      setLista(response.data.lista);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    itemCardapioNotify();
  }, []);

  return (
    <div>
      <HeaderEstabelecimento logo={true} />
      <div className="homeEstabelecimento">
        <BarraLateral />
        <Box>
          <Box>
            <Typography className="titulo-pagina" color={"black"} variant="h3">
              Cardapio
            </Typography>
          </Box>

          <Grid container   className="grade-cardapio"  
            xs= {12}
            sx={{ gap: "15px", margin: "50px"}}
          >
            {lista.map((i) => {
              return <ItemCardapio props= {i}></ItemCardapio>;
            })}
          </Grid>
        
        </Box>
      </div>

      <Rodape />
    </div>
  );
}

export default DetalheDePedido;
