import { PER_PAGE_DEFAULT } from '@/constatns/paginations';
import { Lead, StatusesLead } from '@/types/lead';
import instance from './instance';

interface ParamsRequestList {
  page: number;
  size: number;
  status: StatusesLead | null;
  search?: string;
}

interface ResponseList {
  currentPage: number;
  items: Lead[];
  totalElements: number;
  totalPages: number;
}

const Api = {
  getList({
    page = 0,
    size = PER_PAGE_DEFAULT,
    status,
    search,
  }: Partial<ParamsRequestList>): Promise<ResponseList> {
    return instance.get('/api/v2/contrlead/list', {
      params: {
        page,
        size,
        status,
        search,
      },
    })
      .then((response) => response.data.data);
  },
};

export default Api;
