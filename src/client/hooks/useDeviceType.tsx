import { useCallback, useEffect, useState } from 'react';

import { DeviceType } from '../types/device_type';

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
