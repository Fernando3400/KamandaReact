import '../assets/style/footer.modules.css'
import { Box, Button, createTheme, Stack, Typography } from '@mui/material';
import { propiedadesDoTema } from "../utils/tema";
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import RenderizadorDeImagem from './RenderizadorDeImagem';


const tema = createTheme(propiedadesDoTema);

function Rodape() {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={tema}>
            <Stack direction={"column"}>
                <Stack direction={"row"} sx={{ width: "100%", bgcolor: tema.palette.tertiary.main }}>

                    <Stack direction={"column"} alignItems={"center"} width={"50%"} height={"100%"} gap="20px" paddingY={"50px"}>
                        <RenderizadorDeImagem logo={true} width="200px" height="200px"></RenderizadorDeImagem>
                        <Stack direction={"row"} width={"100%"} justifyContent={"center"}>
                            <Typography color={tema.palette.secondary.main}> Instagram </Typography>
                            <Typography color={tema.palette.secondary.main}> Tiktok </Typography>
                            <Typography color={tema.palette.secondary.main}> Facebook </Typography>
                            <Typography color={tema.palette.secondary.main}> Whatsapp </Typography>
                            <Typography color={tema.palette.secondary.main}> Linkedin </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction={"column"} alignItems={"center"} width={"50%"} height={"100%"} gap="20px" paddingY={"50px"}>
                        <Typography
                            color={tema.palette.secondary.main}
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
                            Atendimento ao Cliente
                        </Typography>
                        <Typography
                            color={tema.palette.secondary.main}
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
                            onClick={() => {
                                navigate("/politicas-de-privacidade");
                            }}> Politicas de privacidade </Typography>
                        <Typography  color={tema.palette.secondary.main}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },
                            }}
                            onClick={() => {
                                navigate("/programa-de-parceiras");
                            }}> Programa de parcerias </Typography>
                        <Typography  color={tema.palette.secondary.main}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline", // opcional, dá feedback visual
                                },
                            }}
                            onClick={() => {
                                navigate("/");
                            }}> Blog Kamanda </Typography>

                    </Stack>

                </Stack>
            </Stack>

            <Stack>
                <Stack direction={"column"} paddingY="10vh" alignItems={"center"} bgcolor={tema.palette.secondary.main}>
                    <Typography color={tema.palette.tertiary.main}>
                        @2025 Kamanda. Todos os direitos reservados
                    </Typography>
                    <Typography>
                        CNPJ 59.721.752/0001-94 - Enquadrado na condição de MEI
                    </Typography>
                </Stack>
            </Stack>
        </ThemeProvider >
    );
}

export default Rodape;