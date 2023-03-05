import classNames from 'classnames';
import { lazy } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';

import * as styles from './ProductHeroImage.styles';

const Anchor = lazy(() => import('../../foundation/Anchor'));
const Image = lazy(() => import('../../foundation/Image'));
const WidthRestriction = lazy(() => import('../../foundation/WidthRestriction'));

type Props = {
  product: ProductFragmentResponse;
  title: string;
};

export const ProductHeroImage: FC<Props> = ({ product, title }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;
  if (thumbnailFile?.filename === undefined) {
    return null;
  }

  return (
    <WidthRestriction>
      <Anchor href={`/product/${product.id}`}>
        <div className={styles.container()}>
          <div className={styles.imageContainer()}>
            <Image
              alt=""
              className={styles.image()}
              height={576}
              loading="eager"
              src={thumbnailFile?.filename}
              width={1024}
            />
          </div>

          <div className={styles.overlay()}>
            <p className={classNames(styles.title())}>{title}</p>
            <p className={classNames(styles.description())}>{product.name}</p>
          </div>
        </div>
      </Anchor>
    </WidthRestriction>
  );
};

ProductHeroImage.displayName = 'ProductHeroImage';
