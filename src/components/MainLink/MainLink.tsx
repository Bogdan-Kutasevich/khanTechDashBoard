import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MainLink.module.css';

type Props = {
  to: string;
  children: ReactNode;
};

export const MainLink = ({
  to, children
}: Props) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? `${styles.active}` : `${styles.nonActive}`
    }
  >
    {children}
  </NavLink>
);
