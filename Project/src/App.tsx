import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/home/Home";
import { Statistic } from "./pages/statistic/Statistic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="statistic" element={<Statistic />} />
      </Route>
    </Routes>
  );
}

export default App;
