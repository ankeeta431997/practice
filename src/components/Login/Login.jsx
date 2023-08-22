import React, { useState, useRef } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import './Login.css'
//import Input from "react-validation/build/input";
import AuthorizationService from "../../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    let navigate = useNavigate();
    // const form = useRef();
    // const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");            // New statefor error message

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError(""); // Reset error message before each login attempt

        AuthorizationService.login(username, password)
            .then(() => {
                navigate("/calculator");
                window.location.reload();
            })
            .catch((error) => {
                setError("Invalid credentials. Please try again."); //Set error message if login fails
            });
    };
    return (
        <div className="Auth-form-container">
            <form onSubmit={handleLogin} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                    <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            id="username"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    {error && (
                        <div className="alert alert-danger"
role="alert" id="message">
                            {error}
                        </div>
                    )}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Login;
