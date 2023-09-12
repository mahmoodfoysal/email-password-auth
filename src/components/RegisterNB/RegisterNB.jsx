import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import initilizationAuthentication from '../../firebase/firebase.init';
initilizationAuthentication();


const RegisterNB = () => {
    // firebase 
    const auth = getAuth();
    
    // all state are declare here 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    // all event handler are declare here 
    const handleEmail = event => {
        const email = event.target.value;
        setEmail(email);
    }
    const handlePassword = event => {
        const password = event.target.value;
        setPassword(password);
    }
    const handleRegister = event => {
        event.preventDefault();
        if(password.length < 6) {
            setError("Password must be have 6 character");
        }
        else if(!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("Password must be have Two Uppercase letter");
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setError('');
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

        }
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary mb-3 mt-3'>Please Register...!!!</h3>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onBlur={handleEmail} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onBlur={handlePassword} type="password" name='password' className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <div className='mb-3 mt-3 text-danger'>
                    {error}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterNB;