import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [userStats, setUserStats] = useState({
    orders: 0,
    bookmarks: 0,
    totalSpent: 0,
    lastOrderDate: 'No orders yet',
  });

  useEffect(() => {
    // Fetch real user stats from localStorage or API
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      // For now, get orders from localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = orders.filter((order: any) => order.email === userEmail);
      
      const totalSpent = userOrders.reduce((sum: number, order: any) => {
        return sum + (order.product?.price || 0);
      }, 0);

      const lastOrder = userOrders.length > 0 ? userOrders[userOrders.length - 1] : null;
      const lastOrderDate = lastOrder ? new Date(lastOrder.createdAt).toLocaleDateString() : 'No orders yet';

      setUserStats({
        orders: userOrders.length,
        bookmarks: 0, // TODO: Implement bookmarks feature
        totalSpent,
        lastOrderDate,
      });
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-primary">{userStats.orders}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Bookmarks</h3>
          <p className="text-3xl font-bold text-primary">{userStats.bookmarks}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-primary">${userStats.totalSpent.toFixed(2)}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Last Order</h3>
          <p className="text-3xl font-bold text-primary">{userStats.lastOrderDate}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="space-y-3">
            <Link to="/orders">
              <button className="w-full text-left p-3 bg-muted rounded hover:bg-accent">
                View Orders
              </button>
            </Link>
            <Link to="/bookmarks">
              <button className="w-full text-left p-3 bg-muted rounded hover:bg-accent">
                View Bookmarks
              </button>
            </Link>
            <Link to="/profile">
              <button className="w-full text-left p-3 bg-muted rounded hover:bg-accent">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">Last order placed on {userStats.lastOrderDate}</p>
            <p className="text-muted-foreground">You have {userStats.bookmarks} bookmarked products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
