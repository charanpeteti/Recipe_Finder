import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

function UserAuth() {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <p>Logged in as: {currentUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>{isLogin ? "Login" : "Signup"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLogin ? "Login" : "Signup"}</button>
          </form>
          <button onClick={toggleAuthMode}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default UserAuth;