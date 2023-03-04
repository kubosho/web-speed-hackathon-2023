import type { FC, ReactNode } from 'react';
import { lazy } from 'react';

import * as styles from './Layout.styles';

type Props = {
  children: ReactNode;
};

const Footer = lazy(() => import('../../navigators/Footer'));
const Header = lazy(() => import('../../navigators/Header'));

export const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <main className={styles.container()}>{children}</main>
    <Footer />
  </>
);
