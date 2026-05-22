import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Job Portal Home</h1>
                <p>Welcome! Find your dream job or hire top talent.</p>
            </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;