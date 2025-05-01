import "./barra-lateral.modules.css";
import React, { useEffect, useState } from "react";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ItemBarraLateral from "./ItemBarraLateral.js";
import { Box, MenuList, Stack } from "@mui/material";
import RenderizadorDeImagem from "./RenderizadorDeImagem.js";
import { propiedadesDoTema } from "../utils/tema.js";

function BarraLateral(props) {

  let textoAbertoFechado = useState("Fechado");
  const [imagemPerfil, setImagemPerfil] = useState();
  const [primeiroAcesso, setPrimeiroAcesso] = useState(localStorage.getItem("primeiroAcesso"));
  const [podePublicar] = useState(localStorage.getItem("podePublicar"));
  const [tipoConta] = useState(localStorage.getItem("tipoConta"));
  const [idEstabelecimento] = useState(localStorage.getItem("idEstabelecimento"));
  // const [plano, definirPlano] = useState(localStorage.getItem("plano"));

  useEffect(
    () => {
      setImagemPerfil(localStorage.getItem("imagemPerfil"));
      setPrimeiroAcesso(localStorage.getItem("primeiroAcesso"));
      console.log(idEstabelecimento)
    }
    , [])

  if (localStorage.getItem("disponibilidade") == "true") {
    textoAbertoFechado = "Aberto";
  } else {
    textoAbertoFechado = "Fechado";
  }
  let aberto = true
  return (
    <Box
      width={"30vw"}
      maxWidth={"300px"}
      sx={{
        backgroundColor: propiedadesDoTema.palette.primary.main,
      }}
    >
      <Stack visibility={primeiroAcesso} direction={"column"} alignItems={"center"}>
        {primeiroAcesso == "true" && <RenderizadorDeImagem
          imagem={null}
          padrao={true}
          width="200px"
          height="100%"
        />
        }
        {primeiroAcesso == "false" && <RenderizadorDeImagem
          imagem={imagemPerfil}
          padrao={false}
          width="200px"
          height="100%"
        />
        }
        <MenuList
          className="barraLateral"
          sx={{
            backgroundColor:
              propiedadesDoTema.palette.primary.main,
            width: "100%"
          }}
        >
          {
            tipoConta == "INTERNA" && <ItemBarraLateral
              texto="Inicio"
              rota="/portal/estabelecimentos/inicio"
              icone={faHouse}
            />
          }

          {
            ( idEstabelecimento != "null") && <ItemBarraLateral
              texto="Minha Loja"
              rota="/portal/estabelecimentos/minhaloja"
              icone={faShop}
              selecionado={props.selecionado}
            />
          }

          {
            ( idEstabelecimento != "null") && <ItemBarraLateral
              texto="Produtos"
              rota="/portal/estabelecimentos/produtos"
              icone={faBookReader}
            />
          }

          {
            idEstabelecimento != "null" && <ItemBarraLateral
              texto="Pedidos"
              rota="/portal/estabelecimentos/pedidos"
              icone={faBookReader}
            />
          }

          {/* {
           ( idEstabelecimento != null)  && <ItemBarraLateral
              texto="Entregas"
              rota="/portal/estabelecimentos/entregas"

            />
          } */}
          
          {podePublicar == "true" && <ItemBarraLateral
            texto="Publicar"
            rota="/portal/jornalista/publicar"

          />}


          <div>
            <ItemBarraLateral
              texto="Sair"
              rota="/portal/login"
              icone={faArrowLeft}
              acao={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                console.log();
              }}
            />
          </div>
        </MenuList>
      </Stack>
    </Box>
  );
}
export default BarraLateral;
