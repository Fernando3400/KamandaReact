import { ThemeProvider } from "@emotion/react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography, createTheme, DialogActions } from "@mui/material";

import React, { useState } from "react";
import { ambiente, devIp, prodIp } from "../propriedades";
import { propiedadesDoTema } from "../utils/tema";
import BarraLateral from "./BarraLateral";
import Rodape from "./Rodape";
import axios from "axios";
import Cabecalho from "./Cabecalho";

function Publicar() {


    let ip = "";
    if (ambiente === "dev") {
        ip = devIp;
    }

    if (ambiente === "prod") {
        ip = prodIp;
    }

    const token = localStorage.getItem("token");
    const [imagem, setImagemByteArray] = useState([]);
    const [manchete, setManchete] = useState("");
    const [texto, setTexto] = useState("");
    const [resumo, setResumo] = useState("");
    const [categoria, setCategoria] = useState("POLITICA");
    const [dialogoDeDentroDaTelaDePrimeiroAcesso, setDialogoDeDentroDaTelaDePrimeiroAcesso] = useState(false);
    const definirImagemProdutoEditado = (event) => {
        try {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // Lê a imagem como Base64
    
            reader.onload = (event) => {
                let url = event.target.result;
    
                let image = new Image();
                image.src = url;
    
                image.onload = () => {
                    const larguraDesejada = 400;
                    const alturaDesejada = 300;
    
                    let canvas = document.createElement("canvas");
                    canvas.width = larguraDesejada;
                    canvas.height = alturaDesejada;
    
                    let context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, larguraDesejada, alturaDesejada);
    
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                console.error("Erro ao processar a imagem: Blob nulo");
                                return;
                            }
    
                            let reader = new FileReader();
                            reader.readAsDataURL(blob);
    
                            reader.onloadend = () => {
                                let base64Data = reader.result.split(",")[1]; // Remove "data:image/jpeg;base64,"
                                setImagemByteArray(base64Data); // ✅ Salva apenas a string Base64 no estado
                               
                            };
                        },
                        "image/jpeg",
                        0.9
                    );
                };
            };
        } catch (error) {
            console.error("Erro ao processar a imagem:", error);
        }
    };
    
    

    const enviarFormulario = async () => {
        console.log("publicando...");
        console.log({
            texto: { texto },
            tipoPublicacao: "TEXTO",
            resumo: { resumo },
            imagem: { imagem },
            manchete: { manchete }


        })
        try {
            const resposta = await axios.post(
                ip + "/perfil/publicar",
                {
                    texto: texto,
                    tipoPublicacao: "TEXTO",
                    resumo: resumo,
                    imagem: imagem,
                    manchete: manchete,
                    categoria: categoria,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log(resposta)
            if (resposta.status == 200) {
                setManchete("")
                setTexto("")
                setResumo("")
                setDialogoDeDentroDaTelaDePrimeiroAcesso(false)
            }
        } catch (error) {
            console.log("erro")
            console.log(error)
        }

    };

    return (

        <Box>

            <Dialog open={dialogoDeDentroDaTelaDePrimeiroAcesso}>
                <DialogContent>
                    <Typography> Confimar? </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={enviarFormulario}
                    >
                        <Typography color="black" textTransform={"none"}>
                            Confirmar
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
             <Cabecalho/>
            <Stack direction={"row"} width="100%" alignContent={"center"}>
                <Stack direction={"column"} >
                    <BarraLateral />

                </Stack >
                <Stack
                    direction="column"
                    alignItems="center"
                    width="60%"
                    paddingTop="20vh"
                    bgcolor="white" // Garante que o fundo seja branco
                    boxShadow={3}   // Adiciona um leve sombreamento para destacar
                    padding={3}     // Adiciona espaçamento interno
                    borderRadius={2} // Borda arredondada para melhorar a estética
                >

                    <TextField
                        fullWidth
                        type="file"
                        variant="outlined"
                        margin="normal"
                        name="imagem"
                        accept="image/*"
                        onChange={(e) => {
                            definirImagemProdutoEditado(e)
                        }}
                    />

                    <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        margin="normal"
                        name="Manchete"
                        onChange={(e) => {
                            setManchete(e.target.value)
                        }}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        margin="normal"
                        name="Sub-titulo"
                        multiline
                        minRows={5}
                        onChange={(e) => {
                            setResumo(e.target.value)
                        }}
                    />
                    <TextField
                        color="info"
                        fullWidth
                        type="text"
                        variant="outlined"
                        margin="normal"
                        name="texto"
                        minRows={30}
                        multiline

                        onChange={(e) => {
                            setTexto(e.target.value)
                        }}
                    />
                    <Button onClick={() => {
                        setDialogoDeDentroDaTelaDePrimeiroAcesso(true)
                    }}>
                        <Typography>
                            Publicar
                        </Typography>
                    </Button>

                </Stack>

            </Stack>

            <Rodape />
        </Box>

    );
}
export default Publicar