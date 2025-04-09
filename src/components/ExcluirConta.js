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
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";
import { propiedadesDoTema } from "../utils/tema";
import NavBarComScroll from "./Cabecalho"
import { useState } from "react";
import axios from "axios";

const tema = createTheme(propiedadesDoTema);

function ExcluirConta() {
  const [usuario, definirUsuario] = useState("")
  const [senha, definirSenha] = useState("")
  const [dialogoAberto, definirDialogoAberto] = useState(false)
  const [mensagemDialogo, definirMensagemDialogo] = useState("")
  const token = localStorage.getItem("token");

  let ip = "";
  if (ambiente === "dev") {
    ip = devIp;
  }

  if (ambiente === "prod") {
    ip = prodIp;
  }

  const submit = async () => {
    try {
      if (usuario != "" && senha != "") {
        const resposta = await axios.post(
          ip + "/usuario/excluir",
          {
            usuario: usuario,
            senha: senha
          },
          {
            headers: {
              "Authorization": token,
            }
          }
        );
        if (resposta.status == 200) {
          definirDialogoAberto(true)
          definirMensagemDialogo(" Sua conta e suas informações foram excluidas com sucesso!")
          definirUsuario("")
          definirSenha("")
        } else {
          definirDialogoAberto(true)
          definirMensagemDialogo("Credenciais inválidas")
        }
      } else {
        definirDialogoAberto(true)
        definirMensagemDialogo("Credenciais inválidas")
      }
    } catch (error) {
      console.log(error)
      definirDialogoAberto(true)
      definirMensagemDialogo("Credenciais inválidas")
    }

  }



  return (
    <ThemeProvider theme={tema}>
      <Dialog open={dialogoAberto}>
        <DialogContent>
          <Typography> {mensagemDialogo} </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => definirDialogoAberto(false)} > Fechar </Button>
        </DialogActions>
      </Dialog>
      <NavBarComScroll logo={true} />
      <Box
        display="flex"
        justifyContent={"center"}
        alignContent={"center"}
        padding={"20px"}
        width="100%"
        height={"100%"}

      >
        <Stack direction={"column"}>

          <Typography color={"black"}>
            Para excluir a sua conta é nessario informar suas credenciais. Esta ação é IRREVERSIVEL.
          </Typography>
          <Box height={"30px"}></Box>
          < TextField
            value={usuario}
            onChange={(e) => definirUsuario(e.target.value)}
            label="Usuario">

          </TextField>
          < TextField
            value={senha}
            onChange={(e) => definirSenha(e.target.value)}
            type="password"
            label="Senha">

          </TextField>
          <Button
            onClick={submit}
            sx={{ marginTop: "40px" }} variant="contained" >
            <Typography textTransform={"none"}>Excluir</Typography>
          </Button>
        </Stack>
      </Box>

    </ThemeProvider>
  );
}

export default ExcluirConta;
