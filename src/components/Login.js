import {
  Box,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUbuntuStore from "../assets/img/logo.png";
import { ambiente, devIp, prodIp } from "../propriedades";
import { propiedadesDoTema } from "../utils/tema";
import { CheckBox } from "@mui/icons-material";
import Cabecalho from "./Cabecalho";

function Login() {
  const navigate = useNavigate();
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [senhaCadastroRepetida, setSenhaRepetida] = useState("");
  const [celular, setCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [passo, setPasso] = useState(1);
  const [cnpj, setCnpj] = useState("");
  const [textoBotaoConcluirCadastro, setTextoBotaoConcluirCadastro] = useState("Concluir");
  const [telaLogin, setTelaLogin] = useState(true);
  const [telaCadastro, setTelaCadastro] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState(false);
  const [telaEsqueciaSenha, setTelaEsqueciASenha] = useState(false);
  const [emailEsqueciSenha, setEmailEsqueciSenha] = useState("");
  const [codigoEsqueciASenha, setCodigoEsqueciASenha] = useState("");
  const [senhaEsqueciASenha, setSenhaEsqueciASenha] = useState("");
  const [senhaRepetidaEsqueciASenha, setSenhaRepetidaEsqueciASenha] =
    useState("");
  const [tituloDialogo, setTituloDialogo] = useState("");
  const [dialogoDeErro, setDialogoDeErro] = useState(false);
  const [textoDialogo, setTextoDialogo] = useState("");
  const [dialogoAberto, setDialogoAberto] = useState(false);
  const [dialogoTelaLogin, setDialogoTelaLogin] = useState(false);
  const [token, setToken] = useState("");
  const tema = createTheme(propiedadesDoTema);
  const [botaoCadastroDesabilitado, setBotaoCadastroDesabilitado] =
    useState(false);
  const [botaoPassoUmDesabilitado, setBotaoPassoUmDesabilitado] =
    useState(false);
  const [botaoPassoDoisDesabilitado, setBotaoPassoDoisDesabilitado] =
    useState(false);
  const [botaoPassoTresDesabilitado, setBotaoPassoTresDesabilitado] =
    useState(false);
  useState(false);
  function fecharDialogo() {
    setDialogoAberto(false);
  }

  function setPassoGuardachuval(passoAtual) {
    if (!telaLogin) {
      if (passoAtual == 1) {
        let texto = "";
        let primeiraInvalidez = true;

        if (
          emailCadastro.includes("@") &&
          emailCadastro.split("@")[1] != null &&
          emailCadastro.split("@")[1].includes(".")
        ) {
        } else {
          setDialogoAberto(true);
          setDialogoDeErro(true);
          if (primeiraInvalidez) {
            texto = texto.concat("Email");
            primeiraInvalidez = false;
          } else {
            texto = texto.concat(", email");
          }
        }
        if (nome != null && nome.length > 5) {
        } else {
          setDialogoAberto(true);
          setDialogoDeErro(true);
          if (primeiraInvalidez) {
            texto = texto.concat("Nome");
            primeiraInvalidez = false;
          } else {
            texto = texto.concat(", nome");
          }
        }
        if (celular != null && celular.length >= 8) {
        } else {
          setDialogoAberto(true);
          setDialogoDeErro(true);
          if (primeiraInvalidez) {
            texto = texto.concat("Celular");
            primeiraInvalidez = false;
          } else {
            texto = texto.concat(", celular");
          }
        }
        if (
          senhaCadastro != null &&
          senhaCadastro === senhaCadastroRepetida &&
          senhaCadastro.length > 5
        ) {
        } else {
          setDialogoAberto(true);
          setDialogoDeErro(true);
          if (primeiraInvalidez) {
            texto = texto.concat("Senha");
            primeiraInvalidez = false;
          } else {
            texto = texto.concat(", senha");
          }
        }

        if (texto == "") {
          registrar()
        }
        texto = texto.concat(" inválido(s)!");
        setTituloDialogo("Dados inválidos!");
        setTextoDialogo(texto);
      }
      if (passoAtual == 2) {
        enviarCodigoDeConfirmacaoCadastro();
      }
      // if (passoAtual == 2) {
      //   let texto = "";
      //   let primeiraInvalidez = true;

      //   if (celular.length >= 11) {
      //   } else {
      //     setDialogoAberto(true);
      //     setDialogoDeErro(true);
      //     if (primeiraInvalidez) {
      //       texto = texto.concat("Celular");
      //       primeiraInvalidez = false;
      //     } else {
      //       texto = texto.concat(", celular");
      //     }
      //   }
      //   if (cnpj.length == 14) {
      //   } else {
      //     setDialogoAberto(true);
      //     setDialogoDeErro(true);

      //     if (primeiraInvalidez) {
      //       texto = texto.concat("Cnpj");
      //       primeiraInvalidez = false;
      //     } else {
      //       texto = texto.concat(", cnpj");
      //     }
      //   }
      //   if (texto == "") {

      //     setBotaoCadastroDesabilitado(true);
      //   } else {
      //     setDialogoAberto(true);
      //     setDialogoDeErro(true);
      //     texto = texto.concat(" inválido(s)!");
      //     setTituloDialogo("Dados inválidos!");
      //     setTextoDialogo(texto);
      //   }
      // }



    }
  }
  const registrar = async () => {
    setTextoBotaoConcluirCadastro("Aguarde")
    try {
      const axiosInstance = axios.create({});
      const response = await axiosInstance.post(
        ip + "/usuario/registrar",
        {
          email: emailCadastro,
          senha: senhaCadastro,
          celular: celular,
          nome: nome,
          tipoConta: "USUARIO",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(response.data.token);
      localStorage.setItem("usuario", response.data.nome)
      localStorage.setItem("token", "Bearer " + response.data.token);
      localStorage.setItem("primeiroAcesso", true);
      localStorage.setItem(
        "estabelecimentoId",
        response.data.IdEstabelecimento
      );
      localStorage.setItem("plano", response.data.plano);

      setPasso(2);
      setBotaoCadastroDesabilitado(false);
    } catch (error) {
      if (error.response.status == 409) {
        setDialogoAberto(true);
        console.log("erro na tela");
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo("Já existe uma conta vinculada a este email.");
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }
      }
      if (error.response.status == 500) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo(
            "Houve um  erro no servidor! Pedimos desculpas pelo transtorno."
          );
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }

      }
      setBotaoCadastroDesabilitado(false);
      setTextoBotaoConcluirCadastro("Concluir")
    }
  };

  const enviarEmailEsqueciASenha = async () => {
    try {
      const axiosInstance = axios.create({});
      const response = await axiosInstance.post(
        ip + "/usuario/esqueciasenha/gerarcodigo",
        {
          email: emailEsqueciSenha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setPasso(2);
      }
      if (response.status == 500) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo(
            "Houve um  erro no servidor! Pedimos desculpas pelo transtorno."
          );
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " + response.data + ". Status : " + response.status
          );
        }
      }
    } catch (error) {
      if (error.response.status == 409) {
        setDialogoAberto(true);
        console.log("erro na tela");
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo("Já existe uma conta vinculada a este email.");
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }
      }
      if (error.request.status == 500) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo(
            "Houve um  erro no servidor! Pedimos desculpas pelo transtorno."
          );
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }
        return;
      }
    }
  };
  
  const enviarCodigoDeConfirmacaoCadastro = async () => {
    try {
      const axiosInstance = axios.create({});
      const response = await axiosInstance.post(
        ip + "/usuario/confirmaremail",
        {
          codigo: codigo,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/")

    } catch (error) {
      if (error.response.status == 500) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Ops");
          setTextoDialogo(
            "Houve um  erro no servidor! Pedimos desculpas pelo transtorno."
          );
        } else {
          setTituloDialogo("Ops");
          setTextoDialogo(
            " Erro: " + error.response.data + ". Status : " + error.response.status
          );
        }
      }
      if (error.response.status == 403) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Ops");
          setTextoDialogo(
            "Código incorreto"
          );
        } else {
          setTituloDialogo("Ops");
          setTextoDialogo(
            " Erro: " + error.response.data + ". Status : " + error.response.status
          );
        }
      }

    }
  };
  const enviarNovaSenha = async () => {
    try {
      const axiosInstance = axios.create({});
      const response = await axiosInstance.post(
        ip + "/usuario/esqueciasenha/enviarnovasenha",
        {
          email: emailEsqueciSenha,
          senha: senhaEsqueciASenha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
      if (response.status == 200) {
        setTelaEsqueciASenha(false);
        setTelaLogin(true);
        setPasso(1);
      }
      if (response.status == 500) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo(
            "Houve um  erro no servidor! Pedimos desculpas pelo transtorno."
          );
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " + response.data + ". Status : " + response.status
          );
        }
      }
    } catch (error) {
      if (error.request.status == 409) {
        setDialogoAberto(true);
        console.log("erro na tela");
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo("Já existe uma conta vinculada a este email.");
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }
      }
      if (error.request.status == 500) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo(
            "Houve um  erro no servidor! Pedimos desculpas pelo transtorno."
          );
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }
        return;
      }
    }
  };
  const enviarCodigoDeConfirmacaoEsqueciASenha = async () => {
    try {
      const axiosInstance = axios.create({});
      const response = await axiosInstance.post(
        ip + "/usuario/esqueciasenha/confirmarcodigo",
        {
          codigo: codigoEsqueciASenha,
          email: emailEsqueciSenha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        setPasso(3);
      }
    } catch (error) {
      if (error.request.status == 409) {
        setDialogoAberto(true);
        console.log("erro na tela");
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo("Já existe uma conta vinculada a este email.");
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }
      }
      if (error.request.status == 404) {
        setDialogoAberto(true);
        setBotaoPassoDoisDesabilitado(false);

        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo("Código invalido");
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo("Código invalido.");
        }
      }
      if (error.request.status == 500) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        if (ambiente === "prod") {
          setTituloDialogo("Opa");
          setTextoDialogo(
            "Houve um  erro no servidor! Pedimos desculpas pelo transtorno."
          );
        } else {
          setTituloDialogo("Opa");
          setTextoDialogo(
            " Erro: " +
            error.request.data +
            ". Status : " +
            error.request.status
          );
        }
        return;
      }
    }
  };
  let ip = "";
  if (ambiente == "dev") {
    ip = devIp;
  }

  if (ambiente == "prod") {
    ip = prodIp;
  }
  const autenticar = async () => {
    try {
      const axiosInstance = axios.create({});

      const response = await axiosInstance.post(
        ip + "/usuario/autenticar",
        {
          email: emailLogin,
          senha: senhaLogin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data)
      if (response.status == 403) {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        setTextoDialogo("Usuario e senha inválidos");
      }
      localStorage.setItem("usuario", response.data.nome)
      console.log(response.data.tipoConta)
      localStorage.setItem("token", "Bearer " + response.data.token);
      if (response.data.tipoConta == "ESTABELECIMENTO" || response.data.tipoConta == "INTERNA" || response.data.podePublicar == true) {


        if (response.data.imagemPerfil != null) {
          localStorage.setItem("imagemPerfil", response.data.imagemPerfil);
        }
        localStorage.setItem("idEstabelecimento", response.data.idEstabelecimento);

        localStorage.setItem("primeiroAcesso", response.data.primeiroAcesso);
        localStorage.setItem("plano", response.data.plano);
        localStorage.setItem("podePublicar", response.data.podePublicar)
        localStorage.setItem("tipoConta", response.data.tipoConta)

        if (response.data.podePublicar == true) {
          navigate("/portal/jornalista/publicar");
        } else {
          navigate("/portal/estabelecimentos/inicio");
        }

      } else if (response.data.tipoConta == "USUARIO") {
        if (response.data.imagemPerfil != null) {
          localStorage.setItem("imagemPerfil", response.data.imagemPerfil);

        }
        navigate("/")
      } else {
        setDialogoAberto(true);
        setDialogoDeErro(true);
        setTituloDialogo("Opa");
        setTextoDialogo(
          "Por enquanto, este site é destinado apenas para estabelecimentos. Para acessar outras contas utilize o aplicativo Kamanda."
        );
      }
    } catch (error) {
      if (error.request.status == 403) {
        setDialogoTelaLogin(true);

        setTextoDialogo("Usuario e senha inválidos");
        console.error(error);
      }
    }
  };
  return (
    <ThemeProvider theme={tema}>
      <Stack >
        <Cabecalho></Cabecalho>

        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          width="100%"
          height={"100%"}
          backgroundColor={tema.palette.primary.main}
        >

          <Stack
            direction={"row"}
            display={"flex"}
            width={"100vw"}
            height={"100vh"}
            spacing={0}
            sx={{ margin: 0 }}
          >
            <Stack
              direction={"column"}
              display="flex"
              backgroundColor={tema.palette.secondary.main}
              alignSelf={"start"}
              alignItems="center"
              height={"100vh"}
              width={"80%"}
              justifyContent={"center"}
            >
              <Typography color={"black"} paddingX={3}>
                Crie sua conta ou logue-se  para acessar outras funcionalidades
              </Typography>
            </Stack>
            <Stack
              display="flex"
              direction="column"
              height={"100vh"}
              width={"50vw"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                width={"250px"}
                height={"250px"}

                src={logoUbuntuStore}
                alt="Logo da empresa Ubuntu"
              />
              {telaLogin && (
                <Stack
                  direction={"column"}
                  width={"70%"}
                  gap="16px"
                  marginTop={5}
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <TextField
                    sx={{
                      marginBottom: "20px", justifyContent: "left",
                      input: { color: "white" },
                      label: { color: "white" },
                    }}
                    label="Email"
                    InputLabelProps={{
                      style: { color: "white" },
                    }}

                    minLength={3}
                    variant="standard"
                    name="email"
                    type="text"
                    height="20px"
                    margin="dense"
                    maxLength={50}
                    value={emailLogin}
                    required
                    onChange={(e) => setEmailLogin(e.target.value)}
                  />
                  <TextField
                    label="Senha"
                    variant="standard"
                    name="senha"
                    type="password"
                    required
                    value={senhaLogin}
                    onChange={(e) => setSenhaLogin(e.target.value)}
                    sx={{
                      input: { color: "white" }, // Cor do texto digitado
                      "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" }, // Borda padrão
                        "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                        "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                      }
                    }}
                    InputLabelProps={{
                      style: { color: "white" }, // Outra forma de garantir que o label fique branco
                    }}
                  />

                  <Button
                    sx={{ color: "white", marginTop: "40px" }}
                    variant="outlined"
                    style={{ backgroundColor: tema.palette.secondary.dark }}
                    onClick={() => {
                      autenticar();
                    }}
                  >
                    <Typography color={"black"} textTransform={"none"}>
                      Login
                    </Typography>
                  </Button>
                  <Stack
                    direction={"row"}
                    display={"flex"}
                    justifyContent="center"
                    spacing={2}
                    marginTop={10}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: tema.palette.secondary.main }}
                      onClick={() => {
                        setTelaEsqueciASenha(true);
                        setBotaoPassoUmDesabilitado(false);
                        setBotaoPassoDoisDesabilitado(false);
                        setBotaoPassoTresDesabilitado(false);
                        setTelaLogin(false);
                      }}
                    >
                      <Typography textTransform={"none"} color={"black"}>
                        Esqueci minha senha
                      </Typography>
                    </Button>
                    <Button
                      style={{ backgroundColor: tema.palette.secondary.main }}
                      variant="contained"
                      disabled={botaoCadastroDesabilitado}
                      onClick={() => {
                        setTelaLogin(false);
                        setTelaCadastro(true);
                      }}
                    >
                      <Typography textTransform={"none"} color={"black"}>
                        Cadastre-se
                      </Typography>
                    </Button>
                  </Stack>
                </Stack>
              )}
              {telaEsqueciaSenha && passo === 1 && (
                <Stack
                  direction={"column"}
                  width={"70%"}
                  gap="16px"
                  marginTop={5}
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    input: { color: "white" }, // Cor do texto digitado
                    "& .MuiInputLabel-root": { color: "white" }, // Cor do label normal
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                    "& .MuiInput-underline:before": { borderBottomColor: "white" }, // Linha antes do foco
                    "& .MuiInput-underline:after": { borderBottomColor: "white" }, // Linha após o foco
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "white !important" } // Linha ao passar o mouse
                  }}
                >
                  <Typography textAlign="center" variant="h6" color={"white"}>
                    {" "}
                    Insira o endereço e-mail cadastrado para receber um código de
                    confirmação para redefinir sua senha.
                  </Typography>

                  <TextField
                    sx={{ marginBottom: "20px", justifyContent: "left" }}
                    label="Email"
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                    minLength={3}
                    variant="standard"
                    name="email"
                    type="text"
                    height="20px"
                    margin="dense"
                    maxLength={50}
                    value={emailEsqueciSenha}
                    required
                    onChange={(e) => setEmailEsqueciSenha(e.target.value)}
                  />

                </Stack>
              )}
              <Stack id="campos" direction={"column"} width={"100%"} gap="16px">
                {telaCadastro && passo == 1 && (
                  <TextField
                    label="Email"
                    InputLabelProps={{
                      style: { color: "white" }, // Defina a cor desejada aqui
                    }}
                    minLength={3}
                    name="usuario"
                    type="text"
                    height="auto"
                    sx={{
                      input: { color: "white" }, // Cor do texto digitado
                      "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                        "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                      }
                    }}

                    maxLength={50}
                    value={emailCadastro}
                    required
                    onChange={(e) => setEmailCadastro(e.target.value)}
                  />
                )}
                {telaCadastro && passo === 1 && (
                  <TextField
                    label="Nome"
                    InputLabelProps={{
                      style: { color: "white" }, // Defina a cor desejada aqui
                    }}
                    type="text"
                    required
                    sx={{
                      input: { color: "white" }, // Cor do texto digitado
                      "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                        "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                      }
                    }}
                    minLength={3}
                    maxLength={40}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                )}
                {telaCadastro && passo == 1 && (
                  <TextField
                    InputLabelProps={{
                      style: { color: "white" }, // Defina a cor desejada aqui
                    }}
                    label="Senha"
                    type="password"
                    required
                    sx={{
                      input: { color: "white" }, // Cor do texto digitado
                      "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                        "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                      }
                    }}
                    minLength={3}
                    maxLength={30}
                    value={senhaCadastro}
                    onChange={(e) => setSenhaCadastro(e.target.value)}
                  />
                )}
                {telaCadastro && passo == 1 && (
                  <TextField
                    InputLabelProps={{
                      style: { color: "white" }, // Defina a cor desejada aqui
                    }}
                    label="Repita sua senha"
                    type="password"
                    required
                    sx={{
                      input: { color: "white" }, // Cor do texto digitado
                      "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                        "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                      }
                    }}
                    minLength={3}
                    maxLength={30}
                    value={senhaCadastroRepetida}
                    onChange={(e) => setSenhaRepetida(e.target.value)}
                  />

                )}
                {telaCadastro && passo == 1 && (
                  <TextField

                    InputLabelProps={{
                      style: { color: "white" }, // Defina a cor desejada aqui
                    }}
                    label="Celular"
                    type="tel"
                    required
                    sx={{
                      input: { color: "white" }, // Cor do texto digitado
                      "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                        "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                      }
                    }}
                    minLength={3}
                    maxLength={11}
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                  />
                )}






                {telaCadastro && passo === 2 && (
                  <Stack
                    display={"flex"}
                    justifyItems={"center"}
                    alignItems="center"
                    gap="10px"
                    direction={"column"}
                    marginBottom={"20px"}
                  >
                    <Typography
                      textTransform={"none"}
                      color={"white"}
                      textAlign={"center"}
                      margin="10px"
                    >
                      Um código de verificação de email foi enviado para{" "}
                      {emailCadastro} com um código de 6 dígitos.
                    </Typography>

                    <TextField

                      label="Código"
                      type="text"
                      required
                      sx={{
                        input: { color: "white" }, // Cor do texto digitado
                        "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                          "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                        }
                      }}

                      maxLength={6}
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </Stack>
                )}
                {telaEsqueciaSenha && passo == 2 && (
                  <Stack
                    display={"flex"}
                    justifyItems={"center"}
                    alignItems="center"
                    gap="10px"
                    direction={"column"}
                    marginBottom={"20px"}
                  >
                    <Typography
                      textTransform={"none"}
                      color={"white"}
                      textAlign={"center"}
                      margin="10px"
                    >
                      Um código de verificação de email foi enviado para{" "}
                      {emailEsqueciSenha} com um código de 6 dígitos.
                    </Typography>

                    <TextField
                      label="Código"
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      sx={{
                        input: { color: "white" }, // Cor do texto digitado
                        "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white" }, // Borda padrão
                          "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                          "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                        }
                      }}
                      name="codigo"
                      type="text"
                      height="auto"
                      value={codigoEsqueciASenha}
                      onChange={(e) => {
                        setCodigoEsqueciASenha(e.target.value);
                      }}
                    />
                  </Stack>
                )}
                {telaEsqueciaSenha && passo == 3 && (
                  <Stack
                    display={"flex"}
                    justifyItems={"center"}
                    alignItems="center"
                    gap="10px"
                    direction={"column"}
                    marginBottom={"20px"}
                  >
                    <Typography
                      textTransform={"none"}
                      color={"white"}
                      textAlign={"center"}
                      margin="10px"
                    >
                      Insira sua nova senha
                    </Typography>

                    <TextField
                      label="Senha"
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      sx={{
                        input: { color: "white" }, // Cor do texto digitado
                        "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white" }, // Borda padrão
                          "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                          "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                        }
                      }}
                      name="usuario"
                      type="password"
                      height="auto"
                      value={senhaEsqueciASenha}
                      onChange={(e) => {
                        setSenhaEsqueciASenha(e.target.value);
                      }}
                    />
                    <TextField
                      label="Senha novamente"
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      sx={{
                        input: { color: "white" }, // Cor do texto digitado
                        "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "white" }, // Borda padrão
                          "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                          "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                        },
                        "& .MuiInputBase-input": { color: "white" }, // Garantia extra de cor para o texto digitado
                        "& .MuiOutlinedInput-input": { color: "white" } // Outra camada para texto branco
                      }}
                      name="usuario"
                      type="password"
                      height="auto"
                      value={senhaRepetidaEsqueciASenha}
                      onChange={(e) => {
                        setSenhaRepetidaEsqueciASenha(e.target.value);
                      }}
                    />

                  </Stack>
                )}
              </Stack>
              <Stack id="botoes" justifyContent={"center"} direction={"row"}>
                {telaCadastro && passo === 1 && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setTelaLogin(true);
                      setTelaCadastro(false);
                    }}
                  >
                    <Typography textTransform={"none"} color={"white"}>
                      Voltar
                    </Typography>
                  </Button>
                )}
                {telaCadastro && passo === 1 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setPassoGuardachuval(1);
                    }}
                  >
                    <Typography textTransform={"none"}>Prosseguir</Typography>
                  </Button>
                )}
                {telaCadastro && passo === 2 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setPasso(1);
                    }}
                  >
                    <Typography color={"white"} textTransform={"none"}>Voltar</Typography>
                  </Button>
                )}

                {telaCadastro && passo === 3 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setPasso(2);
                    }}
                  >
                    <Typography color={"black"}>Voltar</Typography>
                  </Button>
                )}
                {telaCadastro && passo === 3 && (
                  <Button
                    variant="contained"
                    disabled={botaoCadastroDesabilitado}
                    onClick={() => {
                      console.log("fdsfs")
                      // setPassoGuardachuval(passo);
                    }}
                  >
                    <Typography color={"white"}>{textoBotaoConcluirCadastro}</Typography>
                  </Button>
                )}
                {telaCadastro && passo === 2 && (
                  <Button
                    variant="contained"
                    disabled={botaoCadastroDesabilitado}
                    onClick={() => {

                      setPassoGuardachuval(passo);
                    }}
                  >
                    <Typography color={"white"} textTransform={"none"} >Confirmar</Typography>
                  </Button>
                )}
                {telaEsqueciaSenha && passo == 1 && (
                  <Box>
                    <Stack direction={"row"}>
                      <Button
                        sx={{ color: "white" }}
                        variant="outlined"
                        style={{ backgroundColor: tema.palette.secondary.dark }}
                        onClick={() => {
                          setTelaLogin(true);
                          setTelaEsqueciASenha(false);
                        }}
                      >
                        <Typography color={"black"} textTransform={"none"}>
                          Voltar
                        </Typography>
                      </Button>
                      <Button
                        style={{ backgroundColor: tema.palette.secondary.main }}
                        variant="contained"
                        disabled={botaoPassoUmDesabilitado}
                        onClick={() => {
                          if (
                            emailEsqueciSenha.includes("@") &&
                            emailEsqueciSenha.split("@")[1] != null &&
                            emailEsqueciSenha.split("@")[1].includes(".")
                          ) {
                            enviarEmailEsqueciASenha();
                            setBotaoPassoUmDesabilitado(true);
                          } else {
                            setDialogoAberto(true);
                            setTextoDialogo("Email inválido!");
                          }
                        }}
                      >
                        <Typography textTransform={"none"} color={"black"}>
                          Continuar
                        </Typography>
                      </Button>
                    </Stack>
                  </Box>
                )}
                {telaEsqueciaSenha && passo == 2 && (
                  <Box>
                    <Stack direction={"row"}>
                      <Button
                        sx={{ color: "white" }}
                        variant="outlined"
                        style={{ backgroundColor: tema.palette.secondary.dark }}
                        onClick={() => {
                          setPasso(1);
                          setBotaoPassoUmDesabilitado(false);
                        }}
                      >
                        <Typography color={"white"} textTransform={"none"}>
                          Voltar
                        </Typography>
                      </Button>
                      <Button
                        style={{ backgroundColor: tema.palette.secondary.main }}
                        variant="contained"
                        disabled={botaoPassoDoisDesabilitado}
                        onClick={() => {
                          if (codigoEsqueciASenha.length == 6) {
                            enviarCodigoDeConfirmacaoEsqueciASenha();
                            setBotaoPassoDoisDesabilitado(true);
                          } else {
                            setDialogoAberto(true);
                            setTextoDialogo("Código inválido.")
                          }
                        }}
                      >
                        <Typography textTransform={"none"} color={"white"}>
                          Continuar
                        </Typography>
                      </Button>
                    </Stack>
                  </Box>
                )}
                {telaEsqueciaSenha && passo == 3 && (
                  <Box>
                    <Stack direction={"row"}>
                      <Button
                        sx={{ color: "white" }}
                        variant="outlined"
                        style={{ backgroundColor: tema.palette.secondary.dark }}
                        onClick={() => {
                          setPasso(1);
                          setBotaoPassoUmDesabilitado(false);
                          setBotaoPassoDoisDesabilitado(false);
                        }}
                      >
                        <Typography color={"black"} textTransform={"none"}>
                          Voltar
                        </Typography>
                      </Button>
                      <Button
                        style={{ backgroundColor: tema.palette.secondary.main }}
                        variant="contained"
                        disabled={botaoPassoTresDesabilitado}
                        onClick={() => {
                          console.log(
                            senhaEsqueciASenha +
                            " - " +
                            senhaRepetidaEsqueciASenha
                          );
                          if (
                            senhaEsqueciASenha.length > 8 &&
                            (senhaEsqueciASenha.indexOf("@") != null ||
                              senhaEsqueciASenha.indexOf("!") != null ||
                              senhaEsqueciASenha.indexOf("#") != null ||
                              senhaEsqueciASenha.indexOf("$") != null ||
                              senhaEsqueciASenha.indexOf("&") != null)
                          ) {
                            if (
                              senhaRepetidaEsqueciASenha == senhaEsqueciASenha
                            ) {
                              enviarNovaSenha();
                              setBotaoPassoTresDesabilitado(true);
                            } else {
                              setDialogoAberto(true);
                              setTextoDialogo("As senhas devem ser iguais.");
                            }
                          } else {
                            setDialogoAberto(true);
                            setTextoDialogo(
                              "As senhas devem ser iguais, ter no mínimo 8 caracteres, conter caracteres especiais (!,@,#,$,%)"
                            );
                          }
                        }}
                      >
                        <Typography textTransform={"none"} color={"white"}>
                          Continuar
                        </Typography>
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Dialog open={dialogoAberto} onClose={fecharDialogo}>
        <DialogTitle>{tituloDialogo}</DialogTitle>
        <DialogContent>
          <Typography color={"black"}>{textoDialogo}</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setDialogoAberto(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogoTelaLogin} onClose={fecharDialogo}>
        <DialogTitle>{tituloDialogo}</DialogTitle>
        <DialogContent>
          <Typography color={"black"}>{textoDialogo}</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setDialogoTelaLogin(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
export default Login;
