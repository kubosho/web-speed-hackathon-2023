import classNames from 'classnames';
import type { FC } from 'react';
import { lazy, useState } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';

import * as styles from './ProductMediaListPreviewer.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
};

const MediaItem = lazy(() => import('./MediaItem'));
const MediaItemPreviewer = lazy(() => import('./MediaItemPreviewer'));

export const ProductMediaListPreviewer: FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (product === undefined || product.media.length === 0) {
    return null;
  }

  return (
    <div className={styles.container()}>
      <div className={styles.mediaItemPreviewer()}>
        <MediaItemPreviewer file={product.media[activeIndex].file} />
      </div>
      <div className={styles.itemListWrapper()}>
        <ul className={styles.itemList()}>
          {product.media.map((media, index) => {
            const disabled = index === activeIndex;

            return (
              <li key={media.id} className={styles.item()}>
                <button
                  className={classNames(styles.itemSelectButton(), {
                    [styles.itemSelectButton__disabled()]: disabled,
                  })}
                  disabled={disabled}
                  onClick={() => setActiveIndex(index)}
                >
                  <MediaItem file={media.file} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
