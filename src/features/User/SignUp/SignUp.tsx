import React from 'react'
import { FormikConfig, useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../models';
import containerStyles from '../../../components/container.module.scss'
import buttonStyles from '../../../components/button.module.scss'

const RegistrationForm: React.FC = () => {

  const navigate = useNavigate()

  const initialValues = new User('', '', '', '', '')

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address,').required('Email is required.'),
    password: Yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters long.'),
    name: Yup.string().required('Name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    age: Yup.number().required('Age is required.').positive('Age must be a positive number.').integer('Age must be an integer.'),
  })

  const handleSubmit: FormikConfig<User>['onSubmit'] = (values, { resetForm }) => {
    localStorage.setItem('registeredUser', JSON.stringify(values))
    resetForm()
    navigate('/login')
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <div className={containerStyles.internalContainer}>
      <Typography variant="h4" gutterBottom>
        Registration Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="dense"
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
          margin="dense"
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
          margin="dense"
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
          margin="dense"
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
          margin="dense"
          fullWidth
        />

        <Button type='submit' variant='contained' className={buttonStyles.submitButton}>
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
