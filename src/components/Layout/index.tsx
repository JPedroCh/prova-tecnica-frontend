import { PropsWithChildren } from 'react';
import { Background } from './styles';
import { Button, Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
interface LayoutProps {
  direction: 'row' | 'column';
  justifyContent?: 'center' | 'start';
  alignItems?: 'center' | 'start';
}

const Layout = ({ children, direction, justifyContent, alignItems }: PropsWithChildren<LayoutProps>) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Background style={{ flexDirection: direction, justifyContent: justifyContent, alignItems: alignItems }} >
      <Flex
        justifySelf="start"
        alignSelf="start"
      >
        {
          location.pathname !== '/' &&
          (<Button
          type="submit"
          form="create-news-form"
          bg="transparent"
          border="1px solid white"
          color={'white'}
          onClick={() => navigate(-1)}
          _hover={{
            color: "black",
            transform: "scale(1.03)",
            bg: "white"
          }}
        >
          Voltar
        </Button>)
        }
      </Flex>
      {children}
    </Background>
  );
};

export default Layout;
