import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes';
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.tsx";
import {SignInForm} from "./components/signInForm/SignInForm.tsx";
import {Box, CircularProgress} from "@mui/material";

function App() {
  const {isAuth, isFetchingAuth} = useContext(AuthContext)
  return (
    <>
      { isAuth && <RouterProvider router={router}/>}
      { !isAuth && !isFetchingAuth && <SignInForm />}
      {isFetchingAuth && (
        <Box sx={{
          height:'100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CircularProgress />
        </Box>
      )}
    </>

  )
}

export default App
