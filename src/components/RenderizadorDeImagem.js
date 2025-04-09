import React, { useEffect, useState } from "react";
import logoUbuntuStore from "../assets/img/logo.png";
import kamanda from "../assets/img/Logo Kamanda.png";
import loggi from "../assets/img/Logo Loggi.png";
import "./renderizadorDeImagem.css";

const RenderizadorDeImagem = (props) => {
  const [imagem, setImagem] = useState();
  useEffect(() => {
    setImagem(props.imagem)
  })
  
  if(props.loggi!= null){
    return (
      <img style={{ borderRadius: "50%", paddingTop: "7px" }}  src={loggi} width={props.width} height={props.height} />
    );
  }
  if(props.preto== "true" && imagem == null){
    return (
      <img src={kamanda} width={props.width} height={props.height} />
    );
  }
  
  if (props.usarRecursos == "true") {
    return (
      <img width={props.width}
        height={props.height}
        src={props.imagem}
      />
    );
  } else if (imagem != null && props.arredondado!=null) {
    return (
      <img 
      style={{ borderRadius: "50%", paddingTop: "7px" }}
      width={props.width}
        height={props.height}
        src={`data:image/jpeg;base64,${props.imagem}`}
      />
    );
  } else if (imagem != null) {
    return (
      <img width={props.width}
        height={props.height}
        src={`data:image/jpeg;base64,${props.imagem}`}
      />
    );
  } else {
    return (
      <img src={logoUbuntuStore} width={props.width} height={props.height} />
    );
  }
};



export default RenderizadorDeImagem;
