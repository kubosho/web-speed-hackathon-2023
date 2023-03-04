import classNames from 'classnames';
import { lazy } from 'react';
import type { FC } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { useDeviceType } from '../../../hooks/useDeviceType';
import { DeviceType } from '../../../types/device_type';

import * as styles from './ProductHeroImage.styles';

const Anchor = lazy(() => import('../../foundation/Anchor'));
const WidthRestriction = lazy(() => import('../../foundation/WidthRestriction'));

type Props = {
  product: ProductFragmentResponse;
  title: string;
};

export const ProductHeroImage: FC<Props> = ({ product, title }) => {
  const deviceType = useDeviceType();

  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;
  if (thumbnailFile?.filename === undefined) {
    return null;
  }

  return (
    <WidthRestriction>
      <Anchor href={`/product/${product.id}`}>
        <div className={styles.container()}>
          <div className={styles.imageContainer()}>
            <img alt="" className={styles.image()} loading="eager" src={thumbnailFile?.filename} />
          </div>

          <div className={styles.overlay()}>
            <p
              className={classNames(styles.title(), {
                [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
              })}
            >
              {title}
            </p>
            <p
              className={classNames(styles.description(), {
                [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
              })}
            >
              {product.name}
            </p>
          </div>
        </div>
      </Anchor>
    </WidthRestriction>
  );
};

ProductHeroImage.displayName = 'ProductHeroImage';
