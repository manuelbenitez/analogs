import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Menu from "./components/menu/menu";
import Austria from "./pages/austria";
import Home from "./pages/home";
import Japan from "./pages/japan";
import NewZealand from "./pages/new-zealand";
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
          <Route path="/spain" element={<Japan />} />
          <Route path="/random" element={<Japan />} />
          <Route path="/argentina" element={<Japan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
