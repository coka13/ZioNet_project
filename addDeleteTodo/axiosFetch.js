import axios from "axios";

class AxiosFetch {
  get(url, data = {}, headers = {}) {
    return axios.get(url, data, headers);
  }

  post(url, data = {}, headers = {}) {
    return axios.post(url, data, headers);
  }

  put(url, data = {}, headers = {}) {
    return axios.put(url, data, headers);
  }

  delete(url, headers = {}) {
    return axios.delete(url, headers);
  }
}

export default AxiosFetch;
