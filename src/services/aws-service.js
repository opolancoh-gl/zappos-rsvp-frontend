import http from './http-api-service';

const resourceName = 'aws';

export default {
  getPresignedUrl(item) {
    return http.post(`/${resourceName}/presigned-url`, item);
  },
};
