import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import initilizationAuthentication from '../../firebase/firebase.init';

initilizationAuthentication();

const Login = () => {
    // firebase 
    const auth = getAuth();
    // all state are declare here 
    const [error, setError] = useState('')

    // use ref function 
    const emailRef = useRef();

    // all event handler declare here 
    const handleLogin = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setError('');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary mt-3 mb-3'>Please Login...!!!</h3>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <div className='mb-3 mt-3 text-danger'>
                    {error}
                </div>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p><small>Forget Password? <button onClick={handleResetPassword} className='btn btn-link'>Please Reset</button></small></p>
            </Form>
        </div>
    );
};

export default Login;