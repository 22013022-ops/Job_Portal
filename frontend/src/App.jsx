import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function Home() {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // Quick refresh to update state
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px', padding: '20px' }}>
      <h1>💼 Job Portal Dashboard</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>Welcome! Find your dream job or hire top talent.</p>

      {token ? (
        <div style={{ padding: '20px', display: 'inline-block', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <h3>Hello, {userName}! 👋</h3>
          <p style={{ marginBottom: '15px' }}>Logged in as: <strong>{userRole}</strong></p>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Log Out
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/login" style={{ padding: '12px 24px', backgroundColor: 'var(--accent)', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
            Sign In
          </Link>
          <Link to="/register" style={{ padding: '12px 24px', border: '1px solid var(--border)', color: 'var(--text-h)', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
            Create Account
          </Link>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;