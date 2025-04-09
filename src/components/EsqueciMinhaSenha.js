import react, { useState } from "react";
import "./esqueciasenha.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

function EsqueciminhaSenha() {
  let [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const tema= createTheme()
  const navegar = useNavigate();

  const [responseState, setResponseState] = useState(null); // Novo estado para armazenar a resposta do Axios

  const esqueciMinhaSenha = async () => {
    try {
      const axiosInstance = axios.create({propiedadesDoTema});
      const response = await axiosInstance.post(
        "http://localhost:7200/api/v1/aut/esqueciminhasenha",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setStep(2);

      console.log(response.data.mensagem);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ThemeProvider theme={tema}>
      {
        <Box className="tela-formulario">
          {step === 1 && (
            <div>
              <form>
                <p className="descricao">
                  Para recuperar sua senha, precisamos enviar um email de
                  confirmação para seu email. Por favor, digite seu email no
                  campo abaixo
                </p>
                <label for="email" />
                <input
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
                <Stack direction={"row"}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      navegar("/login");
                    }}
                  >
                    <Typography>Voltar</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    className="botao-login"
                    onClick={() => {
                      esqueciMinhaSenha();
                    }}
                  >
                    Enviar
                  </Button>
                </Stack>
              </form>
            </div>
          )}

          {step === 2 && (
            <Stack direction={"row"}>
              <p className="descricao">
                Email de confirmação foi enviado para *********
                {email.split("@")[1]}
              </p>
              <button
                className="botao-login"
                onClick={() => {
                  navegar("/login");
                }}
              >
                Voltar
              </button>
            </Stack>
          )}
        </Box>
      }
    </ThemeProvider>
  );
}

export default EsqueciminhaSenha;
