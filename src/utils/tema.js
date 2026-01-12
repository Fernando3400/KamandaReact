import { createTheme } from "@mui/material";

export const propiedadesDoTema = {
  palette: {
    primary: {
      main: "#222222"
    },
    secondary: {
      main: "#f4f4f6",
    },
    tertiary: {
      main: "#2d3142"
    },
    quaternary: {
      main: "#4F5D75"
    },
    quinary: {
      main: " #FF6B35"
    },
    primariaEstabelecimento: {
      main: '#4EBC52',
      contrastText: '#ffffff', // Cor do texto contrastante
    },
    secundariaEstabelecimento: {
      main: '#465750',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FF0000',
    },
    warning: {
      main: '#4287f5',
    },
    info: {
      main: '#2196F3',
    },

    success: {
      main: '#4EBC52',
    },
    text: {
      primary: '#000000', // cor do texto principal
      secondary: '#000000', // cor do texto secundário
    },
    background: {
      default: '#465750', // cor de fundo padrão
    },
    action: {
      active: '#4EBC52', // cor do ícone ativo
      hover: '#4EBC52', // cor do ícone ao passar o mouse
      selected: '#eeeeee', // cor do ícone selecionado
      disabled: '#dddddd', // cor do ícone desativado
    },
  },
};
export const tema = createTheme({
  palette: {
    primary: { main: "#222222" },
    secondary: { main: "#f4f4f6" },
    tertiary: { main: "#2d3142" },
    quaternary: { main: "#4F5D75" },
    quinary: { main: "#FF6B35" },
  },

  shadows: [
    "none",

    // 1️⃣ Cards leves (inputs, listas)
    "0px 4px 12px rgba(0,0,0,0.15)",

    // 2️⃣ Cards médios (formulários, modais pequenos)
    "0px 8px 20px rgba(0,0,0,0.25)",

    // 3️⃣ Cards principais (formulários, seções)
    "0px 12px 30px rgba(0,0,0,0.35)",

    // 4️⃣ Destaque máximo (modal, drawer)
    "0px 20px 50px rgba(0,0,0,0.45)",

    // preenche até 25 (MUI exige)
    ...Array(21).fill("0px 12px 30px rgba(0,0,0,0.35)"),
  ],
});
