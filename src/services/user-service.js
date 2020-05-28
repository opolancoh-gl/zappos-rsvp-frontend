import http from './http-api-service';

const serviceRoute = '/users';

export default {
  async getAll(/* page, limit */) {
    // [to be implemented] page, limit
    const response = await http.get(`${serviceRoute}`);
    return response;
  },
  async getAllCount() {
    const response = await http.get(`${serviceRoute}`);
    return response.data.length;
  },
  async getById(id) {
    const response = await http.get(`${serviceRoute}/${id}`);
    return response;
  },
};
