//拦截器相关配置
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import { baseUrl } from "./.env";
import { showLoading, hideLoading } from './loading';

import router from '../src/router/index'
const service = axios.create({ baseURL: baseUrl, timeout: 60000 });
//请求拦截器
service.interceptors.request.use(async config => {
    if (localStorage.getItem('userinfo')) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = JSON.parse(localStorage.getItem('userinfo')).token  //请求头加上token
    }
    if (config.data) {
        if (config.data.get) {
            config.headers['Content-Type'] = 'multipart/form-data'
        } else {
            config.method === 'post'
                ? config.data = qs.stringify({ ...config.data }) //序列化请求的数据
                : config.params = { ...config.params };
        }
    }
    showLoading();//加载请求动画
    return config
},
    (error) => {
        //错误请求处理
        Message({ type: 'error', message: '参数错误' })
        return Promise.reject(error);
    }
)

//响应拦截器
service.interceptors.response.use(async response => {
    if(response.data===-207){
        //用户身份过期，清空所有登录信息
        localStorage.removeItem('userinfo')
        Message.error('用户身份过期，请重新登录')
        router.push('/login')
    }
    hideLoading();//取消请求动画
    return response;
},
    (error) => {
        hideLoading();
        Message({ type: 'error', message: '网络错误' })
        return Promise.reject(error) // 返回接口返回的错误信息
    }
)

class http {
    // 使用async ... await
    /**
     * axios get 请求封装
     * @param {*} url 接口地址
     * @param {*} params 接口参数？可选 { type:object }
     
     */
    static async get(url, params) {
        return await service.get(url, { params })
    }
    /**
     * axios post 请求封装
     * @param {*} url 接口地址
     * @param {*} params 接口参数？可选 { type:object }
     
     */
    static async post(url, params) {

        return await service.post(url, params);
    }
}

export default http;
