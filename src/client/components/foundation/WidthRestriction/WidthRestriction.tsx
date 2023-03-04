import { type FC, type ReactNode, useRef } from 'react';

import * as styles from './WidthRestriction.styles';

type Props = {
  children: ReactNode;
};

export const WidthRestriction: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={styles.container()}>
      <div className={styles.inner()}>{children}</div>
    </div>
  );
};
