import React from "react";
import HeaderEstabelecimento from "./HeaderEstabelecimento";
import BarraLateral from "./BarraLateral";
import Rodape from "./Rodape";
import "./minhaLoja.css";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { useNavigate } from "react-router-dom";
import { propiedadesDoTema } from "../utils/tema";
import { useState, useEffect } from "react";
import {
  TextField,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  Button,
  Box,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
} from "@mui/material";
import "../utils/StringUtil"
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import { formatarPreco } from "../utils/StringUtil";
import Cabecalho from "./Cabecalho";


function MinhaLoja() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [nome, setNome] = useState("");

  const [valorMinimo, setValorMinimo] = useState("");

  const [cep, setCep] = useState("");
  const [openexperienteDialog, setOpenhorarioDialog] = useState("");
  const [horaInicioExpediente, setHoraInicioExpediente] = useState(6);
  const [minutosInicioExpediente, setMinutosInicioExpediente] = useState(6);
  const [horaFimExpediente, setHoraFimExpediente] = useState(6);
  const [minutosFimExpediente, setMinutosFimExpediente] = useState(6);
  const [horaInicioExpedienteInicial, setHoraInicioExpedienteInicial] =
    useState(6);
  const [minutosInicioExpedienteInicial, setMinutosInicioExpedienteInicial] =
    useState(6);
  const [horaFimExpedienteInicial, setHoraFimExpedienteInicial] = useState(6);
  const [minutosFimExpedienteInicial, setMinutosFimExpedienteInicial] =
    useState(6);
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [campoImagem, setCampoImagem] = useState(null);
  const [campoImagemByteArray, setCampoImagemByteArray] = useState(null);

  const [botaoEnviar, setBotaoEnviar] = useState(null);
  const tema = createTheme(propiedadesDoTema);
  const id = localStorage.getItem("idEstabelecimento");
  const [horas, setHoras] = useState([
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23"
  ]);
  const [minutos, setMinutos] = useState(["00", "15", "30", "45"]);
  const [dialogoDeErro, definirExibicaoDialogoDeErro] = useState(false)
  const [atualizarPaginaAposConfirmacao, definirAtualizacaoDePaginaAposConfirmacao] = useState(false)
  const [textoDeErro, definirTextoDeErro] = useState("")
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [estado, definirEstado] = useState("");
  const [cidade, definirCidade] = useState("");
  const [numero, definirNumero] = useState("");
  const [complemento, definirComplemento] = useState("");

  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  function definirImagem(event) {
    try {
      // Verifique se o arquivo foi selecionado
      const file = event.target.files[0];
      if (!file) {
        throw new Error("Nenhum arquivo selecionado.");
      }

      // Valide o tipo do arquivo
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Tipo de arquivo inválido. Use JPEG ou PNG.");
      }

      // Valide o tamanho do arquivo (opcional)
      const maxSizeMB = 5; // 5 MB
      if (file.size > maxSizeMB * 1024 * 1024) {
        throw new Error(`O arquivo excede o tamanho máximo de ${maxSizeMB} MB.`);
      }

      // Leia o arquivo como DataURL
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const url = event.target.result;

        const image = document.createElement("img");
        image.src = url;

        image.onload = () => {
          const larguraDesejada = 200;
          const alturaDesejada = 200;

          const canvas = document.createElement("canvas");
          canvas.width = larguraDesejada;
          canvas.height = alturaDesejada;

          const context = canvas.getContext("2d");
          context.clearRect(0, 0, larguraDesejada, alturaDesejada); // Limpa o canvas
          context.drawImage(image, 0, 0, larguraDesejada, alturaDesejada);

          canvas.toBlob(
            async (blob) => {
              try {
                // Converta o blob em ArrayBuffer
                const arrayBuffer = await blob.arrayBuffer();
                const byteArray = new Uint8Array(arrayBuffer);

                // Atualize o campo do byte array
                setCampoImagemByteArray(byteArray);

                // Converta o byte array para Base64
                const base64Data = window.btoa(
                  new Uint8Array(arrayBuffer).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );

                setCampoImagem(base64Data);
              } catch (blobError) {
                console.error("Erro ao processar o blob:", blobError);
              }
            },
            "image/png",
            0.9
          );
        };

        image.onerror = () => {
          console.error("Erro ao carregar a imagem.");
        };
      };

      reader.onerror = () => {
        console.error("Erro ao ler o arquivo.");
      };
    } catch (error) {
      console.error("Erro ao processar a imagem:", error.message);
    }
  }
  const enviarFormulario = async () => {
    console.log("enviar formulario minha loja");

    let valorMinimoEnviado = valorMinimo
    valorMinimoEnviado = valorMinimoEnviado.split(",")[0]
    valorMinimoEnviado = valorMinimoEnviado.replace("R$", "")
    console.log(valorMinimoEnviado)
    try {
      const resposta = await axios.put(
        ip + "/estabelecimento/minhaloja",
        {
          idDeEstabelecimento: id,
          image: campoImagem,
          nome: nome,
          descricao: descricao,
          endereco: endereco,
          numero: numero,
          telefone: telefone,
          complemento: complemento,
          cidade: cidade,
          estado: estado,
          cep: cep,
          valorMinimo: valorMinimoEnviado,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(resposta)
      if (resposta.status == 200) {
        definirExibicaoDialogoDeErro(true)
        definirTextoDeErro("Informações editadas com sucesso!")


      } else if (resposta.status == 201) {
        definirExibicaoDialogoDeErro(true)
        definirTextoDeErro("Endereço inválido, certeza que o endereço é válido?")
      }
    } catch (error) {
      definirExibicaoDialogoDeErro(true)
      definirTextoDeErro("Ops, algo deu errado. Investigaremos o problema")
    }

  };

  const enviarHorario = async () => {
    let inicioExpediente = new Date();
    inicioExpediente.setHours(horaInicioExpediente);
    inicioExpediente.setMinutes(minutosInicioExpediente);
    let fimExpediente = new Date();
    fimExpediente.setHours(horaFimExpediente);
    fimExpediente.setMinutes(minutosFimExpediente);
    try {

      const resposta = await axios.put(
        ip + "/estabelecimento/alterarhorariofuncionamento",
        {
          inicioExpediente: inicioExpediente,
          fimExpediente: fimExpediente,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (resposta.status == 200) {
        setHoraInicioExpedienteInicial(horaInicioExpediente);
        setMinutosInicioExpedienteInicial(minutosInicioExpediente);
        setHoraFimExpedienteInicial(horaFimExpediente);
        setMinutosFimExpedienteInicial(minutosFimExpediente);
        handleClose();
      }
    } catch (error) {
      definirExibicaoDialogoDeErro(true)
      definirTextoDeErro("Ops, algo deu errado. Investigaremos o problema")
    }
  };

  useEffect(() => {
    obterTela();
  }, []);

  const handleOpen = () => {
    setOpenhorarioDialog(true);
  };
  const handleClose = () => {
    setOpenhorarioDialog(false);
  };
  const obterTela = async () => {
    const resposta = await axios.get(ip + "/estabelecimento/minhaloja", {
      headers: {
        Authorization: token,
      },
    });
    setImagem(resposta.data.image);
    setNome(resposta.data.nome);

    let valorRecebido = "R$" + resposta.data.valorMinimo + ",00"
    setValorMinimo(valorRecebido);

    setEndereco(resposta.data.endereco);
    setTelefone(resposta.data.telefone);

    let inicioExpedienteString = resposta.data.inicioExpediente;
    setHoraInicioExpedienteInicial(
      resposta.data.inicioExpediente.split(":")[0]
    );
    setHoraInicioExpediente(resposta.data.inicioExpediente.split(":")[0]);

    setMinutosInicioExpediente(resposta.data.inicioExpediente.split(":")[1]);
    setMinutosInicioExpedienteInicial(
      resposta.data.inicioExpediente.split(":")[1]
    );

    setHoraFimExpediente(resposta.data.fimExpediente.split(":")[0]);
    setHoraFimExpedienteInicial(resposta.data.fimExpediente.split(":")[0]);

    setMinutosFimExpediente(resposta.data.fimExpediente.split(":")[1]);
    setMinutosFimExpedienteInicial(resposta.data.fimExpediente.split(":")[1]);

    setCep(resposta.data.cep);
    setDescricao(resposta.data.descricao);
    definirCidade(resposta.data.cidade)
    definirEstado(resposta.data.estado)
    definirComplemento(resposta.data.complemento);
    definirNumero(resposta.data.numero)
  };
  return (
    <ThemeProvider theme={tema}>
      <Dialog open={openexperienteDialog} onClose={handleClose}>
        <DialogTitle marginBottom={"20px"}>
          Alterar horario de trabalho
        </DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <Typography textTransform={"none"}>Cancelar</Typography>
          </Button>
          <Button
            onClick={enviarHorario}
            type="submit"
            variant="contained"
            color="primary"
          >
            <Typography textTransform={"none"}>Enviar</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogoDeErro}>
        <DialogContent>
          <Typography color={"black"}>{textoDeErro}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            definirExibicaoDialogoDeErro(false)
            if (atualizarPaginaAposConfirmacao) {
              window.location.reload()
            }
          }}><Typography>Fechar</Typography></Button>
        </DialogActions>
      </Dialog>

      <Cabecalho  />
      <Stack direction={"row"} width={"100%"}>
        <BarraLateral />
        <Stack direction={"column"} alignItems={"center"} width={"100%"} sx={{ backgroundColor: "#e2ffe4" }}>
          <Typography
            marginTop={"20px"}
            textAlign="center"
            color={tema.palette.secondary.dark}
            variant="h3"
          >
            Minha Loja
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviarFormulario();
              window.location.reload();
            }}
          >
            <Stack
              direction={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              paddingTop={"50px"}
            >
              <RenderizadorDeImagem
                imagem={imagem}
                width="400"
                height="400"
              ></RenderizadorDeImagem>
              <Box paddingTop={"50px"}></Box>
              <TextField
                type="file"
                variant="outlined"
                margin="normal"
                name="imagem"
                accept="image/*"
                onChange={(e) => {
                  definirImagem(e);
                }}
              />
              <TextField
                label="Nome do estabeleciento"
                variant="outlined"
                margin="normal"
                name="nome"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
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
                label="Rua, Avenida ..."
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
                label="Numero"
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
                label="Descrição"
                variant="outlined"
                fullWidth
                margin="normal"
                name="descricao"
                value={descricao}
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              />
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                marginY={"20px"}
              >
                <Typography color={"black"}>
                  {" "}
                  Horario de trabalho: das {horaInicioExpedienteInicial}:
                  {minutosInicioExpedienteInicial} até as{" "}
                  {horaFimExpedienteInicial}:{minutosFimExpedienteInicial}
                </Typography>
                <Button
                  sx={{ marginLeft: "20px" }}
                  onClick={handleOpen}
                  variant="outlined"

                >
                  <Typography> Editar</Typography>
                </Button>
              </Stack>
            </Stack>

            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => { enviarFormulario() }}
                disabled={botaoEnviar}
              >
                <Typography textTransform={"none"}>Salvar</Typography>
              </Button>
            </DialogActions>
          </form>
        </Stack>
        <Typography color={"black"}></Typography>
      </Stack>

      <Rodape />
    </ThemeProvider>
  );
}

export default MinhaLoja;
