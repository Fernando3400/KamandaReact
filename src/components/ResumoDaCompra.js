import React, { useEffect, useState } from "react";
import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import axios from "axios";
import PixIcon from "@mui/icons-material/Pix"; // Ícone do Pix do Material-UI
import {
  Box,
  Stack,
  ThemeProvider,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { propiedadesDoTema } from "../utils/tema";
import { ambiente, devIp, prodIp } from "../propriedades";
import { useNavigate } from "react-router-dom";
import RenderizadorDeImagem from "./RenderizadorDeImagem";

function ResumoDaCompra() {
  const tema = createTheme(propiedadesDoTema);
  const navegar = useNavigate();
  const ip = ambiente === "dev" ? devIp : prodIp;

  const [erroDialogoPrimeiraCompra, setErroDialogoPrimeiraCompra] = useState("");

  const [componentes, setComponentes] = useState([]);
  const [total, setTotal] = useState("0");
  const [totalSemFrete, setTotalSemFrete] = useState("0");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [primeiraCompra, setDialogoPrimeiraCompra] = useState(false);
  const [rotulo, setRotuloPrimeiraCompra] = useState("")
  const [logradouro, setLogradouroPrimeiraCompra] = useState("")
  const [numero, setNumeroPrimeiraCompra] = useState("")
  const [complemento, setComplementoPrimeiraCompra] = useState("")
  const [cep, setCepPrimeiraCompra] = useState("")
  const [cidade, setCidadePrimeiraCompra] = useState("")
  const [estado, setEstadoPrimeiraCompra] = useState("")
  const [rotuloAlteracaoDeEndereco, setRotuloAlteracaoDeEndereco] = useState("")
  const [logradouroAlteracaoDeEndereco, setLogradouroAlteracaoDeEndereco] = useState("")
  const [numeroAlteracaoDeEndereco, setNumeroAlteracaoDeEndereco] = useState("")
  const [complementoAlteracaoDeEndereco, setComplementoAlteracaoDeEndereco] = useState("")
  const [cepAlteracaoDeEndereco, setCepAlteracaoDeEndereco] = useState("")
  const [cidadeAlteracaoDeEndereco, setCidadeAlteracaoDeEndereco] = useState("")
  const [estadoAlteracaoDeEndereco, setEstadoAlteracaoDeEndereco] = useState("")
  const [feedBackPagamento, setFeedBackPagamento] = useState("")
  const [textoFeedBackPagamento, setTextoFeedBackPagamento] = useState("")
  // setFeedBackPagamento(true)
  // setTextoFeedBackPagamento("Pagamento ainda não efetuado")


  const [rotuloTela, setRotuloTela] = useState("")
  const [enderecoCompletoTela, setEnderecoCompletoTela] = useState("")
  const [dialogoPix, setDialogoPix] = useState("")
  const [pix, setPix] = useState("")
  const [logradouroTela, setLogradouroTela] = useState("")
  const [numeroTela, setNumeroTela] = useState("")
  const [complementoTela, setComplementoTela] = useState("")
  const [cepTela, setCepTela] = useState("")
  const [cidadeTela, setTela] = useState("")
  const [estadoTela, setEstadoTela] = useState("")
  const [textoFrete, setTextoFrete] = useState("")

  const [formaEntrega, setFormaEntrega] = useState("CORREIO");
  const [formaDePagamento, setFormaDePagamento] = useState(0);
  const [textoDialogoErro, setTextoDialogoErro] = useState("");
  const [dialogoErro, setDialogoErro] = useState("");
  const [codigoPix, setCodigoPix] = useState("");
  const [resgate, setResgate] = useState(false);
  const [codigoPixId, setCodigoPixId] = useState("");
  const [pagamentoConcluido, setPagamentoConcluido] = useState(false);



  useEffect(() => {
    obterResumoDaCompra();


  }, []);
  const obterResumoDaCompra = async () => {

    try {
      const response = await axios.get(
        ip + "/loja/entrega",

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (response.status == 200) {
        console.log(response.data)
        if (response.data.pagamentoPendente) {

          setCodigoPixId(response.data.codigo)
          obterTelaDePagamentoPIX(response.data.codigo, true)
        }
        setTotal(response.data.valorTotalFormatado)
        setComponentes(response.data.componentes)
        setTotalSemFrete(response.data.totalSemFrete)

        // Capturar o valor do frete

        setEnderecoCompletoTela(response.data.endereco.enderecoCompleto);
        if (response.data.pagamentoPendente == false) {
          const componenteFrete = response.data.componentes.find(item => item.frete === true);
          if (componenteFrete) {
            setTextoFrete(componenteFrete.preco);
          }
        }
      }


    } catch (error) {
      console.log(error)
      if (error.response.status == 501)
        setDialogoPrimeiraCompra(true)
      if (error.response.status == 404)
        navegar("/")

    }
  };
  const obterTelaPagamentoSaldo = async () => {
    console.log(localStorage.getItem("token"))
    try {
      const response = await axios.get(
        ip + "/pagamento/saldo",

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (response.status == 200) {
        setTotal(response.data.valorTotalFormatado)
        setComponentes(response.data.componentes)
        // Capturar o valor do frete
        const componenteFrete = response.data.componentes.find(item => item.frete === true);
        if (componenteFrete) {
          setTextoFrete(componenteFrete.preco);
        }
        setEnderecoCompletoTela(response.data.endereco.enderecoCompleto);

      }


    } catch (error) {
      console.log(error.response.status)
      if (error.response.status == 501)
        setDialogoPrimeiraCompra(true)

      console.log(error);
    }
  };
  const obterTelaDePagamentoPIX = async (codigo, resgate = false) => {
    console.log(localStorage.getItem("token"))
    setResgate(resgate)
    if (resgate) {

      try {
        const response = await axios.post(
          ip + "/pagamento/verificar",
          {
            codigo: codigo
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }
        );

        if (response.status == 200) {
          setTextoDialogoErro("Há um pagamento pendente registrado no nosso sistema, caso queira cancelar clique em \"Cancelar\"." +
            "\nEscaneie o Pix QR Code com seu aplicativo bancário, e depois verifique o pagamento")
          setPix(response.data.point_of_interaction.transaction_data.qr_code_base64)
          setDialogoPix(true)
        }


      } catch (error) {

        if (error.response.status == 501)
          setDialogoPrimeiraCompra(true)


      }
    } else {
      try {
        const response = await axios.post(
          ip + "/pagamento/pix/criar",
          {
            metodo: formaDePagamento,
            tipoServico: "COMPRA",
            formaEntrega: formaEntrega,
            resgate: resgate
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }
        );

        if (response.status == 200) {
          setDialogoPix(true)
          setPix(response.data.point_of_interaction.transaction_data.qr_code_base64)
          setCodigoPixId(response.data.point_of_interaction.transaction_data.transaction_id)
        }

      } catch (error) {
        if (error.response.status == 501)
          setDialogoPrimeiraCompra(true)
      }
    }

  };
  const verificarPagamento = async () => {

    try {
      const response = await axios.post(
        ip + "/pagamento/verificar",
        {
          codigo: codigoPixId
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (response.status == 200) {
        console.log(response)
        if (response.data.status == "approved") {
          setDialogoPix(false)
          setDialogoErro(true)
          setPagamentoConcluido(true)
          setTextoDialogoErro("Compra concluída com sucesso. Para acompanhar o andamento da entrega acompanhe seu pedido na seção \"Minhas Entregas\"")

        } else {
          setFeedBackPagamento(true)
          setTextoFeedBackPagamento("Pagamento ainda não efetuado")
        }
      }


    } catch (error) {
      if (error.response.status == 410) {
        setTextoDialogoErro(" Pagamento ainda não concluído")
      }
      console.log(error.response.status)
      if (error.response.status == 501)
        setDialogoPrimeiraCompra(true)

      console.log(error);
    }
  };
  const prosseguir = async (formaPagamento) => {
    console.log(formaEntrega)
    if (formaEntrega == 0) {
      setDialogoErro(true)
      setTextoDialogoErro("Selecione a forma de envio")
    }
    if (formaPagamento == 0) {
      setDialogoErro(true)
      setTextoDialogoErro("Selecione a forma de pagamento")
    }
    if (formaPagamento == "PIX") {
      obterTelaDePagamentoPIX()
    } else if (formaPagamento == "SALDO") {
      obterTelaPagamentoSaldo()
    }


  }


  const enviarPrimeiraCompra = async () => {

    if (rotulo.length > 0
      && logradouro.length > 0
      && numero.length > 0
      && cep.length > 0
      && cidade.length > 0
      && estado.length > 0
    ) {
      try {
        const response = await axios.post(
          ip + "/loja/primeiracompra", {
          rotulo: rotulo,
          endereco: logradouro,
          numero: numero,
          complemento: complemento,
          cep: cep,
          cidade: cidade,
          estado: estado,
        },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }
        );

        if (response.status == 200) {

          window.location.reload()
        }


      } catch (error) {
        console.log(error)
        if (error.response.status == 400)
          setErroDialogoPrimeiraCompra("Os dados estão incongruentes")

        console.log(error);
      }
    } else {
      setErroDialogoPrimeiraCompra("Dados inválidos")
    }
  };

  const cancelarPagamento = async () => {
    try {
      const response = await axios.get(
        ip + "/pagamento/cancelar",

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (response.status == 200) {

        navegar("/")
      }


    } catch (error) {
      console.log(error)
      if (error.response.status == 400)
        setErroDialogoPrimeiraCompra("Xandão disse que os dados estão incongruentes")

      console.log(error);
    }
  };
 
  const editarEndereco = async () => {
    try {
      const response = await axios.post(
        ip + "/usuario/endereco/editar",
        {
          endereco: logradouroAlteracaoDeEndereco,
          rotulo: rotuloAlteracaoDeEndereco,
          numero: numeroAlteracaoDeEndereco,
          complemento: complementoAlteracaoDeEndereco,
          cep: cepAlteracaoDeEndereco,
          cidade: cidadeAlteracaoDeEndereco,
          estado: estadoAlteracaoDeEndereco
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (response.status == 200) {

        window.location.reload()
      }


    } catch (error) {
      console.log(error)
      if (error.response.status == 400)
        setErroDialogoPrimeiraCompra("Os Dados estão incongruentes")

      console.log(error);
    }
  };
  const obterEndereco = async () => {
    try {
      const response = await axios.get(
        ip + "/usuario/endereco/tela",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }
      );

      if (response.status == 200) {
        console.log(response.data.endereco)
        setRotuloAlteracaoDeEndereco(response.data.endereco.rotulo)
        setLogradouroAlteracaoDeEndereco(response.data.endereco.endereco)
        setNumeroAlteracaoDeEndereco(response.data.endereco.numero)
        setComplementoAlteracaoDeEndereco(response.data.endereco.complemento)
        setCepAlteracaoDeEndereco(response.data.endereco.cep)
        setCidadeAlteracaoDeEndereco(response.data.endereco.cidade)
        setEstadoAlteracaoDeEndereco(response.data.endereco.estado)
      }


    } catch (error) {
      console.log(error)
      if (error.response.status == 400)
        setErroDialogoPrimeiraCompra("Os dados estão incongruentes")

      console.log(error);
    }
  };


  return (
    <ThemeProvider theme={tema}>
      <Dialog open={dialogoPix}>
        <DialogTitle> <Typography variant="h5" textAlign={"center"}>Pagamento via Pix </Typography></DialogTitle>
        <DialogContent>
          <Typography width="400px" textAlign={"center"}> Escaneie o Pix QR Code com seu aplicativo bancário, e depois verifique o pagamento</Typography>
          <RenderizadorDeImagem imagem={pix} width="400px" height="400px"></RenderizadorDeImagem>
          {
            feedBackPagamento && <Typography textAlign={"center"} color={"red"}>
              {textoFeedBackPagamento}
            </Typography>
          }
        </DialogContent>
        <DialogActions >

          {
            resgate && <Button onClick={() => { cancelarPagamento() }}><Typography textTransform={"none"}>Cancelar</Typography></Button>
          }
          <Button variant="contained" onClick={() => { verificarPagamento() }}>
            <Typography textTransform={"none"}>
              Verificar Pagamento
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogoErro}>
        <DialogContent>
          <Typography>{textoDialogoErro}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            if (pagamentoConcluido) {
              navegar("/minhasEntregas")
            }
            setDialogoErro(false)
          }}><Typography textTransform={"none"}>Fechar</Typography></Button>
        </DialogActions>
      </Dialog>
      <Stack display="flex" sx={{ width: "100vw", height: "100%" }}>
        <Cabecalho nome=" Resumo da Compra" />

        <Stack direction="row" display="flex" height={"100vh"} sx={{ padding: 2 }}>
          {/* Coluna 1 - Endereço */}
          <Box sx={{ width: "50%", padding: 2 }}>
            <Typography variant="h6" color={"black"}>Endereço de Entrega</Typography>
            {enderecoCompletoTela ? (
              <Typography color={"black"}>{enderecoCompletoTela}</Typography>
            ) : (
              <Typography color={"black"}>Carregando...</Typography>
            )}
            <Button variant="contained" onClick={() => {
              setDialogAberto(true)
              obterEndereco()
            }} sx={{ mt: 2 }}>
              <Typography textTransform={"none"}>Alterar Endereço</Typography>
            </Button>
            <RadioGroup
              value={formaEntrega}
              onChange={(e) => setFormaEntrega(e.target.value)}
            >
              {/* Opção de entrega via Loggi */}
              <FormControlLabel
                value="CORREIO"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ color: "black" }}>
                      Receber no endereço acima via Transportadora Loggi
                    </Typography>
                    <RenderizadorDeImagem loggi="" width="25px" height="25px" />
                  </Stack>
                }
                sx={{ alignItems: "start" }} // Mantém alinhado corretamente
              />

              {/* Opção de retirada */}
              <FormControlLabel
                value="RETIRADA"
                control={<Radio />}
                label={
                  <Typography sx={{ color: "black" }}>
                    Retirar de outra forma
                  </Typography>
                }
              />
            </RadioGroup>

            <Stack marginTop={"5vh"}>
              <Typography variant="h6" color={"black"}> Forma de Pagamento </Typography>

              <RadioGroup value={formaDePagamento} onChange={(e) => setFormaDePagamento(e.target.value)}>
                <FormControlLabel
                  value="PIX"
                  control={<Radio />}
                  label={

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PixIcon sx={{ color: "black" }} />
                      <Typography sx={{ color: "black" }}>Pix</Typography>
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="SALDO"
                  disabled
                  control={<Radio />}
                  label={

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <RenderizadorDeImagem preto="true" width={"30px"} />
                      <Typography sx={{ color: "black" }}>Saldo na conta Kamanda</Typography>
                    </Stack>
                  }
                />
              </RadioGroup>

            </Stack>

          </Box>

          {/* Coluna 2 - Resumo da Compra */}
          <Stack sx={{ width: "50%", padding: 2, height: "100%" }} justifyContent="space-between">
            <Box>
              <Typography color={"black"} variant="h6" marginBottom={"20px"}>
                Resumo da Compra
              </Typography>
              {componentes?.length > 0 ? (
                <>
                  {componentes
                    .filter((item) => {

                      return formaEntrega == "CORREIO" || !item.frete
                    }) // Remove itens de frete se retirada alternativa for selecionada
                    .map((item, index) => (
                      <Typography color={"black"} key={index}>
                        {`${item.nome} - ${item.preco}`}
                      </Typography>
                    ))
                  }


                </>
              ) : (
                <Typography color={"black"}>Carregando...</Typography>
              )}
              {formaEntrega == "CORREIO" ? (
                <Typography color={"black"} variant="h6" sx={{ mt: 4 }}>
                  Total: {total}
                </Typography>

              ) : (
                <Typography color={"black"} variant="h6" sx={{ mt: 4 }}>
                  Total: {totalSemFrete}
                </Typography>
              )
              }

            </Box>

            <Button variant="contained" sx={{ alignSelf: "flex-end", mb: "5vh", mt: "auto" }} onClick={() => {
              prosseguir(formaDePagamento)
            }}>
              <Typography textTransform="none" variant="h6" color={"white"}>
                Prosseguir
              </Typography>
            </Button>
          </Stack>


        </Stack>

        <Rodape />

      </Stack>

      {/* Diálogo para alteração de endereço */}
      <Dialog open={dialogAberto} onClose={() => setDialogAberto(false)}>
        <DialogTitle>Alterar Endereço</DialogTitle>
        <DialogContent>
          <TextField label="Rótulo do endereço" value={rotuloAlteracaoDeEndereco} fullWidth sx={{ mb: 2 }} onChange={(e) => setRotuloAlteracaoDeEndereco(e.target.value)} />
          <TextField label="Logradouro" value={logradouroAlteracaoDeEndereco} fullWidth sx={{ mb: 2 }} onChange={(e) => { setLogradouroAlteracaoDeEndereco(e.target.value) }} />
          <TextField label="Número" value={numeroAlteracaoDeEndereco} fullWidth sx={{ mb: 2 }} onChange={(e) => { setNumeroAlteracaoDeEndereco(e.target.value) }} />
          <TextField label="Complemento" value={complementoAlteracaoDeEndereco} fullWidth sx={{ mb: 2 }} onChange={(e) => { setComplementoAlteracaoDeEndereco(e.target.value) }} />
          <TextField label="CEP" value={cepAlteracaoDeEndereco} fullWidth sx={{ mb: 2 }} onChange={(e) => { setCepAlteracaoDeEndereco(e.target.value) }} />
          <TextField label="Cidade" value={cidadeAlteracaoDeEndereco} fullWidth sx={{ mb: 2 }} onChange={(e) => { setCidadeAlteracaoDeEndereco(e.target.value) }} />
          <TextField label="Estado" value={estadoAlteracaoDeEndereco} fullWidth sx={{ mb: 2 }} onChange={(e) => { setEstadoAlteracaoDeEndereco(e.target.value) }} />
        </DialogContent>
        <DialogActions>


          <Button onClick={() => setDialogAberto(false)}><Typography textTransform={"none"}>Cancelar</Typography></Button>
          <Button variant="contained" onClick={() => editarEndereco()}><Typography textTransform={"none"}>Salvar</Typography></Button>
        </DialogActions>
      </Dialog>
      <Dialog open={primeiraCompra}
        disableEscapeKeyDown

        disablec
        onClose={() => { }}
      >
        <DialogTitle><Typography textAlign="center" fontSize={"20pt"}>Primeira Compra</Typography></DialogTitle>
        <DialogContent>
          <Stack direction={"column"}>
            <Typography textAlign={"center"} margin={"10px"} marginBottom={"40px"}>
              Antes de realizar sua primeira compra, você precisa informar sua localização, para isso, preencha os dados sobre seu enredeço
            </Typography>
          </Stack>

          <TextField label="Rótulo do endereço" value={rotulo} fullWidth sx={{ mb: 2 }} onChange={(e) => { setRotuloPrimeiraCompra(e.target.value) }} />
          <TextField label="Logradouro" value={logradouro} fullWidth sx={{ mb: 2 }} onChange={(e) => { setLogradouroPrimeiraCompra(e.target.value) }} />
          <TextField label="Número" value={numero} fullWidth sx={{ mb: 2 }} onChange={(e) => { setNumeroPrimeiraCompra(e.target.value) }} />
          <TextField label="Complemento" value={complemento} fullWidth sx={{ mb: 2 }} onChange={(e) => { setComplementoPrimeiraCompra(e.target.value) }} />
          <TextField label="CEP" value={cep} fullWidth sx={{ mb: 2 }} onChange={(e) => { setCepPrimeiraCompra(e.target.value) }} />
          <TextField label="Cidade" value={cidade} fullWidth sx={{ mb: 2 }} onChange={(e) => { setCidadePrimeiraCompra(e.target.value) }} />
          <TextField label="Estado" value={estado} fullWidth sx={{ mb: 2 }} onChange={(e) => { setEstadoPrimeiraCompra(e.target.value) }} />
        </DialogContent>

        <DialogActions>
          <Typography marginRight="40px" textTransform={`none`} color={"red"}>{erroDialogoPrimeiraCompra}</Typography>
          <Button variant="contained" onClick={() => {
            enviarPrimeiraCompra()
          }}><Typography textTransform={"none"} >Concluir</Typography></Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ResumoDaCompra;
