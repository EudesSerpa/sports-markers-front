import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>Not Found Page</h1>} />
    </Routes>
  );
}

export default App;
