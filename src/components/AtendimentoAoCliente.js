import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { Box, Button, createTheme, MenuItem, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import Cabecalho from "./Cabecalho";
import RenderizadorDeImagem from "./RenderizadorDeImagem";
import { propiedadesDoTema } from "../utils/tema";
import axios from "axios";

function AtendimentoAoCliente() {

  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [temaSelecionado, setTemaSelecionado] = useState("");
  const [enviarDesabilitado, setEnviarDesabilitado] = useState("");
  const [temaAtendimento, setTemaAtendimento] = useState([
    ["Dúvida pré-compra", "DUVIDA_PRE_COMPRA"],
    ["Problema com pedido", "PROBLEMA_COM_PEDIDO"],
    ["Atraso na entrega", "ATRASO_NA_ENTREGA"],
    ["Pedido incorreto", "PEDIDO_INCORRETO"],
    ["Pagamento não aprovado", "PAGAMENTO_NAO_APROVADO"],
    ["Cobrança indevida", "COBRANCA_INDEVIDA"],
    ["Estorno / Reembolso", "ESTORNO_REEMBOLSO"],
    ["Troca de produto", "TROCA"],
    ["Devolução", "DEVOLUCAO"],
    ["Garantia", "GARANTIA"],
    ["Dúvida sobre o produto", "DUVIDA_SOBRE_PRODUTO"],
    ["Produto com defeito", "PRODUTO_COM_DEFEITO"],
    ["Problema com login", "PROBLEMA_COM_LOGIN"],
    ["Atualização de cadastro", "ATUALIZACAO_DE_CADASTRO"],
    ["Reclamação", "RECLAMACAO"],
    ["Sugestão", "SUGESTAO"],
    ["Elogio", "ELOGIO"],
    ["Outros", "OUTROS"],
  ]);



  const [idMateria, setIdMateria] = useState(localStorage.getItem("idMateria"));
  const tema = createTheme(propiedadesDoTema);


  useEffect(() => {

  }, []);
  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  const enviarContato = async (id) => {
    try {
      const response = await axios.post(
        ip + "/contato/registrar",
        {
          temaDoAtendimento: temaSelecionado[1],
          descricao: descricao
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

    } catch (error) {
      console.log(error);
    }

  };
  return (
    <ThemeProvider theme={tema}>

      <Stack
        direction={"column"}
        height={"100%"}
      >
        <Cabecalho />

        <Stack direction={"row"} height={"100%"} bgcolor={tema.palette.tertiary.main}>
          <Stack direction={"column"} width={"50%"} justifyContent={"center"} alignItems={"center"}>
            <Typography align="center" width={"50%"} fontSize={"1.5em"}>
              A comunicação é essencial para resolver os problemas. Estamos aqui para ajudar a resolver qualquer um.
            </Typography>
            <RenderizadorDeImagem height="500px" width="500px" logo="true"></RenderizadorDeImagem>
          </Stack>

          <Stack alignItems={"center"} justifyContent={"center"} width={"50%"} direction={"column"} gap={"50px"}
            sx={{
              backgroundColor: tema.palette.secondary.main
            }}
          >
            
            <Stack
              direction="column"
              gap="30px"
              width="60%"
              minWidth={"300px"}
              height="70%"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: "24px",                 // 🔵 arredondamento elegante
                padding: "40px",
                boxShadow: "0px 12px 30px rgba(0,0,0,0.35)", // 🔵 profundidade
                border: `1px solid rgba(255,255,255,0.08)`,
                background: `linear-gradient(
    145deg,
    ${tema.palette.tertiary.main},
    ${tema.palette.tertiary.main}
  )`,
                borderRadius: "24px",
                padding: "40px",
                boxShadow: "0px 12px 30px rgba(0,0,0,0.35)"
              }}
            >
              <RenderizadorDeImagem height="100px" width="100px" logo="true"></RenderizadorDeImagem>
              <TextField
                select
                label="Selecione o tema do seu contato"
                variant="outlined"
                margin="normal"
                sx={{
                  width: "80%",
                  minWidth: "300px",
                  input: { color: "white" }, // Cor do texto digitado
                  "& .MuiInputLabel-root": { color: "white" }, // Cor do label
                  "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // Cor do label quando focado
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "white" }, // Borda ao passar o mouse
                    "&.Mui-focused fieldset": { borderColor: "white" } // Borda ao focar
                  }
                }}
                value={temaSelecionado}
                onChange={(e) => {
                  console.log(e.target.value)
                  setTemaSelecionado(e.target.value)
                }}
              >
                {temaAtendimento.map((opcao) => (
                  <MenuItem color={tema.palette.secondary.main} key={opcao} value={opcao}>
                    {opcao[0]}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Descrição"
                type="text"
                required
                multiline
                minRows={10}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                sx={{
                  width: "80%",
                  minWidth: "300px",

                  "& .MuiInputBase-root": {
                    minHeight: "300px",
                    alignItems: "flex-start",
                  },

                  "& textarea": {
                    color: "white",
                  },

                  "& .MuiInputLabel-root": {
                    color: "white",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                inputProps={{
                  minLength: 3,
                  maxLength: 300,
                }}
              />
              <Button
                disabled= {enviarDesabilitado}
                onClick={() => {
                  enviarContato()
                  setEnviarDesabilitado(true)
                }}
                
                variant="contained"
                sx={{
                  backgroundColor: tema.palette.quinary.main,
                  "&:hover": {
                    backgroundColor: tema.palette.quinary.dark,
                  },
                }}
              >
                <Typography textTransform="none">
                  Enviar
                </Typography>
              </Button>
            </Stack>
          </Stack>

        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default AtendimentoAoCliente;