import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


const Signup = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('https://192.168.29.188:8181/register', {name, email})
        .then(res => {
            console.log(res);
            // navigate('/login')
            history.push(`login`);

        })
        .catch(err => console.log(err));
        

    }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Join Our Group Study Platform</h1>
        <p style={styles.description}>
          Collaborate, learn, and grow with peers. Create or join live study groups for any subject!
        </p>
      </div>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Name:
          </label>
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name" style={styles.input} placeholder="Enter your full name" />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" style={styles.input} placeholder="Enter your email address" />
        </div>
        <button onClick={handleSubmit} type="submit" style={styles.registerButton}>
          Register
        </button>
        <div style={styles.loginContainer}>
          <h4 style={styles.loginText}>Already have an account?</h4>
         
          <button onClick={()=>history.push('/login')} type="button" style={styles.loginButton}>
            Login
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
    transform: 'translate(-50%, -50%)'
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
  registerButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  registerButtonHover: {
    backgroundColor: '#0056b3',
  },
  loginContainer: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  loginText: {
    marginBottom: '0.5rem',
    fontSize: '14px',
    color: '#555',
  },
  loginButton: {
    backgroundColor: 'transparent',
    color: '#007BFF',
    border: '1px solid #007BFF',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Signup;
