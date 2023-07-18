import React, { useContext, useState } from 'react'
import { FormikConfig, useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import { Link } from 'react-router-dom'
import { MinimumUser, User } from '../structure/model'
import containerStyles from '../../../common/components/container.module.scss'
import { AppContext } from '../../../context/AppContext'
import { PATHS } from '../../../navigation/Paths'
import Header from '../../../common/components/Header'

const LoginScreen: React.FC = () => {
  const { login, storedUsers } = useContext(AppContext);
  const [openToast, setOpenToast] = useState(false);

  const initialValues = new MinimumUser('', '')

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address.').required('Email is required.'),
    password: Yup.string().required('Password is required.').min(6, 'Password must be at least 6 characters long.')
  });

  const handleSubmit: FormikConfig<MinimumUser>['onSubmit'] = (values, { resetForm }) => {

    const user: User | undefined = storedUsers.find(user => user.email === values.email && user.password === values.password)
    if (user) {
      login(user)
      resetForm()
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
    <div>
      <Header />
      <div className={containerStyles.internal}>
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
          <div className={containerStyles.submitButton}>
            <Button type='submit' variant='contained' >
              Login
            </Button>
          </div>
          <p>
            Don't have an account? <Link to={PATHS.SIGN_UP}>Register</Link>
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
    </div>
  );
};

export default LoginScreen;
