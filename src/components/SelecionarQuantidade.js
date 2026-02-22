import { useState } from "react";
import { Box, Button, createTheme, Typography, useMediaQuery } from "@mui/material";
import { propiedadesDoTema } from "../utils/tema";

const SelecionarQuantidade = ({ onChange }) => {
  const [quantidade, setQuantidade] = useState(1);
  const tema = createTheme(propiedadesDoTema);
  const isMobile = useMediaQuery(tema.breakpoints.down("sm"));
  const alterarQuantidade = (novoValor) => {
    if (novoValor < 1) return;
    setQuantidade(novoValor);
    onChange(novoValor);
  };

  return (<>
    {isMobile == true ? (
      <Box display="flex" alignItems="center" gap={2} marginTop={2}>
        <Button variant="contained" color="secondary" onClick={() => alterarQuantidade(quantidade - 1)}>
          <Typography fontWeight={600}>
            -</Typography>
        </Button>
        <Typography fontSize={"1.4em"}>{quantidade}</Typography>
        <Button variant="contained" color="secondary" onClick={() => alterarQuantidade(quantidade + 1)}>
          <Typography fontWeight={600}>
            +</Typography>
        </Button>
      </Box >
    ) : (
      <Box display="flex" alignItems="center" gap={2} marginTop={2}>
        <Button variant="contained" color="secondary" onClick={() => alterarQuantidade(quantidade - 1)}><Typography fontWeight={600}>
          -</Typography></Button>
        <Typography fontSize={"1.4em"}>{quantidade}</Typography>
        <Button variant="contained" color="secondary" onClick={() => alterarQuantidade(quantidade + 1)}><Typography fontWeight={600}>
          +</Typography></Button>
      </Box >)
    }
  </>





  );
};

export default SelecionarQuantidade;
