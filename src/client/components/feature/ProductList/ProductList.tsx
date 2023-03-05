import { type FC, lazy } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';

import * as styles from './ProductList.styles';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

const ProductGridList = lazy(() => import('../ProductGridList'));
const ProductListSlider = lazy(() => import('../ProductListSlider'));

export const ProductList: FC<Props> = ({ featureSection }) => (
  <>
    <div className={styles.productListSliderContainer()}>
      <ProductListSlider featureSection={featureSection} />
    </div>
    <div className={styles.productGridListContainer()}>
      <ProductGridList featureSection={featureSection} />
    </div>
  </>
);

ProductList.displayName = 'ProductList';
