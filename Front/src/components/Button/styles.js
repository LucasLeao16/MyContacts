import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  padding: 0 16px;
  border: none;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgb(0, 0, 0, 0.04);
  height: 52px;
  border-radius: 4px;
  outline: none;
  padding: 0px 16px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }
  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
  &[disabled] {
    background: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background-color: ${theme.colors.danger.main};
      &:hover {
        background-color: ${theme.colors.danger.light};
      }
      &:active {
        background-color: ${theme.colors.danger.dark};
      }
    `}
`;
