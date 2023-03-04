import * as currencyFormatter from 'currency-formatter';
import type { FC } from 'react';
import { lazy } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { useActiveOffer } from '../../../hooks/useActiveOffer';
import { Anchor } from '../../foundation/Anchor';
import { Image } from '../../foundation/Image';

import * as styles from './ProductCard.styles';

type Props = {
  product: ProductFragmentResponse;
};

const ProductOfferLabel = lazy(() => import('../../product/ProductOfferLabel'));

export const ProductCard: FC<Props> = ({ product }) => {
  const thumbnailFile = product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  const { activeOffer } = useActiveOffer(product);
  const price = activeOffer?.price ?? product.price;

  return (
    <Anchor href={`/product/${product.id}`}>
      <div className={styles.inner()}>
        {thumbnailFile ? (
          <div className={styles.image()}>
            <Image height={126} src={thumbnailFile.filename} width={224} />
          </div>
        ) : null}
        <div className={styles.description()}>
          <p className={styles.itemName()}>{product.name}</p>
          <span className={styles.itemPrice()}>{currencyFormatter.format(price, { code: 'JPY', precision: 0 })}</span>
        </div>
        {activeOffer !== undefined && (
          <div className={styles.label()}>
            <ProductOfferLabel size="base">タイムセール中</ProductOfferLabel>
          </div>
        )}
      </div>
    </Anchor>
  );
};
