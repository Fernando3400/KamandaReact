import { Button, Typography,useTheme } from '@mui/material';
import teste from '../assets/img/teste.png';
import "../assets/style/botao-baixe-app.modules.css"

export function BotaoBaixeApp() {
    const tema = useTheme();
    return (
        <>
          <Button
            size="large"
            className="meuBotao"
            variant="contained"
            href="https://play.google.com/store/apps/details?id=br.com.ubuntu"
            sx={{ 
                backgroundColor: tema.palette.secondary?.dark || "#555555", // Usa um fallback caso undefined
                "&:hover": { backgroundColor: tema.palette.secondary?.main || "#777777" } // Ajusta o hover
            }}
        >
            <Typography
                color="white"
                variant="h4"
                textTransform="none"
            >
                Baixe o app na Play Store
            </Typography>
        </Button>
        </>
    );
}
