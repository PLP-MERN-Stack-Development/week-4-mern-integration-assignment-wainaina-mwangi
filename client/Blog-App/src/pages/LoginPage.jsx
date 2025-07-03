// client/src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../Components/LoginForm'; // Import the LoginForm component

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate('/'); // Redirect to home page on successful login
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page py-6">
      <LoginForm onSubmit={handleLogin} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}
export default LoginPage;