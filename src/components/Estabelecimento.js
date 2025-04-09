import React from 'react';
import Header from './Cabecalho';
import Rodape from "./Rodape";import PrimeiraSecao from './PrimeiraSecao';

function Estabelecimento() {
  return (
    <div>
      <Header/>
      <PrimeiraSecao/>
      <Rodape />
    </div>
  );
}

export default Estabelecimento;
