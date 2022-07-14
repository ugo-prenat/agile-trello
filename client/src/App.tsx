import { Route, Routes } from "react-router-dom";

import { Board as BoardPage } from "./pages/board/Board";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/board/:id' element={<BoardPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
