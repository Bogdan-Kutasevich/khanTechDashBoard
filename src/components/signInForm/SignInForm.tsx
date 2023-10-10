import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import {SignInFormsFields} from "./types.ts";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.tsx";
import {isTypicalError} from "../../utils/errorTypeHelper.ts";
import {NotificationSuccess} from "../notificationSuccess/NotificationSuccess.tsx";
import {NotificationError} from "../notificationError/NotificationError.tsx";
export const SignInForm = () => {
  const [isFetching, setFetching] = useState(false)
  const [fetchingError, setFetchingError] = useState('')
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [openErrorSnackBar, setErrorOpenSnackBar] = useState(false);
  const {updateIsAuth} = useContext(AuthContext)
  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleErrorOpenSnackBar = () => {
    setErrorOpenSnackBar(true);
  };
  const handleErrorCloseSnackBar = () => {
    setErrorOpenSnackBar(false);
  };
  const {
    register, handleSubmit, reset, formState: { errors }
  } = useForm<SignInFormsFields>({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (
    {
      username, password
    }: SignInFormsFields
  ) => {
    try {
      setFetching(true)
      const response = await axios.post('http://localhost:3001/admin/log-in', {username, password});
      localStorage.setItem('khanAuthToken', response.data.jwt);
      updateIsAuth(true)
      reset();
      setFetching(false)
      setSnackBarMessage('auth successfully')
      handleOpenSnackBar()
    } catch (error) {
      setFetching(false)
      if (isTypicalError(error)) {
        setFetchingError(error.data.message);
      } else {
        setFetchingError('password or username invalid');
      }
      handleErrorOpenSnackBar()
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
          margin: '100px auto'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Dash board logIn
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%'
          }}
        >
          <TextField
            {...register('username', {
              required: 'Required field',
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            {...register('password', {
              required: 'Required field',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            disabled={isFetching}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            disabled={isFetching}
          >
            Sign In
          </Button>

          {isFetching && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
      </Box>
    <NotificationSuccess handleCloseSnackBar={handleCloseSnackBar} message={snackBarMessage} openSnackBar={openSnackBar} />
    <NotificationError handleCloseSnackBar={handleErrorCloseSnackBar} message={fetchingError} openSnackBar={openErrorSnackBar}/>
  </>
  );
};
