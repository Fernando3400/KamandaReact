import React  from 'react';
import '../assets/style/footer.modules.css'
import place from '../assets/img/place.png'
import predio from '../assets/img/predio.png'
import tellphone from '../assets/img/tellphone.png'

function Rodape(){
    return (
        <div>
            <footer>
                <div className="rodape1">
                    <div className="rodape1-content-1">
                        <h4 className="texto">Contato</h4>
                        {/* <div className="rodape-container">
                            <img className="icones" src={place} alt="Localização"/>
                            <p>Rua Fictícia dddDas Quantas, Bairro Alegria, SP, 88888-000</p>
                        </div> */}
                        <div className="rodape-container">
                            <img className="icones" src={tellphone} alt="Telefone"/>
                            <p className="texto">(011) 91072-1677</p>
                        </div>                    
                        <div className="rodape-container">
                            <img className="icones" src={predio} alt="Prédio"/>
                            <p className="texto" >09:00 às 18:00 Segunda-Feira - Sexta-Feira </p>
                        </div>
                        </div>
                    </div>
            </footer>
            <footer className="footer-container-2">
                <div className="rodape2">
                    <p>&copy;Kamanda - 2025</p>
                </div>
            </footer>
        </div>
    );
}

export default Rodape;