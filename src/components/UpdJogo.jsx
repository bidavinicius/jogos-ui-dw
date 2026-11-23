import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import JogoDataService from "../services/JogoDataService";

function UpdJogo() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [jogo, setJogo] = useState(null);
  const [mensagem, setMensagem] = useState("");

  
  useEffect(() => {
    JogoDataService.get(id)
      .then((response) => {
        setJogo(response.data);
      })
      .catch((e) => {
        console.error("Erro ao buscar jogo:", e);
        setMensagem("Jogo não encontrado.");
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJogo({ ...jogo, [name]: value });
    setMensagem("");
  };

  const updateJogo = () => {
    const data = { ...jogo, ano: Number(jogo.ano) };

    JogoDataService.update(jogo.id, data)
      .then(() => {
        setMensagem("Jogo atualizado com sucesso!");
      })
      .catch((e) => {
        console.error("Erro ao atualizar jogo:", e);
        setMensagem("Erro ao atualizar o jogo.");
      });
  };

  const deleteJogo = () => {
    if (window.confirm("Tem certeza que deseja excluir este jogo?")) {
      JogoDataService.delete(jogo.id)
        .then(() => {
          navigate("/list");
        })
        .catch((e) => {
          console.error("Erro ao excluir jogo:", e);
          setMensagem("Erro ao excluir o jogo.");
        });
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "auto" }}>
      {jogo ? (
        <div>
          <h4>Editar jogo</h4>

          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              name="titulo"
              value={jogo.titulo}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="plataforma" className="form-label">Plataforma</label>
            <select
              className="form-select"
              id="plataforma"
              name="plataforma"
              value={jogo.plataforma}
              onChange={handleInputChange}
            >
              <option>PC</option>
              <option>PlayStation 4</option>
              <option>PlayStation 5</option>
              <option>Xbox Series X|S</option>
              <option>Nintendo Switch</option>
              <option>Mobile</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <input
              type="text"
              className="form-control"
              id="genero"
              name="genero"
              value={jogo.genero}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ano" className="form-label">Ano de lançamento</label>
            <input
              type="number"
              className="form-control"
              id="ano"
              name="ano"
              value={jogo.ano}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-success me-2" onClick={updateJogo}>
            Atualizar
          </button>
          <button className="btn btn-danger" onClick={deleteJogo}>
            Excluir
          </button>

          {mensagem && <p className="mt-3">{mensagem}</p>}
        </div>
      ) : (
        <p>{mensagem || "Carregando..."}</p>
      )}

      <div className="mt-3">
        <Link to="/list">Voltar para a lista</Link>
      </div>
    </div>
  );
}

export default UpdJogo;