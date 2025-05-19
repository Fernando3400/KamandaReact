import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ambiente, devIp, prodIp } from "../propriedades";
import { propiedadesDoTema } from "../utils/tema";
import BarraLateral from "./BarraLateral";

import ItemEntrega from "./ItemEntrega";
import Cabecalho from "./Cabecalho";

function Entregas() {
  const tema = createTheme(propiedadesDoTema);
  const [nomeCliente, definirNomeCliente] = useState("")
  const [passoSolicitacaoEntrega, definirPassoSolicitacaoEntrega] = useState(1)
  const [solicitarEntregaHabilitada, definirSolicitarEntregaHabilitada] = useState(true)
  const [enderecoInicial, definirEnderecoInicial] = useState("")
  const [acaoExcecao, definirAcaoExcecao] = useState(() => definirPassoSolicitacaoEntrega(1));
  const [entregas, definirEntregas] = useState([]);

  const [conteudo, definirConteudo] = useState("")
  const [enderecoFinal, definirEnderecoFinal] = useState("")
  const [textoExcecao, definirtextoExcecao] = useState("Informações insuficientes")
  const [exibicaoDeSolicitacaoDeEntrega, definirExibicaoDeSolicitacaoDeEntrega] = useState(false)
  const [exibirErro, definirExibirErro] = useState(false)

  let ip = "";

  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }




  const solicitarEntrega = async () => {
    try {
      definirSolicitarEntregaHabilitada(false)
      const response = await axios.post(
        ip + "/estabelecimento/solicitarentrega",

        {
          enderecoInicial: enderecoInicial,
          enderecoFinal: enderecoFinal,
          nomeCliente: nomeCliente,
          conteudo: conteudo
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log()
      if (response.status == 200) {
        definirSolicitarEntregaHabilitada(true)
        obterTelaEntregas()
        definirPassoSolicitacaoEntrega(1)
        definirExibicaoDeSolicitacaoDeEntrega(false)
        definirNomeCliente("")
        definirEnderecoFinal("")
      } else if (response.status == 201) {
        definirtextoExcecao("O serviço está indisponível. Funcionamos das 16:00 às 22:00 .")
        definirPassoSolicitacaoEntrega(0)
        definirAcaoExcecao(() => (definirExibicaoDeSolicitacaoDeEntrega(2)))
        definirSolicitarEntregaHabilitada(true)
      } else {
        definirtextoExcecao("Algo deu errado, tente novamente.")
        definirPassoSolicitacaoEntrega(0)
        definirAcaoExcecao(() => (definirExibicaoDeSolicitacaoDeEntrega(2)))
        definirSolicitarEntregaHabilitada(true)
      }

      console.log(response);
      return response.status

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obterTelaEntregas()
    console.log(entregas)
  }, []);
  const obterTelaEntregas = async () => {
    try {
      const response = await axios.get(
        ip + "/estabelecimento/telas/entregas",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status == 200) {
        console.log(response.data)
        definirEntregas(response.data.entregas)
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={tema}>
      <Cabecalho/>
      <Stack direction={"row"} width={"100%"} sx={{backgroundColor: "#e2ffe4"}}>

        <BarraLateral />
        <Stack alignIntems={"center"} direction={"column"} width={"100%"} >

          <Typography> Entregas </Typography>
          <Button variant="contained" onClick={() => {
            definirExibirErro(true)
// definirExibicaoDeSolicitacaoDeEntrega(true)
          }}>
            Solicitar Entrega
          </Button>

          <Stack
            direction={"column"}
            width={"100%"}
            alignContent={"center"}
            justifyContent={"center"}
            className="grade-cardapio"
            xs={"auto"}
          // sx={{ backgroundColor: "black"}}
          >

            {entregas.map((i) => {
              return <ItemEntrega props={i}></ItemEntrega>;
            })}
          </Stack>
          <Dialog open={exibirErro}>
            <DialogContent> <Typography>Serviço temporariamente indisponível, para fazer uma solicitação use o aplicativo</Typography></DialogContent>
            <DialogActions> <Button onClick={()=>{definirExibirErro(false)}}>Ok</Button></DialogActions>
          </Dialog>

          <Dialog open={exibicaoDeSolicitacaoDeEntrega} maxWidth={"80vw"} >
            <DialogContent >
              {passoSolicitacaoEntrega == 1 && (
                <Box>
                  <Stack direction={"row"} width={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  // sx={{backgroundColor:"yellow"}}
                  >
                    <Typography>
                      Solicitação de entrega
                    </Typography>
                  </Stack>

                  <Stack direction={"column"} width={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Typography>
                      Preencha com as informações de seu cliente. Este serviço fica disponível das 16:00 às 22:00
                    </Typography>
                  </Stack>
                  <Box height={50} />
                  <Stack direction={"column"} alignItems={"center"}
                    justifyItems={"center"}
                    width="100%"
                  >
                    <TextField
                      label="Nome do Cliente"
                      InputLabelProps={{
                        style: { color: "black" },
                      }}
                      name="usuario"
                      type="text"
                      height="auto"
                      width="auto"
                      value={nomeCliente}
                      onChange={(e) => {
                        definirNomeCliente(e.target.value);
                      }}
                    />
                    <Box height={"20px"} />
                    <TextField
                      label="Endereco do Cliente"
                      InputLabelProps={{
                        style: { color: "black" },
                      }}
                      name="usuario"
                      type="text"
                      height="auto"
                      value={enderecoFinal}
                      onChange={(e) => {
                        definirEnderecoFinal(e.target.value);
                      }}
                    />
                    <Box height={50} />
                    <Button variant="contained" fullWidth onClick={() => {
                      if (nomeCliente == "") {
                        definirNomeCliente("Indefinido")
                      }
                      console.log(enderecoFinal + "bla")
                      if (enderecoFinal.length == 0) {
                        definirPassoSolicitacaoEntrega(0)
                        return
                      } else {
                        definirPassoSolicitacaoEntrega(2);
                      }
                    }}>
                      <Typography textTransform={"none"}>
                        Solicitar Entrega

                      </Typography>
                    </Button>
                    <Button variant="outlined" fullWidth onClick={() => {
                      definirNomeCliente("")
                      definirEnderecoFinal("")
                      definirExibicaoDeSolicitacaoDeEntrega(false)
                    }}>
                      <Typography>Voltar</Typography>

                    </Button>

                  </Stack>
                </Box>
              )}
              {passoSolicitacaoEntrega == 2 && (

                <Box>
                  <Stack direction={"row"} width={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  // sx={{backgroundColor:"yellow"}}
                  >
                    <Typography>
                      Confirmar Entrega
                    </Typography>
                  </Stack>

                  <Stack direction={"column"} width={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Typography>
                      Preencha com as informações de seu cliente
                    </Typography>
                  </Stack>
                  <Box height={50} />
                  <Stack direction={"column"} alignItems={"center"}
                    justifyItems={"center"}
                    width="100%"
                  >

                    <Stack direction={"row"}>
                      <Typography> Nome do cliente :</Typography>
                      <Box width={"20px"} />
                      <Typography>  {nomeCliente}</Typography>
                    </Stack>
                    <Box height={"10px"} />
                    <Stack direction={"row"}>
                      <Typography> Endereço do Cliente :</Typography>
                      <Box width={"20px"} />
                      <Typography>  {enderecoFinal}</Typography>
                    </Stack>
                    <Box height={50} />

                    <Button variant="contained" disabled={!solicitarEntregaHabilitada} fullWidth onClick={() => {
                      solicitarEntrega()
                    }}>
                      <Typography textTransform={"none"}>
                        Confirmar Entrega
                      </Typography>
                    </Button>
                    <Button variant="outlined" fullWidth

                      onClick={() => {
                        if (nomeCliente == "Indefinido") {
                          definirNomeCliente("")
                        }
                        definirPassoSolicitacaoEntrega(1)
                      }}>
                      <Typography textTransform={"none"}>
                        Voltar
                      </Typography>
                    </Button>


                  </Stack>
                </Box>

              )}
              {passoSolicitacaoEntrega == 0 && (
                <Box>
                  <Stack direction={"column"}>
                    <Typography> {textoExcecao}</Typography>
                  </Stack>
                  <Button onClick={() => {
                    definirPassoSolicitacaoEntrega(1)
                    if (nomeCliente == "Indefinido") {
                      definirNomeCliente("")
                    }
                  }
                  }>
                    <Typography textTransform={"none"}>
                      Ok
                    </Typography>
                  </Button>
                </Box>
              )}
            </DialogContent>
          </Dialog>
        </Stack>
      </Stack>


    </ThemeProvider>
  );
}

export default Entregas;
