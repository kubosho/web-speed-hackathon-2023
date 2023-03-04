import classNames from 'classnames';
import { type FC, lazy } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';

import * as styles from './MediaItemPreiewer.styles';

type Props = {
  file: MediaFileFragmentResponse;
};

const Image = lazy(() => import('../../../foundation/Image'));

export const MediaItemPreviewer: FC<Props> = ({ file }) => {
  const type = getMediaType(file.filename);

  return (
    <div className={styles.container()}>
      {type === 'image' && <Image fill src={file.filename} />}
      {type === 'video' && (
        <video autoPlay controls muted playsInline className={classNames(styles.video())} src={file.filename} />
      )}
    </div>
  );
};
