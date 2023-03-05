import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

import type { GetZipcodeQueryResponse } from '../graphql/queries';
import { GetZipcodeQuery } from '../graphql/queries';

export const useZipcode = (code: string) => {
  const handleError = useErrorHandler();

  const [loadZipcode, zipcodeResult] = useLazyQuery<GetZipcodeQueryResponse>(GetZipcodeQuery, {
    onError: handleError,
    variables: {
      code,
    },
  });

  useEffect(() => {
    if (code == null || code === '') {
      return;
    }

    loadZipcode();
  }, [code, loadZipcode]);

  return zipcodeResult.data?.zipcode;
};
