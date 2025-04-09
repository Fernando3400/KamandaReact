import { Button } from "@mui/material";
import "./botao-login.modules.css";
import { useNavigate } from "react-router-dom";

function BotaoLogin() {
  
  const navigate = useNavigate();
  function irParaLogin() {
    navigate("/login");
  }

  return (
      <Button  onClick={()=>irParaLogin()}>Login</Button>
  );
}
export default BotaoLogin;
