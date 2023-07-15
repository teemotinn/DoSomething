import React, { useState } from 'react';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Modal } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../../components/container.module.scss'
import { User } from '../models';

const LoginScreen: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long')
  });

  const handleSubmit: FormikConfig<{ email: string; password: string }>['onSubmit'] = (values, { resetForm }) => {

    const user: User = JSON.parse(localStorage.getItem('registeredUser') ?? '{}') as User;
    if (values.email === user.email && values.password === user.password) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home')
      resetForm();
    } else {
      setModalOpen(true);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.centeredContainer}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          margin="normal"
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div>
          <Typography variant="h5" gutterBottom>
            Login Failed
          </Typography>
          <Typography variant="body1" gutterBottom>
            Invalid email or password. Please try again.
          </Typography>
          <Button onClick={handleCloseModal}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginScreen;
