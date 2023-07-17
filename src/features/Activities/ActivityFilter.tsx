import { useState } from 'react'
import { FormikConfig, useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import buttonStyles from '../../../components/button.module.scss'
import containerStyles from '../../../components/container.scss'
import { MinimumUser, User } from '../User/model'

const LoginScreen = () => {
  const [openToast, setOpenToast] = useState(false);

  const navigate = useNavigate()

  const initialValues = new MinimumUser('', '')

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address.').required('Email is required.'),
    password: Yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters long.')
  });

  const handleSubmit: FormikConfig<MinimumUser>['onSubmit'] = (values, { resetForm }) => {

    const user: User = JSON.parse(localStorage.getItem('registeredUser') ?? '{}') as User;
    if (values.email === user.email && values.password === user.password) {
      localStorage.setItem('loggedUser', JSON.stringify(user))
      resetForm()
      navigate('/home')
    } else {
      setOpenToast(true)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  const handleCloseToast = () => {
    setOpenToast(false);
  }

  return (
    <div className={containerStyles.internalContainer}>
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
          Login
        </Button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>

      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleCloseToast}>
          Invalid email or password. Please try again.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginScreen;