import React from 'react';
import Header from '../../cabecalho/Header';
import Footer from './Footer';
import PrimeiraSecao from './PrimeiraSecao';
import { Box, Button, Icon, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

function NossaMissao() {
  return (
    <div>
      <Header
      logo={true}
      baixar={true}
      />
         <Typography variant="h2">Ubuntu</Typography>
      <Footer />
    </div>
  );
}

export default NossaMissao;
