import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../models';
import './SignUp.css'

const RegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = new User(
      firstName,
      lastName,
      Number.parseInt(age),
      email,
      password,
    );

    localStorage.setItem('registeredUser', JSON.stringify(user));

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setAge('');

    navigate('/login')
  };

  return (
    <div>
      <h2>Sign up!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input required type="text" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input required type="text" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div>
          <label>Age:</label>
          <input required type="number" value={age} onChange={handleAgeChange} />
        </div>
        <div>
          <label>Email:</label>
          <input required type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input required type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Do you have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
