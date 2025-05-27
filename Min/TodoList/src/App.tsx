import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todo from "./pages/TodoList/Todo";
import { ThemeProvider } from "./06-useContext/context/ThemeProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Todo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;