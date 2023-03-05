import { css } from '@emotion/css';

export const container = () => css`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
`;

export const logo = () => css`
  display: flex;
`;

export const logoImage = () => css`
  height: auto;
  max-width: 100%;
`;

export const orderLink = () => css`
  display: flex;
  padding: 4px;
`;

export const signInButton = () => css`
  display: flex;
  padding: 4px;
`;
