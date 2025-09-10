import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user email from localStorage (set on login/signup)
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    fetch(`http://localhost:5000/api/profile?email=${email}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-card p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            src={user.avatar || '/img/default-avatar.png'}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            {user.role && (
              <span className={`px-2 py-1 rounded text-xs ${
                user.role === 'admin'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <p className="bg-muted p-2 rounded">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <p className="bg-muted p-2 rounded">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
