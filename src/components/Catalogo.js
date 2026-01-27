
import Cabecalho from "./Cabecalho";
import { Stack, Typography, Button, useMediaQuery, createTheme, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { propiedadesDoTema } from "../utils/tema";
import { useEffect, useState } from "react";
import Filtros from "./Filtros";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { useSearchParams } from "react-router-dom";
import CardProduto from "./CardProduto";

function Catalogo() {

    const categorias = [{
        nome: "Livros",
        tags: [

            { rotulo: "Autor", valor: "Aut" },
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

    const tema = createTheme(propiedadesDoTema);
    const isMobile = useMediaQuery(tema.breakpoints.down("sm"));
    const [tags, setTags] = useState([]);
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [searchParams] = useSearchParams();
    const tagParam = searchParams.get("tag");
    let [produtosFiltrados, setProdutosFiltrados] = useState([]);
    let ip = "";

    if (ambiente === "dev") {
        ip = devIp;
    }

    if (ambiente === "prod") {
        ip = prodIp;
    }
    useEffect(() => {
        if (tags.length === 0 && tagParam !== null) {
            setTags([tagParam]);
            obterProdutos([tagParam]);
            
        }
    }, [
        // produtos
    ]);
    const obterProdutos = async (tagsFiltro = tags) => {
        try {
            console.log("Buscando com tags:", tagsFiltro);

            const response = await axios.post(
                ip + "/loja/vitrine",
                {
                    tags: tagsFiltro,
                    home: false
                }
            );
            setProdutos(response.data.produtos);
            
        } catch (error) {
            console.error(error);
        }
    };
    const adicionarTag = (tag) => {
        setTags((tagsAtuais) => {
            if (tagsAtuais.includes(tag)) return tagsAtuais;
            return [...tagsAtuais, tag];
        });
    };
    const removerTag = (tag) => {
        setTags((tagsAtuais) =>
            tagsAtuais.filter((t) => t !== tag)
        );
    };

    return (

        <Stack>
            <Cabecalho />
            <Stack direction={"row"}>
                <Filtros tagsSelecionadas={tagsSelecionadas} produtos={produtosFiltrados} setTagsSelecionadas={setTagsSelecionadas} />
                <Grid container spacing={2}>
                    {produtos.map((produto) => (
                        <Grid
                        item
                        key={produto.id}
                        xs={12}   // mobile
                        sm={6}    // tablet
                        md={4}    // notebook
                        lg={3}    // desktop
                        >
                            <CardProduto produto={produto}/>
                        </Grid>
                    ))}
                </Grid>
            </Stack>

        </Stack>

    )
}
export default Catalogo;
