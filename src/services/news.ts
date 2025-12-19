import { FilterFormValues } from '../components/FilterNewsForm';
import { NEWS_API } from './baseService';
import { ICreateNews, INews, IPaginationParams } from './models/news';

function createNews(data: ICreateNews) {
  try {
    return NEWS_API({
      method: 'POST',
      data,
      url: `/create`,
    });
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

function getNews(filterParams: FilterFormValues, paginationParams: IPaginationParams) {
  try {
    let titleFilter = '';
    let descriptionFilter = '';
    if (filterParams.titulo !== undefined && filterParams.titulo?.length > 1) {
      titleFilter = `titulo=${filterParams?.titulo}`;
    }
    if (
      filterParams.descricao !== undefined &&
      filterParams.descricao?.length > 1
    ) {
      descriptionFilter = `descricao=${filterParams?.descricao}`;
    }

    const filterQuery = `${titleFilter}&${descriptionFilter}`;

    const paginationQuery = `page=${paginationParams.page}&limit=${paginationParams.limit}`;

    return NEWS_API({
      method: 'GET',
      url: `/list?${paginationQuery}&${filterQuery}`,
    });
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

function updateNews(data: INews) {
  try {
    return NEWS_API({
      method: 'PUT',
      data,
      url: `/update`,
    });
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

function deleteNews(data: INews) {
  try {
    return NEWS_API({
      method: 'DELETE',
      data,
      url: `/delete`,
    });
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

export default {
  createNews,
  getNews,
  updateNews,
  deleteNews,
};
