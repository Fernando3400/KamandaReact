import React, { useEffect, useState } from "react";
import "./home-estabelecimento.modules.css";
import Rodape from "./Rodape";
import BarraLateral from "./BarraLateral";
import {
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  DialogActions,
  Button,
  MenuItem,
  Select,
  Box,
  Grid,
} from "@mui/material";
import { propiedadesDoTema } from "../utils/tema";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import Cabecalho from "./Cabecalho";

function HomeEstabelecimento() {
  const token = localStorage.getItem("token");
  const tema = createTheme(propiedadesDoTema);
  const [nomeDoEstabelecimento, setNomeDoEstabelecimento] = useState("");
  const [horaInicioExpediente, setHoraInicioExpediente] = useState("");
  const [horaFimExpediente, setHoraFimExpediente] = useState("");
  const [minutosInicioExpediente, setMinutosInicioExpediente] = useState("");
  const [descricao, setDescricao] = useState("");
  const [minutosFimExpediente, setMinutosFimExpediente] = useState("");
  const [primeiroAcesso, setPrimeiroAcesso] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [imagemByteArray, setImagemByteArray] = useState(null);
  const [botaoPrimeiroAcessoDesabilitado, setBotaoPrimeiroAcessoDesabilitado] =
    useState(false);

  const [valorMinimo, setValorMinimo] = useState("");
  const [valorMinimoFormatado, setValorMinimoFormatado] = useState("");
  const [
    dialogoDeDentroDaTelaDePrimeiroAcesso,
    setDialogoDeDentroDaTelaDePrimeiroAcesso,
  ] = useState(false);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState(1); // Estado para armazenar as opções selecionadas
  const [regioes, setRegioes] = useState([
    {
      id: 1,
      nome: "Poá",
    }, {
      id: 2,
      nome: "Itaquera",
    },
  ]);
  const [cartoes, setCartoes] = useState([]);

  // Suas opções para seleção múltipla

  const [horas, setHoras] = useState([
    "09", "10", "11",
    "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
  ]);
  const [minutos, setMinutos] = useState(["00", "15", "30", "45"]);

  const idEstabelecimento = localStorage.getItem("idEstabelecimento");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [estado, definirEstado] = useState("");
  const [cidade, definirCidade] = useState("");
  const [cep, setCep] = useState("");
  const [numero, definirNumero] = useState("");
  const [complemento, definirComplemento] = useState("");
  const [dialogoDeErro, definirDialogoDeErro] =
    useState(false);

  let telaPrimeiroAcesso;

  useEffect(() => {

    definirRegioes();
    definirTela();

    if (localStorage.getItem("podePublicar") == "false") {
      const intervalId = setInterval(() => {
        setPrimeiroAcesso(localStorage.getItem("primeiroAcesso") === "true");
      }, 500);
      return () => {
        clearInterval(intervalId);
      };
    }


  }, []);
  const definirRegioes = async () => {
    const resposta = await axios.get(ip + "/regiao/listar");
    console.log(resposta.data);
    if (resposta.status == 201 || resposta.status == 200) {
      setRegioes(resposta.data.regioes);
    }
  };
  const definirTela = async () => {
    console.log(token)
    const resposta = await axios.get(ip + "/estabelecimento/meuestabelecimento",
      {
        headers: {
          Authorization: token,
        },
      });
    if (resposta.status == 201 || resposta.status == 200) {
      setCartoes(resposta.data.cartoes);
    }
  }
  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }
  const fecharPrimeiroAcesso = () => {
    setPrimeiroAcesso(false);
  };

  const enviarPrimeiroAcesso = async () => {
    if (
      imagem != null &&
      nomeDoEstabelecimento != null &&
      horaInicioExpediente != null &&
      minutosInicioExpediente != null &&
      horaFimExpediente != null &&
      minutosFimExpediente != null &&
      valorMinimo != null
    ) {
      // setBotaoPrimeiroAcessoDesabilitado(true);
      // let valorMinimoEnviado = valorMinimo
      // valorMinimoEnviado = valorMinimoEnviado.split(",")[0]
      // valorMinimoEnviado = valorMinimoEnviado.replace("R$", "")
      let inicioExpediente = new Date();
      inicioExpediente.setHours(horaInicioExpediente);
      inicioExpediente.setMinutes(minutosInicioExpediente);
      let fimExpediente = new Date();
      fimExpediente.setHours(horaFimExpediente);
      fimExpediente.setMinutes(minutosFimExpediente);
      console.log({
        idDeEstabelecimento: idEstabelecimento,
        logo: "" + imagemByteArray,
        nomeEstabelecimento: nomeDoEstabelecimento,
        telefone: telefone,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        cidade: cidade,
        estado: estado,
        cep: cep,
        idRegiao: regiaoSelecionada,
        inicioExpediente,
        fimExpediente,
      })
      const resposta = await axios.post(
        ip + "/estabelecimento/primeiroacesso",
        {
          idDeEstabelecimento: idEstabelecimento,
          logo: "" + imagemByteArray,
          nomeEstabelecimento: nomeDoEstabelecimento,
          telefone: telefone,
          endereco: endereco,
          numero: numero,
          complemento: complemento,
          cidade: cidade,
          estado: estado,
          cep: cep,
          idRegiao: regiaoSelecionada,
          inicioExpediente,
          fimExpediente,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (resposta.status == 200) {
        telaPrimeiroAcesso = false;
        localStorage.setItem("primeiroAcesso", "false");
        localStorage.setItem("imagemPerfil", resposta.data.logo)
      } else if (resposta.status == 201) {
        // definirDialogoDeDentroDaTelaDePrimeiroAcesso(false)
        // definirDialogoErroPrimeiroAcesso(true)
      }
    } else {
      setBotaoPrimeiroAcessoDesabilitado(false);
      // definirDialogoDeErro(true)
    }
  };

  function definirImagem(event) {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const url = reader.result; // Base64 da imagem
        const canvas = document.getElementById("canvasImagem");
        const context = canvas.getContext("2d");
        const image = new Image(); // Use 'new Image()' em vez de criar elementos DOM manualmente

        image.src = url;
        image.onload = () => {
          // Redimensiona o canvas para 200x200
          canvas.width = 200;
          canvas.height = 200;
          context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
          context.drawImage(image, 0, 0, 200, 200);

          // Obtém a URL do canvas em formato base64
          const newImageUrl = canvas.toDataURL("image/jpeg", 0.9);
          setImagem(newImageUrl); // Define o estado da imagem com base no canvas

          // Converte o base64 para array de bytes (byte array)
          const binaryString = atob(newImageUrl.split(",")[1]);
          const byteArray = Uint8Array.from(binaryString, (char) =>
            char.charCodeAt(0)
          );
          setImagemByteArray(byteArray);
        };
      };

      reader.onerror = (error) => {
        console.error("Erro ao ler o arquivo:", error);
      };
    } catch (error) {
      console.error("Erro ao processar a imagem:", error);
    }
  }
  function formatarValorParaReais(valor) {

    let valorTextual = "" + valor;
    console.log(valorTextual.split(",")[1])
    console.log(valorTextual)
    if (valor == "R$") {
      setValorMinimo("R$0")
    } else if (valor.search(",") == -1) {
      setValorMinimo("R$" + valor + ",00");
      return
    } else if (valorTextual.split(",")[1].length == 3) {
      if (valorTextual.split(",")[0].length > 4) {
        return
      }
      let p = valorTextual.split(",")[0]
      p = p.replace("R$", "")
      p = p.concat(valorTextual.split(",")[1].charAt(2))

      if (p.charAt(0) == "0") {
        p = p.charAt(1)
      }

      setValorMinimo("R$" + p + ",00");
      return
    } else if (valorTextual.split(",")[1].length == 1) {
      let p = valorTextual.split(",")[0]
      p = p.replace("R$", "")
      p = p.substring(0, p.length - 1)
      if (p == "") {
        setValorMinimo("R$" + "0" + ",00");
        return
      }

      setValorMinimo("R$" + p + ",00");
      return
    }

    valorTextual = valorTextual.replace("R$", "");
    valorTextual = valorTextual.replace(",", ".");
    valorTextual = valorTextual.replace(" ", "");
    console.log(valorTextual);

    const numero = parseFloat(valorTextual);


    setValorMinimo("R$" + numero + ",00");
  }

  return (
    <ThemeProvider theme={tema}>
      <Dialog open={dialogoDeDentroDaTelaDePrimeiroAcesso}>
        <DialogContent>
          <Typography>Dados inválidos</Typography>
        </DialogContent>
      </Dialog>
      <Dialog open={primeiroAcesso} onClose={fecharPrimeiroAcesso}>
        <DialogTitle textAlign={"center"} variant="">
          Primeiro Acesso
        </DialogTitle>

        <DialogContent>

          <form>
            <Stack direction={"column"}>
              <Stack direction={"row"} marginBottom={5}>
                <canvas width={200} height={200} id="canvasImagem"></canvas>
                <Stack direction={"column"} justifyContent={"center"}>
                  <Typography
                    textTransform={"none"}
                    color={"black"}
                    textAlign={"center"}
                  >
                    Imagem miniatura
                  </Typography>
                  <TextField
                    fullWidth
                    type="file"
                    variant="outlined"
                    margin="normal"
                    name="imagem"
                    accept="image/*"
                    onChange={(e) => {
                      definirImagem(e);
                    }}
                  />
                </Stack>
              </Stack>
              <TextField
                label="Nome do estabelecimento"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                variant="outlined"
                margin="normal"
                name="nome"
                value={nomeDoEstabelecimento}
                onChange={(e) => {
                  setNomeDoEstabelecimento(e.target.value);
                }}
              />
              <TextField
                label="Telefone p/ contato"
                variant="outlined"
                fullWidth
                margin="normal"
                name="telefone"
                value={telefone}
                onChange={(e) => {
                  setTelefone(e.target.value);
                }}
              />
              <TextField
                label="Rua, Av. "
                variant="outlined"
                fullWidth
                margin="normal"
                name="endereco"
                value={endereco}
                onChange={(e) => {
                  setEndereco(e.target.value);
                }}
              />

              <TextField
                label="Número"
                variant="outlined"
                fullWidth
                margin="normal"
                name="complemento"
                value={numero}
                onChange={(e) => {
                  definirNumero(e.target.value);
                }}
              />
              <TextField
                label="Complemento"
                variant="outlined"
                fullWidth
                margin="normal"
                name="complemento"
                value={complemento}
                onChange={(e) => {
                  definirComplemento(e.target.value);
                }}
              />
              <TextField
                label="Cidade"
                variant="outlined"
                fullWidth
                margin="normal"
                name="complemento"
                value={cidade}
                onChange={(e) => {
                  definirCidade(e.target.value);
                }}
              />
              <TextField
                label="Estado"
                variant="outlined"
                fullWidth
                margin="normal"
                name="complemento"
                value={estado}
                onChange={(e) => {
                  definirEstado(e.target.value);
                }}
              />

              <TextField
                label="Cep"
                variant="outlined"
                fullWidth
                margin="normal"
                name="cep"
                value={cep}
                onChange={(e) => {
                  setCep(e.target.value);
                }}
              />
              <TextField
                select
                label="Selecione a região de atuação"
                variant="outlined"
                margin="normal"
                value={regiaoSelecionada}
                onChange={(e) => {
                  setRegiaoSelecionada(e.target.value);
                }}
              >
                {regioes.map((opcao) => (
                  <MenuItem key={opcao.id} value={opcao.id}>
                    {opcao.nome}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                color={"black"}
                marginBottom={"10px"}
                marginTop={"10px"}
              >
                Inicio de Expediente
              </Typography>
              <Stack direction={"row"}>
                <Box>
                  <Stack
                    direction={"row"}
                    width={"500px"}
                    display={"flex"}
                    margin="10px"
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <TextField
                      select
                      label="Hora"
                      variant="outlined"
                      sx={{ width: "200px" }}
                      value={horaInicioExpediente}
                      onChange={(e) => {
                        setHoraInicioExpediente(e.target.value);
                      }}
                    >
                      {horas.map((opcao) => (
                        <MenuItem key={opcao} value={opcao}>
                          {opcao}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="Minutos"
                      sx={{ width: "200px" }}
                      InputLabelProps={{
                        style: { color: "black" },
                      }}
                      value={minutosInicioExpediente}
                      onChange={(e) => {
                        setMinutosInicioExpediente(e.target.value);
                      }}
                    >
                      {minutos.map((opcao) => (
                        <MenuItem key={opcao} value={opcao}>
                          {opcao}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Box>

              </Stack>
              <Typography
                color={"black"}
                marginBottom={"10px"}
                marginTop={"10px"}
              >
                Final de Expediente
              </Typography>
              <Stack
                direction={"row"}
                width={"500px"}
                display={"flex"}
                margin="10px"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <TextField
                  select
                  label="Hora"
                  variant="outlined"
                  sx={{ width: "200px" }}
                  value={horaFimExpediente}
                  onChange={(e) => {
                    setHoraFimExpediente(e.target.value);
                  }}
                >
                  {horas.map((opcao) => (
                    <MenuItem key={opcao} value={opcao}>
                      {opcao}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Minutos"
                  sx={{ width: "200px" }}
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  value={minutosFimExpediente}
                  onChange={(e) => {
                    setMinutosFimExpediente(e.target.value);
                  }}
                >
                  {minutos.map((opcao) => (
                    <MenuItem key={opcao} value={opcao}>
                      {opcao}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={botaoPrimeiroAcessoDesabilitado}
            onClick={() => {
              if (horaFimExpediente.length == 1) {
                console.log(horaFimExpediente);
                setHoraFimExpediente("0" + horaFimExpediente);
                console.log(horaFimExpediente);
              }
              if (minutosFimExpediente.length == 1) {
                setMinutosFimExpediente("0" + minutosFimExpediente);
              }
              if (horaInicioExpediente.length == 1) {
                setHoraInicioExpediente("0" + horaInicioExpediente);
              }
              if (minutosInicioExpediente.length == 1) {
                setMinutosInicioExpediente("0" + minutosInicioExpediente);
              }
              enviarPrimeiroAcesso();
            }}
          >
            <Typography color="black" textTransform={"none"}>
              Confirmar
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Cabecalho />
      <div className="homeEstabelecimento">
        <BarraLateral />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#c3dac4"
          }}
        >
          <Typography color="black" variant="h3" fontFamily="Roboto">
            {"Seja bem vindo(a)"}
          </Typography>
          <Typography color="black" fontSize={19} variant="body2" width="50vw">
            Este é seu espaço dentro da Ubuntu, aqui você pode visualizar informações gerais sobre seu estabelecimento
          </Typography>
          <Grid container

            xs={"auto"}
            sx={{ gap: "15px", margin: "50px" }}>
            {cartoes.map((opcao) => (
              <Grid item >
                <Stack width={"500px"} height={200} justifyContent={""} alignContent={"center"} jus sx={{ backgroundColor: "#e2ffe4" }}>
                  <Box borderTop={"40px"} sx={{ backgroundColor: tema.palette.primary.main }}>
                    <Typography color={"black"} fontFamily="Roboto" fontSize={"28px"}>
                      {opcao.titulo}
                    </Typography>
                  </Box>
                  <Stack direction="row" display="flex" justifyContent={"center"} alignContent={"center"}>
                    <Typography color="black" fontSize={"28px"} fontFamily="Roboto" justifyItems={"center"} alignItems={"center"}>
                      {opcao.valor}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}


          </Grid>
        </Box>
      </div>

      <Rodape />
    </ThemeProvider>
  );
}

export default HomeEstabelecimento;
