import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';

import * as styles from './NotFound.styles';

export const NotFound: FC = () => (
  <>
    <Helmet>
      <title>ページが見つかりませんでした</title>
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=fallback&text=ページが存在しませんNotFound"
        rel="stylesheet"
      />
    </Helmet>
    <Layout>
      <div className={styles.container()}>
        <div className={styles.inner()}>
          <p className={styles.mainParagraph()}>ページが存在しません</p>
          <p className={styles.subParagraph()}>Not Found</p>
        </div>
      </div>
    </Layout>
  </>
);
