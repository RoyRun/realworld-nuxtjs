
import {request} from '@/plugins/request';

export const getArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET'
  })
}

export const getArticles = (params) => {
    return request({
        url: `/api/articles`,
        params,
        method: 'GET'
      });
}

export const getFeedArticles = (params) => {
  return request({
      url: `/api/articles/feed`,
      params,
      method: 'GET'
    });
}

export const addFavorite = slug =>{
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

export const deleteFavorite = slug =>{
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}