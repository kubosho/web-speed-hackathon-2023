import type { FC } from 'react';
import { lazy } from 'react';
import { Helmet } from 'react-helmet';

import * as styles from './Fallback.styles';

const Layout = lazy(() => import('../../components/application/Layout'));

export const Fallback: FC = () => (
  <>
    <Helmet>
      <title>エラーが発生しました</title>
    </Helmet>
    <Layout>
      <div className={styles.container()}>
        <div className={styles.inner()}>
          <p className={styles.mainParagraph()}>エラーが発生しました</p>
          <p className={styles.subParagraph()}>Some error has occurred</p>
        </div>
      </div>
    </Layout>
  </>
);
