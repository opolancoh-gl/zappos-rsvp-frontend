const RESOURCE_NAME = 'aws';
export default {
  getPresignedUrl(item) {
    return this.post(`${RESOURCE_NAME}/presigned-url`, item);
  },
};
