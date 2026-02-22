import '../assets/style/footer.modules.css'
import { Box, Button, createTheme, Stack, Typography } from '@mui/material';
import { propiedadesDoTema } from "../utils/tema";
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import RenderizadorDeImagem from './RenderizadorDeImagem';
import { Facebook, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material';


const tema = createTheme(propiedadesDoTema);

function Rodape() {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={tema}>
            <Stack direction={"column"}>
                <Stack direction={"row"} sx={{ width: "100%", bgcolor: tema.palette.tertiary.main }}>

                    <Stack direction={"column"} alignItems={"center"} width={"50%"} height={"100%"} gap="20px" paddingY={""}>
                        <RenderizadorDeImagem logo={true} width="200px" height="200px"></RenderizadorDeImagem>
                        <Stack direction={"column"} width={"100%"} gap={"10px"} justifyContent={"center"}>
                            <Stack
                                direction={"row"}
                                component="a"
                                href="https://www.instagram.com/lojakamanda/"
                                target="_blank"
                                rel="noopener noreferrer"
                                width={"100%"}
                                justifyContent={"center"}
                                sx={{
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    transition: "0.2s",
                                    "&:hover": { opacity: 0.7 }
                                }}
                            >
                                <Instagram sx={{ color: tema.palette.secondary.main }} />

                            </Stack>
                            <Stack direction="row" justifyContent="center" gap={2}>

                                {/* <Stack
                                    component="a"
                                    href="https://www.facebook.com/SUA_PAGINA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ cursor: "pointer", textDecoration: "none" }}
                                >
                                    <Facebook sx={{ color: tema.palette.secondary.main }} />
                                </Stack> */}

                                <Stack
                                    component="a"
                                    href="https://wa.me/5511910721677"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        transition: "0.2s",
                                        "&:hover": { opacity: 0.7 }
                                    }}
                                >
                                    <WhatsApp sx={{ color: tema.palette.secondary.main }} />
                                </Stack>

                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                gap="10px"
                                sx={{
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    transition: "0.2s",
                                    "&:hover": { opacity: 0.7 }
                                }}
                                onClick={() => window.open("https://www.linkedin.com/company/107432086/admin/dashboard/", "_blank")}
                            >
                                <LinkedIn sx={{ color: tema.palette.secondary.main }} />
                            </Stack>


                        </Stack>

                    </Stack>

                    <Stack direction={"column"} alignItems={"center"} width={"50%"} height={"100%"} gap="20px" paddingY={"50px"}>
                        <Typography
                            color={tema.palette.secondary.main}
                            fontWeight={600}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },
                            }}
                            onClick={() => {
                                navigate("/atendimento-ao-cliente");
                            }}
                        >
                            Atendimento
                        </Typography>
                        <Typography
                            color={tema.palette.secondary.main}
                            fontWeight={600}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },
                            }}
                            onClick={() => {
                                navigate("/sobre-a-kamanda");
                            }}
                        >
                            Sobre a Kamanda
                        </Typography>
                        <Typography
                            color={tema.palette.secondary.main}
                            fontWeight={600}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },
                            }}
                            onClick={() => {
                                navigate("/sobre-nos");
                            }}
                        >
                            Sobre nós
                        </Typography>

                        <Typography color={tema.palette.secondary.main}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },

                            }}
                            fontWeight={600}
                            onClick={() => {
                                navigate("/politicas-de-privacidade");
                            }}> Politicas de privacidade </Typography>
                        <Typography color={tema.palette.secondary.main}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },
                            }}
                            fontWeight={600}
                            onClick={() => {
                                navigate("/programa-de-parceiras");
                            }}> Programa de parcerias </Typography>
                        <Typography color={tema.palette.secondary.main}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },
                            }}
                            fontWeight={600}
                            onClick={() => {
                                navigate("/");
                            }}> Blog Kamanda </Typography>

                    </Stack>

                </Stack>
            </Stack>

            <Stack component="footer">
                <Stack
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    py={6}
                    px={2}
                    bgcolor={tema.palette.secondary.main}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: tema.palette.tertiary.main,
                            fontWeight: 500,
                            textAlign: "center"
                        }}
                    >
                        © 2025 Kamanda. Todos os direitos reservados.
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{
                            opacity: 0.8,
                            textAlign: "center"
                        }}
                    >
                        CNPJ 59.721.752/0001-94 · Enquadrado na condição de MEI
                    </Typography>
                </Stack>
            </Stack>
        </ThemeProvider >
    );
}

export default Rodape;