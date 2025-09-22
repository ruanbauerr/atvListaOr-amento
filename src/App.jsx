import { useState } from "react";
import "./App.css";

function App() {
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [listaOrcamento, setListaOrcamento] = useState([]);

  const adicionarItem = () => {
    if (!descricao || !quantidade || !valorUnitario) return;

    const qtd = parseFloat(quantidade);
    const valor = parseFloat(valorUnitario);

    const novoItem = {
      descricao,
      quantidade: qtd,
      valorUnitario: valor,
      total: qtd * valor,
    };
    setListaOrcamento([...listaOrcamento, novoItem]);

    setDescricao("");
    setQuantidade("");
    setValorUnitario("");
  };

  const removerItem = (index) => {
    const novaLista = listaOrcamento.filter((_, i) => i !== index);
    setListaOrcamento(novaLista);
  };

  const totalGeral = listaOrcamento.reduce((acc, item) => acc + item.total, 0);

  return (
    <>
      <div className="itensAdicionais">
        <h2>Orçamento</h2>
        <div className="input-decricao">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="input-quantidade">
          <input
            type="number"
            min = "0"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>
        <div className="input-valorUnitario">
          <input
            type="number"
            placeholder="Valor unitario"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(e.target.value)}
          />
        </div>

        <div>
          <button className="add-btn" onClick={adicionarItem}>
            +
          </button>
        </div>
        
     
      {listaOrcamento.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Qtd</th>
              <th>Unitário</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaOrcamento.map((item, index) => (
              <tr key={index}>
                <td>{item.descricao}</td>
                <td>{item.quantidade}</td>
                <td>R$ {item.valorUnitario.toFixed(2)}</td>
                <td>
                  <strong>R$ {item.total.toFixed(2)}</strong>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => removerItem(index)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
      {listaOrcamento.length > 0 && (
        <div className="total-geral">
          <strong>Total Geral: R$ {totalGeral.toFixed(2)}</strong>
        </div>
      )}
      </div>
    </>
  );
}

export default App;
