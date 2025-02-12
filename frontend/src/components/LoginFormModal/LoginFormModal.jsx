// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState } from 'react';
import { useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        // console.log("API response:", data); // Debugging
      
        if (data && data.errors) {
          setErrors(data.errors); // Set the errors object from API
        } else if (data.errors?.message) {
          setErrors({ general: data.errors.message }); // Handle message key directly
        } else {
          setErrors({ general: "The provided credentials were invalid." }); // Fallback message
        }
      });
  };

  useEffect(() => {}, [errors]);

  const handleDemoLogin = () => {
    setErrors({}); // Clear any previous errors
    return dispatch(sessionActions.login({ credential: "demo@user.com", password: "password" }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  

  return (
    <>
      <h1>Log In</h1>
      <p className='error-message'>{errors.general}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div>
          <button type="submit" className='log-in-button'>Log In</button>
        </div>
        <div className='demo-user-button'>
          <button type="button" onClick={handleDemoLogin}>Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;