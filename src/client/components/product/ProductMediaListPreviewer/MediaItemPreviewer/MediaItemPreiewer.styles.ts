import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
`;

export const video = () => css`
  height: auto;
  object-fit: cover;
  width: 100%;
  max-width: 100vw;

  @media (min-width: 1024px) {
    max-width: 1024px;
  }
`;
