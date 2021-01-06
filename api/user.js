
import {request} from '@/plugins/request';

export const login = (data) => {
    return request({
        url: '/api/users/login',
        data,
        method: 'POST'
      });
}
// 注册
export const register = data => {
    return request({
        url: '/api/users',
        data,
        method: 'POST'
    })
}