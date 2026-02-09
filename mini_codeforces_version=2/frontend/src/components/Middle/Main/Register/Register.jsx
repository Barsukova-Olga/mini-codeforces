import React, { useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = ({setLogin}) => {

    const loginInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const [error, setError] = useState('')

    const router = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault()
        const login = loginInputRef.current.value
        const password = passwordInputRef.current.value

        if (login.trim().length === 0 || password.length === 0) {
            setError('Password or login could not be empty')
            return
        }
        if (!login.match(/^[a-z]+$/)) {
            setError('Login can contain only latin characters')
            return
        }
        if (login.length < 3 || login.length > 16) {
            setError("Login length must be between 3 and 16")
            return
        }
        if (password.length > 32) {
            setError("password length must be between 1 and 32")
            return
        }

        axios.post("/api/users", {
            login: login,
            password: password
        }).then((response)=>{
            const jwt = response.data
            localStorage.setItem("users", jwt)
            axios.get("/api/users", {
                params: {
                    jwt: jwt
                }
            }).then((response)=>{

                setLogin(login)
                router("/");
            }).catch((error)=>{
                console.log(error)
            })
        }).catch((error)=>{
            setError(error.response.data)
        })
    }

    return (
        <div className="registration form-box">
            <div className="header">Register</div>
            <div className="body">
                <form method="post" action="" onSubmit={handleSubmit}>
                    <input type="hidden" name="action" value="register"/>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="login">Login</label>
                        </div>
                        <div className="value">
                            <input
                                autoFocus
                                id="login"
                                name="login"
                                ref={loginInputRef}
                                onChange={() => setError(null)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="name">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="value">
                            <input
                                name="password"
                                type="password"
                                ref={passwordInputRef}
                                onChange={() => setError(null)}
                            />
                        </div>
                    </div>
                    {error
                        ? <div className={'error'}>{error}</div>
                        : null
                    }
                    <div className="button-field">
                        <input type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;