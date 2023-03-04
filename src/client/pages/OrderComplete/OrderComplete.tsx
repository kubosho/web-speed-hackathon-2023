import classNames from 'classnames';
import type { FC } from 'react';
import { lazy } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { PrimaryAnchor } from '../../components/foundation/PrimaryAnchor';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useDeviceType } from '../../hooks/useDeviceType';
import { useRecommendation } from '../../hooks/useRecommendation';
import { DeviceType } from '../../types/device_type';

import * as styles from './OrderComplete.styles';

const Layout = lazy(() => import('../../components/application/Layout'));
const ProductHeroImage = lazy(() => import('../../components/product/ProductHeroImage'));

export const OrderComplete: FC = () => {
  const navigate = useNavigate();
  const { authUserLoading, isAuthUser } = useAuthUser();
  const { recommendation } = useRecommendation();
  const deviceType = useDeviceType();

  if (!recommendation || authUserLoading) {
    return null;
  }

  if (!isAuthUser) {
    navigate('/');
    return null;
  }

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
      </Helmet>
      <Layout>
        <WidthRestriction>
          <div className={styles.container()}>
            <div className={styles.notice()}>
              <h2 className={styles.noticeHeading()}>購入が完了しました</h2>
              <div className={styles.noticeDescriptionWrapper()}>
                <p
                  className={classNames(styles.noticeDescription(), {
                    [styles.noticeDescription__desktop()]: deviceType === DeviceType.DESKTOP,
                    [styles.noticeDescription__mobile()]: deviceType === DeviceType.MOBILE,
                  })}
                >
                  このサイトは架空のサイトであり、商品が発送されることはありません
                </p>
              </div>
            </div>

            <div className={styles.recommended()}>
              <h2 className={styles.recommendedHeading()}>こちらの商品もオススメです</h2>
              <ProductHeroImage product={recommendation.product} title={recommendation.product.name} />
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
