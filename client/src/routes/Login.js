
import React, { useState} from 'react';
import { useHistory } from "react-router-dom";

import axios from 'axios';
import { useEmail } from '../context/EmailContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const {emailInContext, setEmailInContext} = useEmail();

  console.log(emailInContext);
  

  const validateDeatils = () => {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateDeatils()){
      alert("Invalid email\n");
      return;
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}:8181/login`, { email })
      .then(res => {
        console.log(res);
        if(res.data=="Success"){
            // navigate('/home'); // Navigate to the dashboard or desired route
            setEmailInContext(email);
            console.log("emai: ", email);
            window.localStorage.setItem("myEmail", email);
            console.log("done");
            console.log(window.localStorage.getItem("myEmail"));
            setEmailInContext(window.localStorage.getItem("myEmail"));
            history.push(`/home`);
        } else{
          alert('Invalid email or plz signup first');
        }
      })
      .catch(err => {
        alert('Invalid email');
        console.error(err);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome Back!</h1>
        <p style={styles.description}>
          Log in to access study groups and continue your learning journey.
        </p>
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input} 
            placeholder="Enter your email address" 
            required 
          />
        </div>
        <button type="submit" style={styles.loginButton}>
          Login
        </button>
        <div style={styles.signupContainer}>
          <h4 style={styles.signupText}>New to the platform?</h4>
          
            <button onClick={()=>history.push('/')} type="button" style={styles.signupButton}>
              Sign Up
            </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem 3.6rem 2rem 2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '24px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  loginButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  signupContainer: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  signupText: {
    marginBottom: '0.5rem',
    fontSize: '14px',
    color: '#555',
  },
  signupButton: {
    backgroundColor: 'transparent',
    color: '#007BFF',
    border: '1px solid #007BFF',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Login;
