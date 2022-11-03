import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Menu from "./components/menu/menu";
import About from "./pages/about";
import Argentina from "./pages/argentina";
import Austria from "./pages/austria";
import France from "./pages/france";
import Home from "./pages/home";
import Japan from "./pages/japan";
import NewZealand from "./pages/new-zealand";
import Random from "./pages/random";
import Spain from "./pages/spain";
function App() {
  return (
    <div className="App">
      <Menu />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/japan" element={<Japan />} />
          <Route path="/austria" element={<Austria />} />
          <Route path="/new-zealand" element={<NewZealand />} />
          <Route path="/spain" element={<Spain />} />
          <Route path="/france" element={<France />} />
          <Route path="/random" element={<Random />} />
          <Route path="/argentina" element={<Argentina />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
