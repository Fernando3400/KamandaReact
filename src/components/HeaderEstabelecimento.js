import "./header-estabelecimento.modules.css";
import { useNavigate } from "react-router-dom";
import logoUbuntuStore from "../assets/img/novo-logo-ubuntu.png";
import { AppBar,Toolbar, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {propiedadesDoTema} from "../utils/tema"


function HeaderEstabelecimento( ) {
  let l = true;
  if (l === true) {
    l = true;
  }

  const navigate = useNavigate();
  const  irParaHome= () => {
    navigate("/estabelecimentos/inicio");
  }

  return (
    <AppBar position="static" style={{backgroundColor: propiedadesDoTema.palette.primariaEstabelecimento.main}}>
        <Toolbar>
        {l && (
          <IconButton onClick={irParaHome} sx={{ backgroundColor: "",} }>
            <img
              className="ubuntu-store-logo"
              src={logoUbuntuStore}
              onClick={irParaHome}
              alt="Logo da empresa UbuntuStore"
            />
          </IconButton>
        )}
        </Toolbar>
      
    </AppBar>
  );
}
export default HeaderEstabelecimento;
