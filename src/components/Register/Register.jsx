import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import initilizationAuthentication from '../../firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification,updateProfile } from "firebase/auth";
initilizationAuthentication();

const Register = () => {
    // all state are declare here 
    const [error, setError] = useState('')

    // firebase auth 
    const auth = getAuth();
    // all event handler declear are here 
    const handleRegister = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const userName = event.target.userName.value;
        if (password.length < 6) {
            setError("Password must have 6 character");
        }
        else if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("Password must have two uppercase letter");
        }
        else {
            createUserWithEmailAndPassword(auth, email, password, userName)
                .then((result) => {
                    // Signed in 
                    const user = result.user;
                    // console.log(user);
                    setError('');
                    event.target.reset();
                    sendEmailVerificationValidation(result.user);
                    setUserProfile(result.user, userName);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }

    const setUserProfile = (user, name) => {
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
    }

    // send email verification 
    const sendEmailVerificationValidation = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert("Please check your email")
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary mt-3 mb-3'>Please Register...!!!</h3>
            <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name='userName' placeholder="User Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <div className='mb-3 mt-3 text-danger'>
                    {error}
                </div>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;