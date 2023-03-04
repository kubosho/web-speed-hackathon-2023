import type { FC } from 'react';
import { lazy, useCallback, useEffect, useState } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
type DeviceType = typeof DeviceType[keyof typeof DeviceType];

const ProductGridList = lazy(() => import('../ProductGridList'));
const ProductListSlider = lazy(() => import('../ProductListSlider'));

export function useDeviceType(): DeviceType {
  const [windowWidth, setWindowWidth] = useState(0);

  const updateWindowWidth = useCallback(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
  }, []);

  useEffect(() => {
    updateWindowWidth();
  }, [updateWindowWidth]);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [updateWindowWidth]);

  return windowWidth >= 1024 ? DeviceType.DESKTOP : DeviceType.MOBILE;
}

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
