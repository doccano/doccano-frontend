import axios, { type AxiosInstance } from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class BaseRepository {
  private readonly instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
  }

  async get(url: string, config: Record<string, any> = {}) {
    return await this.instance({ method: 'GET', url, ...config })
  }

  async post(url: string, data: Record<string, any> = {}, config: Record<string, any> = {}) {
    return await this.instance({ method: 'POST', url, data, ...config })
  }

  async put(url: string, data: Record<string, any> = {}, config: Record<string, any> = {}) {
    return await this.instance({ method: 'PUT', url, data, ...config })
  }

  async patch(url: string, data: Record<string, any> = {}, config: Record<string, any> = {}) {
    return await this.instance({ method: 'PATCH', url, data, ...config })
  }

  async delete(url: string, data: Record<string, any> = {}, config: Record<string, any> = {}) {
    return await this.instance({ method: 'DELETE', url, data, ...config })
  }
}

export default BaseRepository
