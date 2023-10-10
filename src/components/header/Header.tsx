import {MainLink} from "../MainLink/MainLink.tsx";
import styles from './Header.module.css'

export const Header = () => (
  <header className={styles.header}>
    <h2 className={styles.title}>Dash board</h2>
    <nav className={styles.nav}>
      <MainLink to="/">Create post</MainLink>
      <MainLink to="/updatePosts">Update posts</MainLink>
      <MainLink to="/logout">Logout</MainLink>
    </nav>
  </header>
);
