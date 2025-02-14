import type { FC } from 'react';
import { lazy } from 'react';
import { Helmet } from 'react-helmet';

import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

const Layout = lazy(() => import('../../components/application/Layout'));
const ProductList = lazy(() => import('../../components/feature/ProductList'));
const ProductHeroImage = lazy(() => import('../../components/product/ProductHeroImage'));

export const Top: FC = () => {
  const { recommendation } = useRecommendation();
  const { features } = useFeatures();

  if (recommendation === undefined || features === undefined) {
    return null;
  }

  const { product } = recommendation;
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;
  const thumbnailFileName = thumbnailFile?.filename;

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
        {thumbnailFileName !== undefined && <link as="image" href={thumbnailFileName} rel="preload" />}
      </Helmet>
      <Layout>
        <div>
          {thumbnailFileName !== undefined ? (
            <ProductHeroImage
              imageFileName={thumbnailFileName}
              productId={product.id}
              productName={product.name}
              title="今週のオススメ"
            />
          ) : null}

          <div className={styles.featureList()}>
            {features.map((featureSection) => {
              return (
                <div key={featureSection.id} className={styles.feature()}>
                  <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
                  <ProductList featureSection={featureSection} />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};
