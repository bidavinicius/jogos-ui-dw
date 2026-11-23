import { useState } from "react";
import { Link } from "react-router-dom";
import JogoDataService from "../services/JogoDataService";

function AddJogo() {
  const jogoInicial = {
    titulo: "",
    plataforma: "",
    genero: "",
    ano: "",
  };

  const [jogo, setJogo] = useState(jogoInicial);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJogo({ ...jogo, [name]: value });
  };

  const saveJogo = () => {
    if (!jogo.titulo || !jogo.plataforma || !jogo.genero || !jogo.ano) {
      setErro("Preencha todos os campos.");
      return;
    }

    const data = {
      titulo: jogo.titulo,
      plataforma: jogo.plataforma,
      genero: jogo.genero,
      ano: Number(jogo.ano),
    };

    JogoDataService.create(data)
      .then((response) => {
        console.log("Jogo cadastrado:", response.data);
        setEnviado(true);
        setErro("");
      })
      .catch((e) => {
        console.error("Erro ao cadastrar jogo:", e);
        setErro("Erro ao cadastrar o jogo.");
      });
  };

  
  const newJogo = () => {
    setJogo(jogoInicial);
    setEnviado(false);
  };

  return (
    <div style={{ maxWidth: "450px", margin: "auto" }}>
      {enviado ? (
        <div>
          <h5>Jogo cadastrado com sucesso!</h5>
          <button className="btn btn-success me-2" onClick={newJogo}>
            Cadastrar outro
          </button>
          <Link to="/list" className="btn btn-secondary">
            Ver lista
          </Link>
        </div>
      ) : (
        <div>
          <h4>Novo jogo</h4>

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
              <option value="">Selecione...</option>
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

          {erro && <div className="alert alert-danger">{erro}</div>}

          <button className="btn btn-success" onClick={saveJogo}>
            Salvar
          </button>
        </div>
      )}
    </div>
  );
}

export default AddJogo;