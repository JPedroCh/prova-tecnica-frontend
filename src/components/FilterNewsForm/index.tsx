import { useForm } from 'react-hook-form';
import { Button, Flex } from '@chakra-ui/react';
import { ChakraInput } from '../ChakraInput';
import { toast } from '../Toast';
import { theme } from '../../styles/theme';

export type FilterFormValues = {
  titulo: string | undefined;
  descricao: string | undefined;
};

interface FilterNewsFormProps {
  onClose: () => void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterParams: React.Dispatch<React.SetStateAction<FilterFormValues>>;
}

export default function FilterNewsForm({
  onClose,
  refreshRequest,
  setRefreshRequest,
  setFilterParams,
}: FilterNewsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterFormValues>();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setFilterParams(formData);
      setRefreshRequest(!refreshRequest);
      onClose();
      return;
    } catch {
      toast.error('Erro ao tentar filtrar notícia', 'Erro');
    }
  });

  return (
    <form id="filter-news-form" onSubmit={onSubmit}>
      <Flex gap="4rem" flexWrap="wrap">
        <ChakraInput
          label="Título"
          errors={errors.titulo}
          {...register('titulo')}
        />
        <ChakraInput
          label="Descrição"
          errors={errors.descricao}
          {...register('descricao')}
        />
      </Flex>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button onClick={onClose} bg={`${theme.secondary}`} color={'white'}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form="filter-news-form"
          bg={`${theme.background}`}
          color={'white'}
        >
          Filtrar
        </Button>
      </Flex>
    </form>
  );
}
