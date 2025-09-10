import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartProduct } from './CartContext';

export interface Order {
  _id: string;
  status: 'pending' | 'delivered';
  createdAt: string;
  totalAmount: number;
  items: { product: CartProduct; quantity: number }[];
}

interface OrdersContextType {
  orders: Order[];
  placeOrder: (product: CartProduct) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within an OrdersProvider');
  return context;
};

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (product: CartProduct) => {
    const newOrder: Order = {
      _id: Math.random().toString(36).slice(2, 10),
      status: 'pending',
      createdAt: new Date().toISOString(),
      totalAmount: product.price * product.quantity,
      items: [{ product, quantity: product.quantity }],
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
