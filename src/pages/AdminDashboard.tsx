import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ADMIN_TOKEN_KEY = 'ntrisha_admin_token';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 7, // Static for now since products are hardcoded
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [adminToken, setAdminToken] = useState(localStorage.getItem(ADMIN_TOKEN_KEY) || '');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Admin login handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setAdminToken(data.token);
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('Network error');
    }
    setLoading(false);
  };

  // Fetch users and stats if authenticated
  useEffect(() => {
    if (!adminToken) return;
    setLoading(true);
    fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Admin users response:', data);
        if (Array.isArray(data)) {
          setUsers(data);
          setStats(prevStats => ({
            ...prevStats,
            totalUsers: data.length
          }));
        } else {
          console.error('Expected array but got:', data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [adminToken]);

  // Fetch orders and update stats if authenticated
  useEffect(() => {
    if (!adminToken) return;
    fetch('/api/admin/orders', {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
          const totalRevenue = data.reduce((sum: number, order: any) => sum + (order.product?.price || 0), 0);
          setStats(prevStats => ({
            ...prevStats,
            totalOrders: data.length,
            totalRevenue,
          }));
        }
      });
  }, [adminToken]);

  if (!adminToken) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" className="w-full p-2 border rounded" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input type="password" className="w-full p-2 border rounded" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
          </div>
          {loginError && <div className="text-red-500">{loginError}</div>}
          <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded font-semibold" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button className="mb-4 text-sm underline text-red-500" onClick={() => { setAdminToken(''); localStorage.removeItem(ADMIN_TOKEN_KEY); }}>Logout</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalProducts}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalOrders}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-primary">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {loading ? <p>Loading users...</p> : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-2 py-1">Name</th>
                    <th className="px-2 py-1">Email</th>
                    <th className="px-2 py-1">Address</th>
                    <th className="px-2 py-1">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className="px-2 py-1">{user.name}</td>
                      <td className="px-2 py-1">{user.email}</td>
                      <td className="px-2 py-1">{user.address}</td>
                      <td className="px-2 py-1">{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && <p className="text-muted-foreground mt-2">No users found.</p>}
            </div>
          )}
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <p className="text-muted-foreground">No orders found.</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-2 py-1">Product</th>
                    <th className="px-2 py-1">Name</th>
                    <th className="px-2 py-1">Email</th>
                    <th className="px-2 py-1">Address</th>
                    <th className="px-2 py-1">Phone</th>
                    <th className="px-2 py-1">Price</th>
                    <th className="px-2 py-1">Status</th>
                    <th className="px-2 py-1">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td className="px-2 py-1">{order.product?.name || '-'}</td>
                      <td className="px-2 py-1">{order.name}</td>
                      <td className="px-2 py-1">{order.email}</td>
                      <td className="px-2 py-1">{order.address}</td>
                      <td className="px-2 py-1">{order.phone}</td>
                      <td className="px-2 py-1">${order.product?.price?.toFixed(2) || '-'}</td>
                      <td className="px-2 py-1">{order.status}</td>
                      <td className="px-2 py-1">{order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
