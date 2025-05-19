import { ThemeProvider } from "@emotion/react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography, createTheme, DialogActions } from "@mui/material";

import React, { useState, useEffect } from "react";
import { ambiente, devIp, prodIp } from "../propriedades";
import { propiedadesDoTema } from "../utils/tema";
import BarraLateral from "./BarraLateral";
import Rodape from "./Rodape";
import axios from "axios";
import Cabecalho from "./Cabecalho";
import RenderizadorDeImagem from "./RenderizadorDeImagem";

function MeusPedidos() {

    let ip = "";
    if (ambiente === "dev") {
        ip = devIp;
    }

    if (ambiente === "prod") {
        ip = prodIp;
    }
    useEffect(() => {
        obterPedidos();

    }, []);
    const token = localStorage.getItem("token");
    const [pedidos, setPedidos] = useState([]);
    const obterPedidos = async () => {
        try {
            const resposta = await axios.get(ip + "/loja/pedidos", {
                headers: { Authorization: token },
            });

            if (resposta.status === 200) {
                setPedidos(resposta.data.pedidos);
                console.log(resposta.data)
            }
        } catch (error) {
            if (error.response.status == 403) {
                localStorage.setItem("token", null)
                localStorage.setItem("usuario", null)
            }
            console.error("Erro ao obter carrinho:", error);
        }
    };




    return (

        <Box>

            <Cabecalho />
            <Stack direction={"column"} minHeight="60vh" width="100%" alignContent={"center"}>
                {pedidos && pedidos.length > 0 ? (
                    pedidos.map((item, index) => (
                        <Stack
                            key={index}
                            width="90%"
                            maxWidth="800px"
                            margin="40px auto"
                            padding="20px"
                            spacing={2}
                            borderRadius="12px"
                            boxShadow="0px 4px 10px rgba(0,0,0,0.1)"
                            bgcolor="white"
                        >
                            {/* Nome do pedido centralizado */}
                            <Typography textAlign="center" variant="h6" fontWeight="bold" color="black">
                                {item.nome}
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center">
                                {/* Imagem do pedido */}
                                <Box
                                    width="180px"
                                    height="180px"
                                    borderRadius="10px"
                                    overflow="hidden"
                                    boxShadow="0px 3px 6px rgba(0,0,0,0.1)"
                                >
                                    <RenderizadorDeImagem width="100%" height="100%" imagem={item.miniatura} />
                                </Box>

                                {/* Informações do pedido */}
                                <Stack spacing={1}>
                                    <Typography fontSize="14px" color="gray">
                                        Status:
                                    </Typography>
                                    <Typography fontSize="16px" fontWeight="bold" color="black">
                                        {item.statusTexto}
                                    </Typography>

                                    <Typography fontSize="14px" color="gray">
                                        Valor:
                                    </Typography>
                                    <Typography fontSize="18px" fontWeight="bold" color="green">
                                        {item.valor}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    ))
                ) : (
                    <Stack alignItems="center" marginTop="60px">
                        <Typography variant="h6" fontWeight="bold" color="gray">
                            Você ainda não fez nenhum pedido
                        </Typography>
                    </Stack>
                )}

            </Stack>

            <Rodape />
        </Box>

    );

}

export default MeusPedidos;