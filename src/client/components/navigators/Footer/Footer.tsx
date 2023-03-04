import classNames from 'classnames';
import { type FC, lazy } from 'react';
import { NavLink } from 'react-router-dom';

import * as styles from './Footer.styles';

const Image = lazy(() => import('../../foundation/Image'));

const FOOTER_LINK_ITEMS = ['利用規約', 'お問い合わせ', 'Q&A', '運営会社', 'オーガニックとは'] as const;

export const Footer: FC = () => (
  <footer className={styles.container()}>
    <ul className={classNames(styles.itemList())}>
      {FOOTER_LINK_ITEMS.map((item) => (
        <li key={item} className={styles.item()}>
          {item}
        </li>
      ))}
    </ul>
    <NavLink to="/">
      <Image src="/icons/logo.svg" />
    </NavLink>
  </footer>
);
