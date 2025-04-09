import "./login-form.modules.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ambiente } from "../propriedades";
import { devIp } from "../propriedades";
import { prodIp } from "../propriedades";

function LoginForm() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [responseState, setResponseState] = useState(null); // Novo estado para armazenar a resposta do Axios
  let ip = "";
        if (ambiente == "dev") {
          ip = devIp;
        }
      
        if (ambiente == "prod") {
          ip = prodIp;
        }
  const getToken = async () => {
    try {
      const axiosInstance = axios.create({});
    
      const response = await axiosInstance.post(
        ip + "/api/v1/aut/autenticar",
        {
          email: usuario,
          password: senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.token);
      console.log(" resposta: " + response.data.estabelecimentoId);
      console.log(
        localStorage.setItem("token", "Bearer " + response.data.token)
        );
      localStorage.setItem("primeiroAcesso",response.data.primeiroAcesso)
      console.log(
        localStorage.setItem(
          "estabelecimentoId",
          response.data.estabelecimentoId
        )
      );
      setResponseState(response.data);
      const { token } = response.data.token;
      console.log(token);

      console.log(localStorage.getItem("token"));
      navigate("/estabelecimentos/inicio");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="formulario"
      onSubmit={(e) => {
        e.preventDefault();
        getToken();
      }}
    >
      <div className="form-img-backgroud">
        <h1>Ubuntu</h1>
      </div>
      <div className="campos">
        <input
          className="inputEmail input"
          placeholder="Usuario"
          minLength={3}
          name="usuario"
          type="text"
          maxLength={50}
          value={usuario}
          required
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          className="inputSenha input"
          placeholder="Senha"
          type="password"
          required
          minLength={3}
          maxLength={30}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <button className="botao-login">Login</button>
      <div className="botoes-pos-login">
        <button className="botao-esqueci-a-senha" onClick={() => {
          navigate("/estabelecimentos/esqueciasenha");
        }}>
          Esqueci minha senha
        </button>
        <button className="botao-cadastre-se" onClick={() =>{
          navigate("/estabelecimentos/cadastro");
        }}>Cadastre-se</button>
      </div>
    </form>
  );
}

export default LoginForm;
