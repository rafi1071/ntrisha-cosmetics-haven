

import { useOrders } from '@/contexts/OrdersContext';

const Orders = () => {
  const { orders } = useOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-card p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Order #{order._id.slice(-6)}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  order.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-2">
                <p className="font-medium">Items:</p>
                <ul className="list-disc pl-5">
                  {order.items.map((item: any) => (
                    <li key={item.product.id}>
                      {item.product.name} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 font-semibold">
                Total: ${order.totalAmount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

