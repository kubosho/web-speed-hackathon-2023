import _ from 'lodash';
import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { useDeviceType } from '../../../hooks/useDeviceType';
import { DeviceType } from '../../../types/device_type';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  const deviceType = useDeviceType();

  switch (deviceType) {
    case DeviceType.DESKTOP: {
      return <ProductListSlider featureSection={featureSection} />;
    }
    case DeviceType.MOBILE: {
      return <ProductGridList featureSection={featureSection} />;
    }
  }
}, _.isEqual);

ProductList.displayName = 'ProductList';
