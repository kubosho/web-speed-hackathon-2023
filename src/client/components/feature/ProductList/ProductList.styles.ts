import { css } from '@emotion/css';

export const productListSliderContainer = () => css`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;
export const productGridListContainer = () => css`
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }
`;
