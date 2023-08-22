import React, { useState, useRef } from "react";
import './Register.css';
import { isEmail } from "validator";
import AuthorizationService from "../../services/auth.service";
import { Navigate, useNavigate } from 'react-router-dom';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
      
    }
};
const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
const Register = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState([]);
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    // const handleRoleChange = (e) => {
    //     const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
    //     setRole(selectedRoles);
    // };
    const handleRoleChange = (e) => {
        if (e.target.type === "checkbox") {
          const value = e.target.value;
          const checked = e.target.checked;
          setRole((prevRoles) =>
            checked ? [...prevRoles, value] : prevRoles.filter((role) => role !== value)
          );
        } else if (e.target.type === "select-multiple") {
          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
          setRole(selectedOptions);
        }
      };

    const handleSubmit = (e) => {

        console.log(username, email, role, password);
        e.preventDefault();
        AuthorizationService.register(username, email, role, password)
            // Perform registration logic here
            .then(() => {
                setSuccessful(true);
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h2>Register</h2>
            {successful && (
                <div className="alert alert-success" role="alert">
                    Registration successful!
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                    />
                    {vusername(username)}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                    />
                    {validEmail(email)}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                    />
                    {vpassword(password)}
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role</label>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="admin"
                                checked={role.includes("admin")}
                                onChange={handleRoleChange}
                            />
                            Admin
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="user"
                                checked={role.includes("user")}
                                onChange={handleRoleChange}
                            />
                            User
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="mod"
                                checked={role.includes("mod")}
                                onChange={handleRoleChange}
                            />
                            Moderator
                        </label>
                    </div>

                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );

};
export default Register;  