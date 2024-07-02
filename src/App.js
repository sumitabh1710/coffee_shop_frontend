import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import "./App.css";
import CoffeeShop from "./component/coffeeShop/CoffeeShop";
import Home from "./component/home/Home";
import Navbar from "./component/navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App w-screen raleway-font min-h-screen">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shop/:id" element={<CoffeeShop />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
