import { type FC, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import * as styles from './WidthRestriction.styles';

type Props = {
  children: ReactNode;
};

export const WidthRestriction: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState<number>(0);

  const isReady = clientWidth !== 0;

  const updateClientWidth = useCallback(() => {
    const width = containerRef.current?.getBoundingClientRect().width ?? 0;
    // 横幅を最大 1024px にする
    setClientWidth(Math.min(width, 1024));
  }, []);

  useEffect(() => {
    updateClientWidth();
  }, [updateClientWidth]);

  useEffect(() => {
    window.addEventListener('resize', updateClientWidth);
    return () => window.removeEventListener('resize', updateClientWidth);
  }, [updateClientWidth]);

  return (
    <div ref={containerRef} className={styles.container()}>
      <div className={styles.inner({ width: clientWidth })}>{isReady ? children : null}</div>
    </div>
  );
};
