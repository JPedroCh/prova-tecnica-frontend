import { theme } from '../../styles/theme';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: white;
  box-shadow: ${theme.boxShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 40px;
  flex-direction: column;
  height: 100%;
  margin: 15px;
  min-width: min-content;
  max-width: 700px;
`;

export const Title = styled.h1`
  color: black;
`;
