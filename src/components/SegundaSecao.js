import '../assets/style/segunda-secao.modules.css'
import React from 'react';
import tecnologia from '../assets/img/tecnologia.png';

export function SegundaSecao(){
  return (
      <div className="segunda-secao">
        <img src={tecnologia} className="imagens-segunda-secao" alt="Tecnologia" />
        <div className="segunda-secao-content">
          <h2>Tecnologia e Comunidade</h2>
          <p>
              Além de oferecer alimentos deliciosos,<br/>
              nosso ideal é conectar as pessoas através<br/>
              da tecnologia, e transformar o mercado<br/>
              de apps de delivery.     
          </p>
          <a href="www">Saiba mais</a>
        </div>
      </div>
    );

}