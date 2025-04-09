import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const SelecionarQuantidade = ({ onChange }) => {
  const [quantidade, setQuantidade] = useState(1);

  const alterarQuantidade = (novoValor) => {
    if (novoValor < 1) return;
    setQuantidade(novoValor);
    onChange(novoValor);
  };

  return (
    <Box display="flex" alignItems="center" gap={2} marginTop={2}>
      <Button variant="contained" onClick={() => alterarQuantidade(quantidade - 1)}>-</Button>
      <Typography fontSize={20}>{quantidade}</Typography>
      <Button variant="contained" onClick={() => alterarQuantidade(quantidade + 1)}>+</Button>
    </Box>
  );
};

export default SelecionarQuantidade;
