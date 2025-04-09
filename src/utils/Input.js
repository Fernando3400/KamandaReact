import '../assets/style/input.modules.css';
import { useState } from "react";


function Input(props) {
  const  [acao, setAcao] = useState('')

  const placeholder = props.placeholder;
  const name = props.name;  
  const value = props.value;
  const nomeClasse = props.nomeClasse;
  const type = props.type;
  const isDescricao = props.isDescricao;  

  if (isDescricao) {
    return (
     <textarea className={nomeClasse} placeholder={placeholder}>

    </textarea>
    );
  }
  else {
    return <input 
            type={type}
            placeholder={placeholder}
            className={nomeClasse}
            name={name} value={value}
            onChange={(e)=> {
              setAcao(e.target.value)
            }}/>
  }
}
export default Input;
