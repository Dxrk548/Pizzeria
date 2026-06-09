import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './Carrito.css';

export default function Carrito() {
  const { cart, addToCart, removeFromCart, getTotal } = useCart();
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  
  if (cart.length === 0) {
    return (
      <section className="carrito empty-cart">
        <h2>Tu Carrito</h2>
        <p>No hay pizzas en tu carrito</p>
      </section>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOpenFormModal = () => {
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleSubmit = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Por favor, completa todos los campos del formulario');
      return;
    }
    
    setConfirmedOrder({
      customer: { ...customerInfo },
      items: [...cart],
      total: getTotal()
    });
    
    setShowFormModal(false);
    setShowSuccessModal(true);
  };

  return (
    <section className="carrito">
      <h2>Tu Carrito</h2>
      <div className="cart-items">
        {cart.map((pizza) => (
          <div key={pizza.name} className="cart-item">
            <img src={pizza.img} alt={pizza.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{pizza.name} ({pizza.quantity})</h3>
              <p>${(pizza.price * pizza.quantity).toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => removeFromCart(pizza.name)}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity">{pizza.quantity}</span>
              <button 
                onClick={() => addToCart(pizza)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">
          <h3>Total:</h3>
          <p>${getTotal().toFixed(2)}</p>
        </div>
        <button onClick={handleOpenFormModal} className="pay-btn">
          Pagar Ahora
        </button>
      </div>

      {showFormModal && (
        <div className="modal-overlay" onClick={handleCloseFormModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseFormModal}>×</button>
            <h3 className="modal-title">Información de Entrega</h3>
            <form className="customer-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Dirección de entrega"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
              />
              <div className="modal-buttons">
                <button onClick={handleCloseFormModal} style={{ background: '#666' }}>
                  Cancelar
                </button>
                <button onClick={handleSubmit} className="pay-btn">
                  Confirmar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && confirmedOrder && (
        <div className="modal-overlay success-modal">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h2 className="success-title">¡Pedido realizado con éxito!</h2>
            
            <div className="order-summary">
              <h4>Datos del Cliente:</h4>
              <p><strong>Nombre:</strong> {confirmedOrder.customer.name}</p>
              <p><strong>Teléfono:</strong> {confirmedOrder.customer.phone}</p>
              <p><strong>Dirección:</strong> {confirmedOrder.customer.address}</p>
              
              <h4>Pizzas ordenadas:</h4>
              <div className="order-items">
                {confirmedOrder.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <h4>Total a pagar: ${confirmedOrder.total.toFixed(2)}</h4>
            </div>

            <div className="modal-buttons">
              <button onClick={handleCloseSuccessModal} className="pay-btn">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}