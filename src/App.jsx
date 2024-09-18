import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateListing from "./pages/CreateListing/CreateListing";
import Listing from "./pages/Listing/Listing";
import { AnimatePresence } from "framer-motion";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <AnimatePresence>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/listing/:id" element={<Listing />} />
          </Routes>
        </Router>
      </AnimatePresence>
    </div>
  );
}

export default App;
