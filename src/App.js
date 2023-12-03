import { Routes, Route } from "react-router-dom";
import CarsList from "./components/CarsList/CarsList";
import Home from "./components/Home/Home";

export const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CarsList />} />
        <Route path="/favorites" element={<CarsList />} />
      </Routes>
  );
};