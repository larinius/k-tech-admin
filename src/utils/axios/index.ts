import { isString } from 'lodash-es';
import type { AxiosInterceptor, CreateAxiosOptions } from './axiosConfig';
import { iAxios } from './iAxios';
import { checkStatus } from './axiosStatus';
import { errorData } from './errorConfig';
import { createErrorModal, createErrorMsg } from '@/hooks/web/useMessage';

const interceptor: AxiosInterceptor = {
  requestHook: (res, options) => {
    const { data } = res;
    const { errorMessageMode } = options;
    if (data) {
      if (data.code === -1) {
        if (errorMessageMode === 'modal') {
          createErrorModal(data.message);
        } else if (errorMessageMode === 'message') {
          createErrorMsg(data.message);
        }
        return errorData(res);
      } else {
        const { code, data: dataInfo, message } = data;
        if (!code && !dataInfo && !message) {
          const toData = {
            code: 1,
            data: data,
            message: 'ok',
          };
          return toData;
        }
      }
    }
    return data;
  },

  requestCatchHook: (e, _options) => {
    return Promise.reject(e);
  },

  beforeRequestHook: (config, options) => {
    const { urlPrefix } = options;
    if (urlPrefix && isString(urlPrefix)) config.url = `${urlPrefix}${config.url}`;
    return config;
  },

  requestInterceptors: (config) => {
    const { requestOptions } = config;

    if (requestOptions?.withToken) {
      (config as Recordable).headers._token = 'myToken';
      if (requestOptions?.specialToken)
        (config as Recordable).headers._token = requestOptions?.specialToken;
    }

    return config;
  },

  requestInterceptorsCatch: (error) => {
    return error;
  },

  responseInterceptors: (res) => {
    return res;
  },

  responseInterceptorsCatch: (error: any) => {
    const { response, message, config } = error || {};
    const errorMessageMode = config.requestOptions.errorMessageMode || 'none';
    checkStatus(response ? response.status : 404, message, errorMessageMode);
    return error;
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new iAxios({
    ...{
      acoisadmisf: '',
      // Request time
      timeout: 10 * 1000,
      // (Interceptor) Data processing method
      interceptor,
      headers: { 'Content-Type': 'application/json' },
      // Configuration items (need to be processed in the interceptor), the following options can be covered in independent interface requests
      requestOptions: {
        withToken: true,
        errorMessageMode: 'message',
      },
    },
    ...(opt || {}),
  });
}
export const deffHttp = createAxios();
