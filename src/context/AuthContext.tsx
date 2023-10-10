import {createContext, ReactNode, useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {isTypicalError} from "../utils/errorTypeHelper.ts";
import {NotificationSuccess} from "../components/notificationSuccess/NotificationSuccess.tsx";
import {NotificationError} from "../components/notificationError/NotificationError.tsx";

interface AuthContextType {
  isAuth: boolean;
  updateIsAuth: (isAuth: boolean) => void;
  authToken: string;
  isFetchingAuth: boolean;
  fetchingAuthError: string;
}

const defaultvalue = {
  isAuth: false,
  updateIsAuth: () => '',
  authToken: '',
  isFetchingAuth: false,
  fetchingAuthError: ''
}

export const AuthContext = createContext<AuthContextType>(defaultvalue);

interface ProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>('');
  const [isFetchingAuth, setIsFetchingAuth] = useState(true)
  const [fetchingAuthError, setFetchingAuthError] = useState('')
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [openErrorSnackBar, setErrorOpenSnackBar] = useState(false);

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

  const checkAuth = async () => {
    const token = localStorage.getItem('khanAuthToken');
    if (!token) {
      setAuth(false)
      setIsFetchingAuth(false)
      return;
    }
    const auth = await sendRequest(token);
    if (auth) {
      setAuth(true)
      setAuthToken(token)
    }
    setIsFetchingAuth(false)
  }
  const sendRequest = async (token: string) => {
    try {
      setIsFetchingAuth(true)
      const response: AxiosResponse = await axios({
        method: 'GET',
        url: 'http://localhost:3001/admin/isAuth',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setIsFetchingAuth(false)
      setSnackBarMessage('auth successfully')
      handleOpenSnackBar()
      return response.data.authorized
    } catch (error) {
      setAuth(false)
      setIsFetchingAuth(false)
      if (isTypicalError(error)) {
        setFetchingAuthError(error.data.message);
      } else {
        setFetchingAuthError('auto auth invalid please sign in');
      }
      handleErrorOpenSnackBar()
    }
  }
  useEffect(() => {
    checkAuth();
  }, [isAuth]);
  const updateIsAuth = (isAuth: boolean) => {
    setAuth(isAuth);
  };

  return (
    <>
      <AuthContext.Provider value={{ isAuth, authToken, updateIsAuth, isFetchingAuth, fetchingAuthError }}>
        {children}
      </AuthContext.Provider>
      <NotificationSuccess handleCloseSnackBar={handleCloseSnackBar} message={snackBarMessage} openSnackBar={openSnackBar} />
      <NotificationError handleCloseSnackBar={handleErrorCloseSnackBar} message={fetchingAuthError} openSnackBar={openErrorSnackBar}/>
    </>
  );
};
