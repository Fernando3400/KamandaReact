import '../assets/style/terceira-secao.modules.css'
import  React  from 'react';
import { BotaoBaixeApp } from './BotaoBaixeApp';
import logo from '../assets/img/logo-ubuntu-store.jpeg'

function TerceiraSecao(){

    const classeCss = "terceira-secao-btn";

    return (
        <div>
          <section className="terceira-secao">
              <p className="terceira-secao-texto">
                  Baixe agora mesmo nosso aplicativo fácil de usar<br/>
                  e personalizado para suas necessidades e desfrute<br/>
                  de promoções exclusivas, rastreamento de pedidos<br/>
                  em tempo real e suporte ao cliente de qualidade.<br/>
                  Venha fazer parte do movimento de mudança social<br/>
                  e tecnológica da UbuntuStore e alimente a união<br/>
                  entre as pessoas.
              </p>
              <div className="baixar-app">
                <img className="logo" src={logo} alt="imagem de um celular com o aplicativo da UbuntuStore"/>
                <BotaoBaixeApp classeCss={classeCss} />
              </div>
          </section>  
        </div>
    );
}

export default TerceiraSecao;