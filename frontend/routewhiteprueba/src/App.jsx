import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio";
import Rutas from "./pages/rutas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/rutas" element={<Rutas />} />
        {/* Agrega más rutas si lo deseas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
