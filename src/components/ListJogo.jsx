
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JogoDataService from "../services/JogoDataService";

function ListJogo() {
  const [jogos, setJogos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    JogoDataService.getAll()
      .then((response) => {
        setJogos(response.data);
      })
      .catch((e) => {
        console.error("Erro ao buscar jogos:", e);
        setErro("Não foi possível carregar os jogos. Verifique se a API está rodando (npm run mock).");
      });
  }, []);

  return (
    <div>
      <h4>Jogos cadastrados</h4>

      {erro && <div className="alert alert-danger">{erro}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Plataforma</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jogos.length > 0 ? (
            jogos.map((jogo) => (
              <tr key={jogo.id}>
                <td>{jogo.titulo}</td>
                <td>{jogo.plataforma}</td>
                <td>{jogo.genero}</td>
                <td>{jogo.ano}</td>
                <td>
                  <Link to={"/jogos/" + jogo.id} className="btn btn-sm btn-warning">
                    Editar
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum jogo encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListJogo;