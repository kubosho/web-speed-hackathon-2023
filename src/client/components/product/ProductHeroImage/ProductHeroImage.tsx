import classNames from 'classnames';
import { lazy } from 'react';
import type { FC } from 'react';

import * as styles from './ProductHeroImage.styles';

const Anchor = lazy(() => import('../../foundation/Anchor'));
const Image = lazy(() => import('../../foundation/Image'));
const WidthRestriction = lazy(() => import('../../foundation/WidthRestriction'));

type Props = {
  productId: number;
  productName: string;
  imageFileName: string;
  title: string;
};

export const ProductHeroImage: FC<Props> = ({ imageFileName, productId, productName, title }) => {
  return (
    <WidthRestriction>
      <Anchor href={`/product/${productId}`}>
        <div className={styles.container()}>
          <div className={styles.imageContainer()}>
            <Image alt="" className={styles.image()} height={576} loading="eager" src={imageFileName} width={1024} />
          </div>

          <div className={styles.overlay()}>
            <p className={classNames(styles.title())}>{title}</p>
            <p className={classNames(styles.description())}>{productName}</p>
          </div>
        </div>
      </Anchor>
    </WidthRestriction>
  );
};

ProductHeroImage.displayName = 'ProductHeroImage';
