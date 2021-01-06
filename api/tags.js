
import { request } from '@/plugins/request';

export const getTags = () => {
    return request({
        url: `/api/tags`,
        method: 'GET'
      });
}
