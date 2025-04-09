import React, { useState } from "react";
import Inicio from "./Inicio";
import "./app.css";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Rodape from "./Rodape";
import { InicioContext } from "./InicioContext";
import { propiedadesDoTema } from "../utils/tema";

const tema = createTheme(propiedadesDoTema);

function App() {


  return (
    <ThemeProvider theme={tema}>

      <Stack sx={{ height: "100%" ,backgroundColor: tema.palette.primary.main }}>
          <Inicio />
          {/* <Rodape /> */}
      </Stack>
    </ThemeProvider>
  );
}

export default App;
