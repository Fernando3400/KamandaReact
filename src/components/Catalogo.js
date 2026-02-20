import Cabecalho from "./Cabecalho";
import {
    Stack,
    Grid,
    useMediaQuery,
    createTheme
} from "@mui/material";
import { propiedadesDoTema } from "../utils/tema";
import { useEffect, useState } from "react";
import Filtros from "./Filtros";
import axios from "axios";
import { ambiente, devIp, prodIp } from "../propriedades";
import { useSearchParams } from "react-router-dom";
import CardProduto from "./CardProduto";

function Catalogo() {

    const categorias = [
        {
            codigo: "LITERATURA",
            nome: "Literatura",
            tags: [
                // 📚 Gêneros literários
                { rotulo: "Ficção", valor: "FICCAO", habilitado: true },
                { rotulo: "Não-ficção", valor: "NAO_FICCAO", habilitado: true },
                { rotulo: "Filosofia", valor: "FILOSOFIA", habilitado: true },
                { rotulo: "Sociologia", valor: "SOCIOLOGIA", habilitado: true },
                { rotulo: "História", valor: "HISTORIA", habilitado: true },
                { rotulo: "Poesia", valor: "POESIA", habilitado: true },

                // ✊ Temáticas
                { rotulo: "Feminismo", valor: "FEMINISMO", habilitado: true },
                { rotulo: "Negritude", valor: "NEGRITUDE", habilitado: true },
                { rotulo: "Política", valor: "POLITICA", habilitado: true },

            ]
        },
        {
            codigo: "ESPORTES",
            nome: "Esportes",
            tags: [
                { rotulo: "Basquete", valor: "BASQUETE", habilitado: true },
                { rotulo: "Futebol", valor: "FUTEBOL", habilitado: true },
                { rotulo: "Vôlei", valor: "VOLEI", habilitado: true },

            ]
        },
        {
            codigo: "INFORMATICA",
            nome: "Informática",
            tags: [
                // 🖱️ Periféricos
                { rotulo: "Mouse", valor: "MOUSE", habilitado: true },
                { rotulo: "Teclado", valor: "TECLADO", habilitado: true },
                { rotulo: "Headset", valor: "HEADSET", habilitado: true },

                // 💾 Armazenamento
                { rotulo: "HD", valor: "HD", habilitado: true },
                { rotulo: "SSD", valor: "SSD", habilitado: true },
                { rotulo: "Pendrive", valor: "PENDRIVE", habilitado: true },

                // 🎮 Uso
                { rotulo: "Gamer", valor: "GAMER", habilitado: true },
                { rotulo: "Trabalho", valor: "TRABALHO", habilitado: true },
            
                { rotulo: "Fone de ouvido", valor: "FONE", habilitado: true }
            ]
        },
        {
            codigo: "PETSHOP",
            nome: "Pet Shop",
            tags: [
                // 🐾 Tipo de animal
                { rotulo: "Cachorro", valor: "CACHORRO", habilitado: true },
                { rotulo: "Gato", valor: "GATO", habilitado: true },

                // 🦴 Tipo de produto
                { rotulo: "Ração", valor: "RACAO", habilitado: true },
                { rotulo: "Brinquedos", valor: "BRINQUEDO", habilitado: true },
                { rotulo: "Acessórios", valor: "ACESSORIO", habilitado: true },

                // 🩺 Finalidade
                { rotulo: "Higiene", valor: "HIGIENE", habilitado: true },
                { rotulo: "Saúde", valor: "SAUDE", habilitado: true }
            ]
        }
    ];


    const tema = createTheme(propiedadesDoTema);
    const isMobile = useMediaQuery(tema.breakpoints.down("sm"));

    const [tags, setTags] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const [searchParams] = useSearchParams();
    const tagParam = searchParams.get("tag");

    let ip = ambiente === "dev" ? devIp : prodIp;

    useEffect(() => {
        const categoriasFiltradas = tagParam
            ? categorias.filter(c => c.codigo === tagParam)
            : categorias;
        console.log(categoriasFiltradas)
        const tagsHabilitadas = categoriasFiltradas.flatMap(categoria =>
            categoria.tags
                .filter(tag => tag.habilitado)
                .map(tag => tag.valor)
        );

        setTags(tagsHabilitadas);
    }, [tagParam]);

    // 🔄 filtros → backend
    useEffect(() => {
        obterProdutos(tags);
        console.log(tags)
    }, [tags]);

    const obterProdutos = async (tagsFiltro) => {
        try {
            const response = await axios.post(
                ip + "/loja/vitrine",
                {
                    tags: tagsFiltro,
                    home: false
                }
            );

            setProdutos(response.data.produtos);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };

    return (
        <Stack>
            <Cabecalho />

            <Stack direction="row">
                <Filtros
                    categoriaSelecionada={tagParam}
                    categorias={categorias}
                    tagsSelecionadas={tags}
                    setTagsSelecionadas={setTags}
                />

                <Grid container spacing={2} padding={2}>
                    {produtos.map((produto) => (
                        <Grid
                            item
                            key={produto.id}
                            xs={12}   // mobile
                            sm={6}    // tablet
                            md={4}    // notebook
                            lg={3}    // desktop
                        >
                            <CardProduto produto={produto} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );
}

export default Catalogo;
