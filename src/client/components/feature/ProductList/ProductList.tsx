import type { FC } from 'react';
import { lazy } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { useDeviceType } from '../../../hooks/useDeviceType';
import { DeviceType } from '../../../types/device_type';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

const ProductGridList = lazy(() => import('../ProductGridList'));
const ProductListSlider = lazy(() => import('../ProductListSlider'));

export const ProductList: FC<Props> = ({ featureSection }) => {
  const deviceType = useDeviceType();

  switch (deviceType) {
    case DeviceType.DESKTOP: {
      return <ProductListSlider featureSection={featureSection} />;
    }
    case DeviceType.MOBILE: {
      return <ProductGridList featureSection={featureSection} />;
    }
  }
};

ProductList.displayName = 'ProductList';
