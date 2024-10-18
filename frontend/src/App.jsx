import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/common/LoginForm';
import SignUpForm from './components/common/SignUpForm';
import { Driver } from './components/driver/Driver';
import User from './components/users/User';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpForm />} />

        <Route path="/driver/*" element={<Driver />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </Router>
  );
}
