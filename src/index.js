import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/style/index.css";
import App from "./components/App";
import Estabelecimento from "./components/Estabelecimento";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import MinhaLoja from "./components/MinhaLoja";
import Produtos from "./components/Produtos";
import EditarItemCardapio from "./components/EditarItemCardapio";
import Cadastro from "./components/Cadastro.js";
import EsqueciminhaSenha from "./components/EsqueciMinhaSenha";

import Entregas from "./components/Entregas.js";
import Pedidos from "./components/Pedidos";
import HomeEstabelecimento from "./components/HomeEstabelecimento";
import DetalheDePedido from "./components/DetalheDePedido";
import PoliticaDePrivacidade from "./components/PoliticaDePrivacidade";
import ExcluirConta from "./components/ExcluirConta.js";
import Publicar from "./components/Publicar.js";
import ResumoDaCompra from "./components/ResumoDaCompra.js";
import Leitura from "./components/Leitura.js";
import MeusPedidos from "./components/MeusPedidos.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <App />
  },
  {
    path: "/entrega",
    element: <ResumoDaCompra />
  },
  {
    path: "/estabelecimentos",
    element: <Estabelecimento />,
  },
  {
    path: "/portal/login",
    element: <Login />,
  },
  {
    path: "/portal/estabelecimentos/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/portal/estabelecimentos/esqueciasenha",
    element: <EsqueciminhaSenha />,
  },
  {
    path: "/portal/estabelecimentos/inicio",
    element: <HomeEstabelecimento />,
  },
  {
    path: "/portal/estabelecimentos/minhaloja",
    element: <MinhaLoja />,
  },
  {
    path: "/portal/estabelecimentos/produtos",
    element: <Produtos />,
  },
  {
    path: "/portal/estabelecimentos/produto/edicao",
    element: <EditarItemCardapio />,
  },
  {
    path: "/estabelecimentos/esqueciasenha",
    element: <EsqueciminhaSenha />,
  },

  {
    path: "/portal/estabelecimentos/pedidos",
    element: <Pedidos />,
  },
  {
    path: "/portal/estabelecimentos/pedidos/detalhes",
    element: <DetalheDePedido />,
  },
  {
    path: "/pp",
    element: <PoliticaDePrivacidade />,
  },
  {
    path: "/excluir",
    element: <ExcluirConta />
  },
  {
    path: "/portal/estabelecimentos/entregas",
    element: <Entregas />,
  },
  {
    path: "/portal/jornalista/publicar",
    element: <Publicar />,
  },
  {
    path: "/noticias/leitura",
    element: <Leitura/>,
  },
  {
    path: "/loja/meuspedidos",
    element: <MeusPedidos/>,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
