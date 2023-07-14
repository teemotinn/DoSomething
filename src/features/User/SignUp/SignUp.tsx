import { SetStateAction, useState } from 'react'
import './SignUp.css'
import { User } from '../models';

function SignUp() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setName(e.target.value);
  };
  const handleLastNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLastName(e.target.value);
  };
  const handleAgeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setAge(e.target.value);
  };
  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const resetFields = () => {
    setName('')
    setLastName('')
    setAge('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const user = new User(name, lastName, Number.parseInt(age), email, password)
    localStorage.setItem('user', JSON.stringify(user))

    resetFields()
  };

  return (
    <>
      <div className='mainContainer'>
        <h2>
          Registro
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='formInput'>
            <label>Nombre:</label>
            <input required type="text" value={name} onChange={handleFirstNameChange} />
          </div>
          <div className='formInput'>
            <label>Apellido:</label>
            <input required type="text" value={lastName} onChange={handleLastNameChange} />
          </div>
          <div className='formInput'>
            <label>Edad:</label>
            <input required type="number" value={age} onChange={handleAgeChange} />
          </div>
          <div className='formInput'>
            <label>Correo:</label>
            <input required type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className='formInput'>
            <label>Contraseña:</label>
            <input required type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </>
  )
}

export default SignUp;
