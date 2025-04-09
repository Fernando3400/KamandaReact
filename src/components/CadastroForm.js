import "./cadastro-form.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import BotaoCadastre from "./BotaoCadastre";
import {
  TextField,
  Typography,
  Stack,
  createTheme,
  Button,
  Box,
  ThemeProvider,
} from "@mui/material";
import { propiedadesDoTema } from "../utils/tema";

function CadastroForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [celular, setCelular] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [passo, setPasso] = useState(1);
  const [cnpj, setCnpj] = useState("");
  const [boasVindas, setBoasVindas] = useState("");
  const tema = createTheme(propiedadesDoTema);
  const [token, setToken] = useState("");

  let ip = "";
console.log(ambiente)
  if (ambiente == "dev") {
    ip = devIp;
  }

  if (ambiente == "prod") {
    ip = prodIp;
  }
  function setPassoGuardachuval(passoAtual) {
    if (passoAtual == 1) {
      if (email != "" && nome != "" && senha === senhaRepetida && senha != "") {
        setPasso(2);
      }
    }

    if (passoAtual == 2) {
      setPasso(3);
    }
    if (passoAtual == 3) {
      enviarCodigoDeConfirmacao();
      setPassoGuardachuval(4);
    }
  }
  const registrar = async () => {
    if (email != "" && nome != "" && senha === senhaRepetida && senha != "") {
      setPasso(2);
    }
    try {
      console.log(ip)
      const axiosInstance = axios.create({});
      const response = await axiosInstance.post(
        ip + "/api/v1/aut/registrar",
        {
          email: email,
          senha: senha,
          celular: celular,
          nome: nome,
          tipoConta: "ESTABELECIMENTO",
          propriedadeDeEstabelecimentos: {
            nome: nome,
            endereco: endereco,
            cep: cep,
            cnpj: cnpj,
            telefone: celular,
            description: boasVindas,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(response.data.token);
      localStorage.setItem("token", "Bearer " + response.data.token);
      setPassoGuardachuval(2);
    } catch (error) {
      console.error(error);
    }
  };
  const enviarCodigoDeConfirmacao = async () => {
    try {
      const axiosInstance = axios.create({});

      const response = await axiosInstance.post(
        ip + "/api/v1/aut/confirmaremail",
        {
          codigo: codigo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/estabelecimentos/inicio");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={tema}>
      <Box>
        <form
          className="formulario"
          onSubmit={(e) => {
            e.preventDefault();
            registrar();
          }}
        >
          <Stack direction="column" className="form-img-backgroud">
            <Typography variant="h1" color={"#183324"} textTransform={"none"}>
              Ubuntu
            </Typography>
            <Typography variant="h3" color={"#183324"} textTransform={"none"}>
              Estabelecimento
            </Typography>

            {passo === 3 && (
              <Stack direction={"column"}>
                <Typography
                  marginTop="40px"
                  marginBottom="40px"
                  variant="h5"
                  color={"black"}
                >
                  Um código foi enviado ao seu email para confirmação de
                  autenticidade
                </Typography>
              </Stack>
            )}
          </Stack>
          <div className="campos">
            {passo == 1 && (
              <TextField
                placeholder="Email"
                minLength={3}
                name="usuario"
                type="text"
                maxLength={50}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                TextField
              />
            )}
            {passo === 1 && (
              <TextField
                placeholder="Nome"
                type="text"
                required
                minLength={3}
                maxLength={40}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            )}
            {passo == 1 && (
              <TextField
                placeholder="Senha"
                type="password"
                required
                minLength={3}
                maxLength={30}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            )}
            {passo == 1 && (
              <TextField
                placeholder="Repita sua senha"
                type="password"
                required
                minLength={3}
                maxLength={30}
                value={senhaRepetida}
                onChange={(e) => setSenhaRepetida(e.target.value)}
              />
            )}
            {passo === 2 && (
              <TextField
                placeholder="Celular"
                type="number"
                required
                minLength={3}
                maxLength={30}
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
            )}
            {passo === 2 && (
              <TextField
                placeholder="Endereco"
                type="text"
                required
                minLength={3}
                maxLength={40}
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            )}
            {passo === 2 && (
              <TextField
                placeholder="Cep"
                type="text"
                required
                minLength={8}
                maxLength={9}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            )}
            {passo === 2 && (
              <TextField
                placeholder="Cnpj"
                type="text"
                required
                minLength={8}
                maxLength={9}
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            )}
            {passo === 3 && (
              <TextField
                placeholder="Código de 6 digitos"
                type="text"
                required
                maxLength={6}
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            )}
          </div>

          <Stack justifyContent={"center"} fullwidth direction={"row"} >
            {passo === 1 && (
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <Typography>Voltar</Typography>
              </Button>
            )}
            {passo === 1 && (
              <Button
                variant="contained"
                onClick={() => {
                  setPassoGuardachuval(1);
                }}
              >
                <Typography>Prosseguir</Typography>
              </Button>
            )}
            {passo === 2 && (
              <Button
                variant="outlined"
                onClick={() => {
                  setPasso(1);
                }}
              >
                <Typography>Voltar</Typography>
              </Button>
            )}
            {passo === 2 && (
              <Button variant="contained" type="submit">
                <Typography>Concluir</Typography>
              </Button>
            )}

            {passo === 3 && (
              <Button
                variant="contained"
                onClick={() => {
                  console.log(5);
                  setPassoGuardachuval(3);
                }}
              >
                <Typography>Confirmar</Typography>
              </Button>
            )}
          </Stack>
        </form>
        {passo == 3 && <Typography> Passo 3</Typography>}
      </Box>
    </ThemeProvider>
  );
}

export default CadastroForm;
