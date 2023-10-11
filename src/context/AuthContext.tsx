import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {isTypicalError} from "../utils/errorTypeHelper.ts";
import {NotificationContext} from "./NotificationContext.tsx";
import {api} from "../services/apiService/apiService.ts";

interface AuthContextType {
  isAuth: boolean;
  handleUpdateIsAuth: (isAuth: boolean) => void;
  authToken: string;
  isFetchingAuth: boolean;
}

const defaultValue = {
  isAuth: false,
  handleUpdateIsAuth: () => '',
  authToken: '',
  isFetchingAuth: false,
}

export const AuthContext = createContext<AuthContextType>(defaultValue);

interface ProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>('');
  const [isFetchingAuth, setIsFetchingAuth] = useState(true)

  const {handleSetSnackBarMessage, handleSetSnackBarError, handleSuccessOpenSnackBar, handleErrorOpenSnackBar} = useContext(NotificationContext)

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
      const response = await api.isAuth(token)
      handleSetSnackBarMessage('auth successfully')
      handleSuccessOpenSnackBar()
      return response.data.authorized
    } catch (error) {
      if (isTypicalError(error)) {
        handleSetSnackBarError(error.response.data);
      } else {
        handleSetSnackBarError('auto auth invalid please sign in');
      }
      setAuth(false)
      handleErrorOpenSnackBar()
    } finally {
      setIsFetchingAuth(false)
    }
  }
  useEffect(() => {
    checkAuth();
  }, [isAuth]);
  const handleUpdateIsAuth = (isAuth: boolean) => {
    setAuth(isAuth);
  };

  return (
    <>
      <AuthContext.Provider value={{ isAuth, authToken, handleUpdateIsAuth, isFetchingAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
