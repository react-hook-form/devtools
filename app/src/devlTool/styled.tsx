import styled from '@emotion/styled';
import colors from './colors';

const Button = styled.button`
  appearance: none;
  margin: 0;
  border: 0;
  color: white;
  padding: 5px;
  border-radius: 0;
  background: ${colors.blue};
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
  }
`;

const CircleButton = styled(Button)`
  font-size: 14px;
  font-weight: bold;
  margin: 0 4px 0 auto;
  background: none;
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  line-height: 14px;
  border-radius: 50%;
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
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
