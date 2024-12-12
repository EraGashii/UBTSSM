import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from "../services/Endpoint";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            const response = await post('/auth/login', value)
            const data = response.data
            if (response.status === 200) {
                navigate('/')
                toast.success(data.message)
                dispatch(SetUser(data.user))
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }    
    };

    return (
        <>
            <section className="bg-light">
                <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
                    <Link to="/" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
                        <img
                            className="me-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                            width="32"
                            height="32"
                        />
                        <span className="h4 mb-0 fw-bold">CodeByZahid</span>
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
