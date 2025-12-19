import { theme } from '../../styles/theme';
import styled from 'styled-components';

export const Background = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  padding: 40px;
  flex-direction: row;
  justify-content: center;
  background-color: gray;
  font-family: ${theme.fontFamily};
  flex-wrap: wrap;
`;
