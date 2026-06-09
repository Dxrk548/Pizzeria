import { useCart } from '../context/CartContext';
import './Lista.css';

const pizzas = [
  { name: "Pepperoni", img: "/images/pizza1.webp", price: 12.99 },
  { name: "Tropical", img: "/images/pizza2.jpeg", price: 13.99 },
  { name: "Mexicana", img: "/images/pizza3.webp", price: 14.99 },
];

export default function Lista() {
  const { addToCart } = useCart();
  return (
    <section className="pizzas">
      <h2>Selecciona tus pizzas</h2>
      <div className="pizza-grid">
        {pizzas.map((p, i) => (
          <div key={i} className="pizza-card">
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">${p.price.toFixed(2)}</p>
            <button onClick={() => addToCart(p)}>Agregar al Carrito</button>
          </div>
        ))}
      </div>
    </section>
  );
}
