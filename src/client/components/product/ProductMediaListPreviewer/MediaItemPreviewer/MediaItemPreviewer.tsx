import classNames from 'classnames';
import { type FC, lazy } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { useDeviceType } from '../../../../hooks/useDeviceType';
import { DeviceType } from '../../../../types/device_type';
import { getMediaType } from '../../../../utils/get_media_type';

import * as styles from './MediaItemPreiewer.styles';

type Props = {
  file: MediaFileFragmentResponse;
};

const Image = lazy(() => import('../../../foundation/Image'));

export const MediaItemPreviewer: FC<Props> = ({ file }) => {
  const type = getMediaType(file.filename);
  const deviceType = useDeviceType();

  return (
    <div className={styles.container()}>
      {type === 'image' && <Image fill src={file.filename} />}
      {type === 'video' && (
        <video
          autoPlay
          controls
          muted
          playsInline
          className={classNames(styles.video(), {
            [styles.video__desktop()]: deviceType === DeviceType.DESKTOP,
            [styles.video__mobile()]: deviceType === DeviceType.MOBILE,
          })}
          src={file.filename}
        />
      )}
    </div>
  );
};
