import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';

//请求拦截器
axios.interceptors.request.use(
  (config) => {
    const tokenStr = window.sessionStorage.getItem('token');
    if (tokenStr) {
      config.headers['token'] = tokenStr;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
  (success) => {
    //console.log(success);
    //先判断是否正常请求到数据了
    if (success.status && success.status == 200) {
      //再判断请求到的数据的成功或者失败
      if (
        success.data.code == 500 ||
        success.data.code == 401 ||
        success.data.code == 403
      ) {
        Message.error({ message: success.data.message });
        return;
      }
      if (success.data.message) {
        Message.success({ message: success.data.message });
      }
    }
    return success.data;
  },
  (error) => {
    console.log(error);
    if (error.response.status == 504 || error.response.status == 404) {
      Message.error({ message: '服务器被吃了( ╯□╰ )' });
    } else if (error.response.status == 403) {
      Message.error({ message: '权限不足,请联系管理员' });
    } else if (error.response.status == 401) {
      Message.error({ message: '尚未登录,请登录' });
      router.replace('/');
    } else {
      if (error.response.data.message) {
        Message.error({ message: error.response.data.message });
      } else {
        Message.error({ message: '未知错误' });
      }
    }
  }
);

let base = '';

//传送json样式的post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
  });
};

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params,
  });
};

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
  });
};

export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params,
  });
};
