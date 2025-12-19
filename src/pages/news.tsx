import Layout from '../components/Layout';
import { Modal } from '../components/Modal';
import CreateNewsForm from '../components/CreateNewsForm';
import { useEffect, useState } from 'react';
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useDisclosure,
  Text,
  Icon,
  Select,
} from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';
import {
  INews,
  IPaginatedNews,
  IPagination,
  IPaginationParams,
} from '../services/models/news';
import newsService from '../services/news';
import { AxiosResponse } from 'axios';
import { toast } from '../components/Toast';
import UpdateNewsForm from '../components/UpdateNewsForm';
import { MdDeleteForever } from 'react-icons/md';
import DeleteNewsForm from '../components/DeleteNewsForm';
import { IoAdd } from 'react-icons/io5';
import FilterNewsForm, { FilterFormValues } from '../components/FilterNewsForm';
import { CiSearch } from 'react-icons/ci';
import { TiDeleteOutline } from 'react-icons/ti';

const News = () => {
  const clearFilterParams = {
    titulo: undefined,
    descricao: undefined,
  };
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [filterParams, setFilterParams] =
    useState<FilterFormValues>(clearFilterParams);
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [selectedNews, setSelectedNews] = useState<INews>();
  const [paginationParams, setPaginationParams] = useState<IPagination>();
  const [selectedPaginationParams, setSelectedPaginationParams] =
    useState<IPaginationParams>({
      limit: 5,
      page: 1,
    });
  const {
    isOpen: isOpenCreateNewsModal,
    onClose: onCloseCreateNewsModal,
    onOpen: onOpenCreateNewsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenFilterNewsModal,
    onClose: onCloseFilterNewsModal,
    onOpen: onOpenFilterNewsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateNewsModal,
    onClose: onCloseUpdateNewsModal,
    onOpen: onOpenUpdateNewsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteNewsModal,
    onClose: onCloseDeleteNewsModal,
    onOpen: onOpenDeleteNewsModal,
  } = useDisclosure();

  const handleUpdate = (news: INews) => {
    if (news) setSelectedNews(news);
    onOpenUpdateNewsModal();
  };

  const handleDelete = (news: INews) => {
    if (news) setSelectedNews(news);
    onOpenDeleteNewsModal();
  };

  const removeFilterCondition =
    (filterParams.titulo !== undefined && filterParams.titulo?.length > 1) ||
    (filterParams.descricao !== undefined &&
      filterParams.descricao?.length > 1);

  const pageOptions = Array.from(
    { length: paginationParams?.totalPages ?? 1 },
    (_, i) => i + 1
  );

  const limitOptions = [5, 10, 15, 20];

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<IPaginatedNews[]> =
        await newsService.getNews(filterParams, selectedPaginationParams);
      setPaginationParams(data?.[0]?.meta);
      setNewsList(data?.[0]?.data);
    } catch (error) {
      setNewsList([]);
      toast.error('Nenhuma notícia encontrado');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [refreshRequest, filterParams, selectedPaginationParams]);

  return (
    <Layout direction="column">
      <Text fontSize="7xl" textAlign="center" color="white">
        Notícias
      </Text>
      <Flex gap="20px" display="flex" wrap="wrap" justifyContent="center">
        <Flex
          onClick={() => onOpenCreateNewsModal()}
          bgColor="whiteAlpha.500"
          marginBottom="20px"
          borderRadius="10px"
          cursor="pointer"
          gap="20px"
          alignItems="center"
          padding="10px"
          _hover={{ transform: 'scale(1.02)' }}
        >
          <Text fontSize="xl">Criar Notícia</Text>
          <Icon as={IoAdd} boxSize={10} />
        </Flex>
        <Flex
          onClick={() => onOpenFilterNewsModal()}
          bgColor="whiteAlpha.500"
          marginBottom="20px"
          borderRadius="10px"
          cursor="pointer"
          gap="20px"
          alignItems="center"
          padding="10px"
          _hover={{ transform: 'scale(1.02)' }}
        >
          <Text fontSize="xl">Filtrar</Text>
          <Icon as={CiSearch} boxSize={10} />
        </Flex>
        {removeFilterCondition && (
          <Flex
            onClick={() => setFilterParams(clearFilterParams)}
            bgColor="whiteAlpha.500"
            marginBottom="20px"
            borderRadius="10px"
            cursor="pointer"
            gap="20px"
            alignItems="center"
            padding="10px"
            _hover={{ transform: 'scale(1.02)' }}
          >
            <Text fontSize="xl">Remover Filtros</Text>
            <Icon as={TiDeleteOutline} boxSize={10} />
          </Flex>
        )}
      </Flex>
      <TableContainer
        borderRadius="15px"
        height="55vh"
        whiteSpace="inherit"
        fontSize="sm"
        overflowY="auto"
        backdropFilter="blur(8px)"
        bg="whiteAlpha.500"
      >
        <Table variant="simple" width="100%">
          <Thead fontWeight="semibold">
            <Tr width="100%">
              <Td>ID</Td>
              <Td>Título</Td>
              <Td>Descrição</Td>
              <Td />
              <Td />
            </Tr>
          </Thead>
          <Tbody fontWeight="semibold" maxHeight="200px">
            {newsList.map((news) => (
              <Tr key={news.id}>
                <Td>{news.id}</Td>
                <Td>{news.titulo}</Td>
                <Td>{news.descricao}</Td>
                <Td onClick={() => handleUpdate(news)} width="5%">
                  <button>
                    <BiEditAlt size={23} />
                  </button>
                </Td>
                <Td onClick={() => handleDelete(news)} width="5%">
                  <button>
                    <MdDeleteForever size={23} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="center" gap="20px" display="flex" marginTop="20px">
        <Flex gap="20px" display="flex" alignItems="center" color="white">
          Exibir
          <Select
            value={selectedPaginationParams.limit}
            onChange={(e) =>
              setSelectedPaginationParams({
                ...selectedPaginationParams,
                limit: Number(e.target.value),
              })
            }
          >
            {limitOptions.map((limitOption) => (
              <option key={limitOption} value={limitOption}>
                {limitOption}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex gap="20px" display="flex" alignItems="center" color="white">
          Página
          <Select
            value={selectedPaginationParams.page}
            onChange={(e) =>
              setSelectedPaginationParams({
                ...selectedPaginationParams,
                page: Number(e.target.value),
              })
            }
          >
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Modal
        title={`Filtrar Notícias`}
        isOpen={isOpenFilterNewsModal}
        onClose={onCloseFilterNewsModal}
        size="4xl"
      >
        <Flex
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="16px"
        >
          <FilterNewsForm
            onClose={onCloseFilterNewsModal}
            refreshRequest={refreshRequest}
            setRefreshRequest={setRefreshRequest}
            setFilterParams={setFilterParams}
          />
        </Flex>
      </Modal>
      <Modal
        title={`Criar Notícia`}
        isOpen={isOpenCreateNewsModal}
        onClose={onCloseCreateNewsModal}
        size="4xl"
      >
        <Flex
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="16px"
        >
          <CreateNewsForm
            onClose={onCloseCreateNewsModal}
            refreshRequest={refreshRequest}
            setRefreshRequest={setRefreshRequest}
          />
        </Flex>
      </Modal>
      <Modal
        title={`Atualizar Notícia`}
        isOpen={isOpenUpdateNewsModal}
        onClose={onCloseUpdateNewsModal}
        size="4xl"
      >
        <Flex
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="16px"
        >
          <UpdateNewsForm
            onClose={onCloseUpdateNewsModal}
            refreshRequest={refreshRequest}
            setRefreshRequest={setRefreshRequest}
            selectedNews={selectedNews}
          />
        </Flex>
      </Modal>
      <Modal
        title={`Remover Notícia`}
        isOpen={isOpenDeleteNewsModal}
        onClose={onCloseDeleteNewsModal}
        size="4xl"
      >
        <Flex
          height="100%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="16px"
        >
          <DeleteNewsForm
            onClose={onCloseDeleteNewsModal}
            refreshRequest={refreshRequest}
            setRefreshRequest={setRefreshRequest}
            selectedNews={selectedNews}
          />
        </Flex>
      </Modal>
    </Layout>
  );
};

export default News;
