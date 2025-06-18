import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio";
import Rutas from "./pages/Rutas";
import Registro from "./pages/registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/rutas" element={<Rutas />} />
        <Route path="/registro" element={<Registro />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
