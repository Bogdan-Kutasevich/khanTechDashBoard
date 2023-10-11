import {createContext, ReactNode, useState} from 'react';
import {NotificationSuccess} from "../components/notificationSuccess/NotificationSuccess.tsx";
import {NotificationError} from "../components/notificationError/NotificationError.tsx";

interface NotificationContextType {
  handleSuccessOpenSnackBar: () => void;
  handleErrorOpenSnackBar: () => void;
  handleSetSnackBarMessage: (message: string) => void;
  handleSetSnackBarError: (error: string) => void;
}

const defaultValue = {
  handleSuccessOpenSnackBar: () => '',
  handleErrorOpenSnackBar: () => '',
  handleSetSnackBarMessage: () => '',
  handleSetSnackBarError: () => '',

}

export const NotificationContext = createContext<NotificationContextType>(defaultValue);

interface ProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider = ({ children }: ProviderProps) => {
  const [snackBarError, setSnackBarError] = useState('')
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
  const [openErrorSnackBar, setErrorOpenSnackBar] = useState(false);

  const handleSuccessOpenSnackBar = () => {
    setOpenSuccessSnackBar(true);
  };
  const handleSuccessCloseSnackBar = () => {
    setOpenSuccessSnackBar(false);
  };

  const handleErrorOpenSnackBar = () => {
    setErrorOpenSnackBar(true);
  };
  const handleErrorCloseSnackBar = () => {
    setErrorOpenSnackBar(false);
  };

  const handleSetSnackBarError = (error:string) => {
    setSnackBarError(error);
  };

  const handleSetSnackBarMessage = (message:string) => {
    setSnackBarMessage(message);
  };

  return (
    <>
      <NotificationContext.Provider value={{ handleSuccessOpenSnackBar,handleErrorOpenSnackBar, handleSetSnackBarMessage, handleSetSnackBarError  }}>
        {children}
      </NotificationContext.Provider>
      <NotificationSuccess handleCloseSnackBar={handleSuccessCloseSnackBar} message={snackBarMessage} openSnackBar={openSuccessSnackBar} />
      <NotificationError handleCloseSnackBar={handleErrorCloseSnackBar} message={snackBarError} openSnackBar={openErrorSnackBar}/>
    </>
  );
};
