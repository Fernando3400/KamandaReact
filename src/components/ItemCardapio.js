import React from "react";


import { useNavigate } from "react-router-dom";

import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box, Card, CardContent } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import RenderizadorDeImagem from "./RenderizadorDeImagem";

function ItemCardapio(props) {
  const navigate = useNavigate();
  const navegarParaProduto = () => {
    console.log(localStorage.setItem("produto", props.props.id));
    navigate("/portal/estabelecimentos/produto/edicao");
  };
  // console.log(props.props.imagem)
  // console.log(props)
  const solicitarExclusao = () => {
    console.log("item excluido");
  };
  const excluirItem = () => {
    if (window.confirm("Tem certeza que deseja remover seu produto?")) {
      solicitarExclusao();
    } else {
    }
  };

  // localStorage.setItem(
  //   "produto",
  //   props.
  // )
  return (
    <Grid item  width={"auto"}>
      <Card sx={{ width: "200px" }}>
        <CardContent xs="12" width="100%" bg="black">
          <Stack direction={"column"}>
            <Box display={"flex"} justifyContent={"center"}>
              <RenderizadorDeImagem
                imagem={props.props.imagem}
                width= "250"
                height="250"
              ></RenderizadorDeImagem>
            </Box>
            <Box
              width={"100%"}
              bgcolor={"black"}
              height={"2px"}
              marginTop={"6px"}
            ></Box>
            <Stack
              direction={"row"}
              display={"flex"}
              justifyContent="space-around"
            >
              <Typography
                className="titulo-pagina"
                textTransform={"capitalize"}
              >
                {props.props.titulo}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              display={"flex"}
              justifyContent="space-around"
            >
              <Typography>Preço: </Typography>
              <Typography>R${props.props.preco},00</Typography>
            </Stack>
            <Stack direction="row" width="100%">
              <>
                <Typography>{props.props.avaliacao}</Typography>
              </>
            </Stack>
            <Stack direction="column" width="100%">
              <Button
                variant="contained"
                onClick={() => {
                  navegarParaProduto();
                }}
              >
                <Typography textTransform={"none"} onClick={() => {}}>
                  {" "}
                  Mais Detalhes
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ItemCardapio;
