import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

function ItemEntrega(props) {
  console.log(props.props)
  let nome = ""

  if (props.props.nome == "" || props.props.nome == null) {
    nome = "Indefinido"
  } else {
    nome = props.props.nome
  }
  return (
    <Box >
      <Stack
        direction={"row"}
        width={"70%"}
        alignContent={"space-evenly"}
        justifyContent={"space-around"}

        borderRadius={"5px"}
        borderColor={"black"}
        margin={"5px"}
      >

        <Stack
          direction={"column"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography color={"black"} variant="h6">Nome </Typography>
          <Box height={"10px"} />
          <Typography color={"black"}>{nome}</Typography>
        </Stack>
        <Stack
          direction={"column"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography color={"black"} variant="h6">Status </Typography>
          <Box height={"10px"} />
          <Typography color={"black"}>{props.props.status}</Typography>
        </Stack>

        <Box sx={{ backgroundColor: "red" }}></Box>
        <Stack
          direction={"column"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography color={"black"} variant="h6">Endereco Inicial </Typography>
          <Typography color={"black"}>{props.props.enderecoInicial}</Typography>
        </Stack>
        <Stack
          direction={"column"}
          display={"flex"}
          alignItems={"center"}>
          <Typography color={"black"} variant="h6">Endereco Final </Typography>
          <Typography color={"black"}>{props.props.enderecoFinal}</Typography>
        </Stack>

      </Stack>
      <Divider variant="fullWidth"></Divider>

    </Box>

  );
}

export default ItemEntrega;
