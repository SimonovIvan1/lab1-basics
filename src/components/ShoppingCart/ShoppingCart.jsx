import React, { useState } from 'react';
import './ShoppingCart.css';

function ShoppingCart() {
  const [cart, setCart] = useState({
    items: [
      { id: 1, name: 'Ноутбук', price: 45000, quantity: 1, category: 'Электроника' },
      { id: 2, name: 'Мышь', price: 1500, quantity: 2, category: 'Электроника' },
      { id: 3, name: 'Клавиатура', price: 3000, quantity: 1, category: 'Электроника' },
    ],
    discount: 10,
    shippingCost: 500,
    currency: '₽'
  });

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setCart(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
      return;
    }

    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    }));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Товар ${cart.items.length + 1}`,
      price: Math.floor(Math.random() * 10000) + 1000,
      quantity: 1,
      category: 'Разное'
    };

    setCart(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const clearCart = () => {
    setCart(prev => ({
      ...prev,
      items: []
    }));
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * cart.discount) / 100;
    return subtotal - discountAmount + cart.shippingCost;
  };

  const updateDiscount = (newDiscount) => {
    setCart(prev => ({
      ...prev,
      discount: Math.min(100, Math.max(0, newDiscount))
    }));
  };

  return (
    <div className="shopping-cart">
      <h3>🛒 Корзина покупок</h3>
      
      <div className="cart-controls">
        <button onClick={addItem} className="btn-add-item">
          + Добавить товар
        </button>
        <button onClick={clearCart} className="btn-clear">
          Очистить корзину
        </button>
      </div>

      <div className="cart-items">
        {cart.items.length === 0 ? (
          <p className="empty-cart">Корзина пуста</p>
        ) : (
          cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <span className="item-category">{item.category}</span>
              </div>
              
              <div className="item-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="btn-quantity"
                >
                  -
                </button>
                <span className="item-quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="btn-quantity"
                >
                  +
                </button>
              </div>
              
              <div className="item-price">
                {item.price * item.quantity} {cart.currency}
              </div>
              
              <button 
                onClick={() => updateQuantity(item.id, 0)}
                className="btn-remove"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Товары ({cart.items.length} шт.):</span>
          <span>{calculateSubtotal()} {cart.currency}</span>
        </div>
        
        <div className="summary-row">
          <span>
            Скидка ({cart.discount}%):
            <input
              type="range"
              min="0"
              max="50"
              value={cart.discount}
              onChange={(e) => updateDiscount(parseInt(e.target.value))}
              className="discount-slider"
            />
          </span>
          <span>-{(calculateSubtotal() * cart.discount) / 100} {cart.currency}</span>
        </div>
        
        <div className="summary-row">
          <span>Доставка:</span>
          <span>{cart.shippingCost} {cart.currency}</span>
        </div>
        
        <div className="summary-row total">
          <span>Итого:</span>
          <span>{calculateTotal()} {cart.currency}</span>
        </div>
      </div>

      <div className="cart-stats">
        <div className="stat">
          <span>Товаров:</span>
          <span>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div className="stat">
          <span>Позиций:</span>
          <span>{cart.items.length}</span>
        </div>
        <div className="stat">
          <span>Скидка:</span>
          <span>{cart.discount}%</span>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;