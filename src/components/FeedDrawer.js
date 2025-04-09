import "./barra-lateral.modules.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, MenuItem, IconButton, Drawer, Box, Stack } from "@mui/material";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import ArticleSharp from "@mui/icons-material/ArticleSharp";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
function FeedDrawer(props) {
  const [feedAberto, setFeedAberto] = useState(false);
  const [publicacoes, setPublicacoes] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    obterPublicacoes();
  }, []);

  let ip = "";

  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }
  const obterPublicacoes = async () => {
    try {
      const response = await axios.post(
        ip + "/feed/obter",
        {

        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setPublicacoes(response.data.publicacoes)
    } catch (error) {
      console.log(error);
    }
  };
  const lerMateria = async (id) => {
    localStorage.setItem("idMateria",id)
   navigate("/noticias/leitura")
  };
  return (
    <>
      <IconButton
        onClick={() => setFeedAberto(true)}

        sx={{
          position: "fixed",
          bottom: 20,
          left: 20,
          border: 5,
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        <ArticleSharp />
      </IconButton>

      <Drawer
        anchor="left"
        open={feedAberto}

        onClose={() => {
          setFeedAberto(false);
          localStorage.setItem("feedAberto", "false");
        }}
        PaperProps={{
          sx: {
            width: "25vw",
            minWidth: 300,
            maxWidth: 400,
            height: "100vh",
            borderRadius: "12px 0 0 12px",
            overflowY: "auto",
            backgroundColor: "black",
            padding: 2,
          },
        }}
      >
        <Typography variant="h5" textAlign="center" color={"white"} fontWeight="bold" mb={2}>
          Notícias
        </Typography>

        <Stack spacing={3} backgroundColor= "black" alignItems="center">
        {publicacoes
  .filter((item) => item.tipoPublicacao === "TEXTO")
  .map((item, index) => (
    <Stack
      key={index}
      direction="column"
      spacing={2}
      width="100%"
      sx={{ cursor: "pointer", padding: 2, borderRadius: "8px", transition: "0.3s", "&:hover": { backgroundColor: "#f5f5f5" } }}
      onClick={() => lerMateria(item.id)}
    >
      {/* Cabeçalho com imagem e nome do autor */}
      <Stack direction="row"  alignItems="center" spacing={2} sx={{backgroundColor:"black"}}>
        <RenderizadorDeImagem arredondado="" width="50px" imagem={item.autorPrincipal.miniatura} />
        <Typography variant="h6" color={"white"} fontWeight="bold">{item.autorPrincipal.nome}</Typography>
      </Stack>

      {/* Manchete */}
      <Typography variant="h6" textAlign={"center"} color="white">
        {item.manchete}
      </Typography>

      {/* Imagem da matéria */}
      {item.imagem && (
        <RenderizadorDeImagem
          width="100%"
          imagem={item.imagem}
          sx={{
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        />
      )}

      {/* Resumo */}
      <Typography color="white" textAlign={"center"} >
        {item.resumo.length > 100 ? `${item.resumo.substring(0, 100)}...` : item.resumo}
      </Typography>

      {/* Botão "Ver mais" */}
      {item.resumo.length > 100 && (
        <Button variant="contained" color="secondary" sx={{ alignSelf: "start", textTransform: "none" }}>
          <Typography textTransform={"none"} color= "black" fontWeight={"bold"}>Ler artigo</Typography>
        </Button>
      )}
    </Stack>
  ))}

        </Stack>
      </Drawer>
    </>
  );

}
export default FeedDrawer;
