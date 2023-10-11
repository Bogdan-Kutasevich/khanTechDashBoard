import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {NotificationContextProvider} from "./context/NotificationContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotificationContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </NotificationContextProvider>
)
