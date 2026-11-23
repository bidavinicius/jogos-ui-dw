import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ListJogo from "./components/ListJogo";
import AddJogo from "./components/AddJogo";
import UpdJogo from "./components/UpdJogo";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link to="/list" className="navbar-brand">
            🎮 Catálogo de Jogos
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/list" className="nav-link">Listar</Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">Adicionar</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4 conteúdo">
        <Routes>
          <Route path="/" element={<ListJogo />} />
          <Route path="/list" element={<ListJogo />} />
          <Route path="/add" element={<AddJogo />} />
          <Route path="/jogos/:id" element={<UpdJogo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;