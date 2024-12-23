import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import logo from '../assets/ubt.png'; // Import the logo image

export default function Register() {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To track loading state

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        email: value.email,
        password: value.password,
      });

      if (response.data.message === 'User created successfully') {
        alert('Registration successful!');
        // Redirect to login page or home page after successful registration
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false); // End loading
    }
  };
///testt
  return (
    <>
      <section className="bg-light">
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
          <Link to="/" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
            <img
              className="me-2"
              src={"src/assets/ubt.png"} // Use the imported logo image here
              alt="logo"
              width="82"
              height="62"

            />
            <span className="h4 mb-0 fw-bold">UBTSSM</span>
          </Link>
          <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
            <div className="card-body p-4">
              <h1 className="h5 mb-4 fw-bold text-dark">Create your account</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                    placeholder="name@company.com"
                    required
                    value={value.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={value.password}
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Signing up...' : 'Sign up'}
                </button>
              </form>
              <p className="mt-3 mb-0 text-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
