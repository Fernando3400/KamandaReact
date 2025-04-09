import "./botao-enviar.modules.css";
import { useNavigate } from "react-router-dom";

function BotaoCadastrarProduto() {
  
  const navigate = useNavigate();
  function irParaLogin() {
    navigate("/estabelecimentos/cardapio/edicao");
  }
  
  return (
      <button className="botao-enviar"  onClick={()=>irParaLogin()}>Enviar</button>
  );
}
export default BotaoCadastrarProduto;
