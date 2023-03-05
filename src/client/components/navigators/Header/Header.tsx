import { type FC, lazy, useCallback } from 'react';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { useOpenModal } from '../../../store/modal';

import * as styles from './Header.styles';

const Anchor = lazy(() => import('../../foundation/Anchor'));
const Icon = lazy(() => import('../../foundation/Icon'));
const Image = lazy(() => import('../../foundation/Image'));

export const Header: FC = () => {
  const { isAuthUser } = useAuthUser();
  const handleOpenModal = useOpenModal();

  const onClickSignInButton = useCallback(() => {
    handleOpenModal('SIGN_IN');
  }, [handleOpenModal]);

  return (
    <header className={styles.container()}>
      <Anchor href="/">
        <div className={styles.logo()}>
          <Image
            alt="買えるオーガニック"
            className={styles.logoImage()}
            height={32}
            src="/icons/logo.svg"
            width={205}
          />
        </div>
      </Anchor>
      {isAuthUser ? (
        <Anchor data-testid="navigate-order" href={'/order'}>
          <div className={styles.orderLink()}>
            <Icon color="#222222" height={20} type="FaShoppingCart" width={20} />
          </div>
        </Anchor>
      ) : (
        <button className={styles.signInButton()} data-testid="navigate-signin" onClick={onClickSignInButton}>
          <Icon color="#222222" height={20} type="FaUser" width={20} />
        </button>
      )}
    </header>
  );
};
