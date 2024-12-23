import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from "../services/Endpoint"; // Assuming this is where your post function is
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { SetUser } from '../redux/AutSlice'; // Importoni SetUser nga Redux Slice

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validimi i input-it
        if (!/\S+@\S+\.\S+/.test(value.email)) {
            toast.error('Invalid email format.');
            return;
        }

        try {
            const response = await post('/auth/login', value, { credentials: 'include' }); // Add credentials here
            const data = response.data;

            if (response.status === 200) {
                toast.success(data.message || 'Login successful!');
                dispatch(SetUser(data.user)); // Vendos përdoruesin në Redux
                navigate('/'); // Ridrejtoni pas login-it të suksesshëm
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Login failed, please try again.');
        }
    };

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
                            <h1 className="h5 mb-4 fw-bold text-dark">Sign in to your account</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="email"
                                        placeholder="name@company.com"
                                        required
                                        value={value.email}
                                        autoFocus // Autofocus on the email input
                                        aria-describedby="emailHelp"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        onChange={handleChange}
                                        value={value.password}
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="••••••••"
                                        required
                                        aria-describedby="passwordHelp"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Sign in</button>
                            </form>
                            <p className="mt-3 mb-0 text-muted">
                                Don’t have an account yet? <Link to="/register" className="text-primary">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
