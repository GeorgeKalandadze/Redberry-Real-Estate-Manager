import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateListing from "./pages/CreateListing/CreateListing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
