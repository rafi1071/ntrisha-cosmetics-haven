import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrders } from '@/contexts/OrdersContext';

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { placeOrder } = useOrders();
  const product = location.state?.product;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  if (!product) {
    return <div className="container mx-auto px-4 py-8">No product selected for order.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Place order with user info and product
    placeOrder({ ...product });
    navigate('/orders');
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Order Product (Cash on Delivery)</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 border rounded"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold">
            Place Order (Cash on Delivery)
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
