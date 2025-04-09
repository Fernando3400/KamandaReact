import { Stack, Typography, Paper } from "@mui/material";
import RenderizadorDeImagem from "./RenderizadorDeImagem";


const Materia = ({ manchete, resumo, texto, imagem }) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#f5f0e1", padding: 2 }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 800,
          padding: 4,
          backgroundColor: "#fffdfa",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          fontFamily: "Georgia, serif",
        }}
      >
        <RenderizadorDeImagem imagem={imagem} width ="100%" height="100%"/>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ color: "#333", marginTop: "20px" }}
        >
          {manchete}
        </Typography>

        <Typography
          variant="subtitle1"
          fontStyle="italic"
          gutterBottom
          textAlign="center"
          sx={{ color: "#555" }}
        >
          {resumo}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#222",
            lineHeight: 1.8,
            textAlign: "justify",
            marginTop: 2,
          }}
        >
          {texto}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default Materia;
