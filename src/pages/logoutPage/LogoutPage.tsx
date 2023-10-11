import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import {Box, Button, Typography} from "@mui/material";

export const LogoutPage = () => {
  const {handleUpdateIsAuth} = useContext(AuthContext)
  const logout = () => {
    localStorage.removeItem('khanAuthToken');
    handleUpdateIsAuth(false)
  }
  return (
    <Box sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography component="h1" variant="h5">
        Do you want to logout?
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 3, mb: 2 }}
        onClick={logout}
      >
        LOGOUT
      </Button>
    </Box>
    )

};
