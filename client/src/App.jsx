import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import { createContext, useState } from "react";
import Dashboard from "./pages/dashboard";

export const RecordsContext = createContext();

function App() {
  const [records, setRecords] = useState([]);

  const updateRecords = (newRecords) => {
    setRecords(newRecords);
  };
  return (
    <Router>
      <div className="app">
        <RecordsContext.Provider value={{ records, updateRecords }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </RecordsContext.Provider>
      </div>
    </Router>
  );
}

export default App;
