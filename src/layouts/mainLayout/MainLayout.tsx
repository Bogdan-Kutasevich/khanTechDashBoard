import { Outlet } from 'react-router-dom';
import {Header} from "../../components/header/Header.tsx";
import {Footer} from "../../components/footer/Footer.tsx";
import styles from './MainLayout.module.css';

export const MainLayout = () => (
    <div className={styles.layout}>
      <Header/>
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <Footer />
    </div>
);
