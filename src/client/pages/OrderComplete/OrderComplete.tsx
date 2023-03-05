import classNames from 'classnames';
import type { FC } from 'react';
import { lazy } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { useAuthUser } from '../../hooks/useAuthUser';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './OrderComplete.styles';

const Layout = lazy(() => import('../../components/application/Layout'));
const ProductHeroImage = lazy(() => import('../../components/product/ProductHeroImage'));
const PrimaryAnchor = lazy(() => import('../../components/foundation/PrimaryAnchor'));
const WidthRestriction = lazy(() => import('../../components/foundation/WidthRestriction'));

export const OrderComplete: FC = () => {
  const navigate = useNavigate();
  const { authUserLoading, isAuthUser } = useAuthUser();
  const { recommendation } = useRecommendation();

  if (!recommendation || authUserLoading) {
    return null;
  }

  if (!isAuthUser) {
    navigate('/');
    return null;
  }

  const { product } = recommendation;
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;
  const thumbnailFileName = thumbnailFile?.filename;

  return (
    <>
      <Helmet>
        <title>購入が完了しました</title>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=fallback&text=このサイトは架空のサイトであり、商品が発送されることはありません"
          rel="stylesheet"
        />
        {thumbnailFileName !== undefined && <link as="image" href={thumbnailFileName} rel="preload" />}
      </Helmet>
      <Layout>
        <WidthRestriction>
          <div className={styles.container()}>
            <div className={styles.notice()}>
              <h2 className={styles.noticeHeading()}>購入が完了しました</h2>
              <div className={styles.noticeDescriptionWrapper()}>
                <p className={classNames(styles.noticeDescription())}>
                  このサイトは架空のサイトであり、商品が発送されることはありません
                </p>
              </div>
            </div>

            <div className={styles.recommended()}>
              <h2 className={styles.recommendedHeading()}>こちらの商品もオススメです</h2>
              {thumbnailFileName !== undefined ? (
                <ProductHeroImage
                  imageFileName={thumbnailFileName}
                  productId={product.id}
                  productName={product.name}
                  title={product.name}
                />
              ) : null}
            </div>

            <div className={styles.backToTopButtonWrapper()}>
              <PrimaryAnchor href="/" size="lg">
                トップへ戻る
              </PrimaryAnchor>
            </div>
          </div>
        </WidthRestriction>
      </Layout>
    </>
  );
};
