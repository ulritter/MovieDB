import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Input from './form-components/Input';
import Alert from './ui-components/Alert';

function LoginFunc(props) {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [alert, setAlert] = useState({ type: "d-none", message: "" });


    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (email === "") {
            errors.push("email");
        }
        if (password === "") {
            errors.push("password");
        }

        setErrors(errors);
        if (errors.length > 0) {
            return false;
        }
        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());
        console.log(payload);

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
        }

        fetch(`${process.env.REACT_APP_API_URL}/v1/signin`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setAlert({type: "alert-danger", message: "Invalid login", });
                } else {
                    console.log(data);
                    handleJWTChange(Object.values(data)[0]);
                    window.localStorage.setItem("jwt", JSON.stringify(Object.values(data)[0]));
                    props.history.push({
                        pathname: "/admin",
                    })
                }
            });
    }
    function handleJWTChange(jwt){
        props.handleJWTChange(jwt);
    }

    function hasErrors(key) {
        return errors.indexOf(key) !== -1;
    };

    function handleEmail(evt){
        setEmail(evt.target.value);
    }

    function handlePassword(evt){
        setpassword(evt.target.value);
    }

    return (
        <Fragment>
            <h2>Login</h2>
            <hr />
            <Alert
                alertType={alert.type}
                alertMessage={alert.message}
            />
            <form className="pt-3" onSubmit={handleSubmit}>
                <Input
                    title={"Email"}
                    type={"email"}
                    name={"email"}
                    handleChange={handleEmail}
                    className={hasErrors("email") ? "is-invalid" : ""}
                    errorDiv={hasErrors("email") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a valid email address"}
                />

                <Input
                    title={"Password"}
                    type={"password"}
                    name={"password"}
                    handleChange={handlePassword}
                    className={hasErrors("password") ? "is-invalid" : ""}
                    errorDiv={hasErrors("password") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a password"}
                />
                <hr />
                <button className="btn btn-primary">Login</button>
            </form>
        </Fragment>

    );
}
export default LoginFunc;