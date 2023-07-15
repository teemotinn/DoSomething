import React from 'react';
import { FormikConfig, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer')
  });

  const handleSubmit: FormikConfig<{ firstName: string; lastName: string; email: string; password: string; age: string; }>['onSubmit'] = (values, { resetForm }) => {
    localStorage.setItem('user', JSON.stringify(values));
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div >
      <Typography variant="h4" gutterBottom>
        Registration Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          margin='normal'
          fullWidth
        />

        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin='normal'
          fullWidth
        />

        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin='normal'
          fullWidth
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
          margin='normal'
          fullWidth
        />

        <TextField
          id="age"
          name="age"
          label="Age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
          margin='normal'
          fullWidth
        />
        <Button type='submit' variant='contained'>
          Register
        </Button>
        <p>
          Do you have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
