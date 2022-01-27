import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./Components/CreateUser/CreateUser";
import ListUser from "./Components/ListUser/ListUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<CreateUser />} />
          <Route path="/list-user" exact element={<ListUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
