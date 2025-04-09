import { createContext, useState, useEffect } from "react";

// Criando o contexto
export const CarrinhoContext = createContext();

// Criando o Provider (ViewModel)
export function InicioContext({ children }) {
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);
  const [carrinhoAberto, setCarrinhoAberto] = useState(true)

  // Atualiza o total sempre que os itens mudam
  useEffect(() => {
    const novoTotal = itens.reduce((acc, item) => acc + item.preco * item.qtd, 0);
    setTotal(novoTotal);
  }, [itens]);

  // Adiciona um item ao carrinho
  function adicionarItem(novoItem) {
    setItens((prevItens) => [...prevItens, novoItem]);
  }

  // Remove um item do carrinho
  function removerItem(id) {
    setItens((prevItens) => prevItens.filter((item) => item.id !== id));
  }
  
  return (
    <CarrinhoContext.Provider value={{ itens, total, adicionarItem, removerItem, carrinhoAberto,setCarrinhoAberto }}>
      {children}
    </CarrinhoContext.Provider>
  );
}