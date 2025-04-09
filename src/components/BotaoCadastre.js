import "./botao-cadastre.modules.css";
import { useNavigate } from "react-router-dom";

function BotaoCadastre() {
  
  const navigate = useNavigate();
  function irParaCadastro() {
    navigate("/login");
  }

  return (
      <button
        className="botao-cadastre"
        onClick={()=> irParaCadastro()}>Cadastrar-se
      </button>
  );
}
export default BotaoCadastre;
