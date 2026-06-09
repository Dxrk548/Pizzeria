import React from "react";
import Header from "./components/Header";
import Carrusel from "./components/Carrusel";
import Lista from "./components/Lista";
import Carrito from "./components/Carrito";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import "./components/App.css";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Carrusel />
        <Lista />
        <Carrito />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
