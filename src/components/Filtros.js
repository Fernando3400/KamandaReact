
import Cabecalho from "./Cabecalho";
import { Stack, Typography, Button, useMediaQuery, Checkbox, createTheme, FormControlLabel, ThemeProvider, } from "@mui/material";
import { propiedadesDoTema } from "../utils/tema";
import { useState } from "react";


const categorias = [{
    nome: "Literatura",
    tags: [

        { rotulo: "Autor", valor: "autor" },
        { rotulo: "Gênero", valor: "genero" },
        { rotulo: "Editora", valor: "editora" },
        { rotulo: "Ano", valor: "ano" }
    ]
},
{
    nome: "Esportes",
    tags: [

        { rotulo: "Regata", valor: "REGATA" },
        { rotulo: "Bermuda", valor: "BERMUDA" },
        { rotulo: "DryFit", valor: "DRYFIT" }
    ]
},
{
    nome: "Informatica",
    tags: [
        { rotulo: "Mouse", valor: "MOUSE" },
        { rotulo: "Teclado", valor: "TECLADO" },
        { rotulo: "Armazenamento", valor: "ARMAZENAMENTO" },
    ]
},
{
    nome: "Pet",
    tags: [
        { rotulo: "Cachorro", valor: "CACHORRO" },
        { rotulo: "Gato", valor: "GATO" },
        { rotulo: "Brinquedos", valor: "BRINQUEDO" },
    ]
}];

function Filtros({ produtos, tagsSelecionadas,setTagsSelecionadas }) {

    const tema = createTheme(propiedadesDoTema);
    const isMobile = useMediaQuery(tema.breakpoints.down("sm"));
    

    
    const adicionarOuRemoverFiltro = (valor) => {
        setTagsSelecionadas((prev) =>
            prev.includes(valor)
                ? prev.filter((v) => v !== valor)
                : [...prev, valor]
        );

    };


    return (
        <ThemeProvider theme={tema}>

            <Stack direction="row" spacing={2}>

                <Stack direction="column" spacing={2} paddingLeft={"20px"} paddingTop={"20px"} alignItems={"center"}>
                    <Button variant="contained" color="primary" onClick={() => { console.log(tagsSelecionadas) }} >
                        <Typography textTransform={"none"}>Aplicar Filtro</Typography>
                    </Button>
                    {categorias.map((categoria) => (
                        <Stack key={categoria.nome} spacing={1} alignSelf={"start"}>

                            <Typography fontWeight="bold" color="text.primary">
                                {categoria.nome}
                            </Typography>

                            {/* Tags da categoria */}
                            <Stack direction="column" pl={2}>
                                {categoria.tags.map((tag) => (
                                    <FormControlLabel
                                        key={tag.valor}
                                        control={
                                            <Checkbox
                                                checked={tagsSelecionadas.includes(tag.valor)}
                                                onChange={() => {
                                                    adicionarOuRemoverFiltro(tag.valor)
                                                }
                                                }

                                            />
                                        }
                                        label={
                                            <Typography color="text.primary">
                                                {tag.rotulo}
                                            </Typography>
                                        }
                                    />
                                ))}
                            </Stack>

                        </Stack>
                    ))}
                </Stack>


            </Stack>
        </ThemeProvider>
    );
}


export default Filtros;
