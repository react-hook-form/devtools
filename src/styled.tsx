import styled from '@emotion/styled';

import colors from './colors';

export const paraGraphDefaultStyle = {
  fontSize: 13,
  lineHeight: '20px',
};

const Button = styled.button<{ hideBackground?: boolean }>`
  appearance: none;
  margin: 0;
  border: 0;
  color: white;
  padding: 5px !important;
  border-radius: 0 !important;
  background: ${(props: { hideBackground?: boolean }) =>
    props.hideBackground ? `` : `${colors.blue} !important`};
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
  }
`;

Button.defaultProps = { type: 'button' };

const CircleButton = styled(Button)`
  font-size: 14px;
  font-weight: bold;
  margin: 0 4px 0 auto;
  background: none !important;
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  line-height: 14px !important;
  border-radius: 50% !important;
  padding: 0 !important;
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
  }

  &:active {
    background: black;
  }
`;

const Input = styled.input`
  &::placeholder {
    color: #b3b3b3;
  }

  &:focus::placeholder {
    color: white;
  }
`;

const Table = styled.table`
  transition: 0.3s all;

  &:hover {
    background: ${colors.primary};
  }
`;

export { Button, CircleButton, Input, Table };
