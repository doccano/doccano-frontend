import { defineNitroConfig } from 'nitropack/config'

// https://nitro.unjs.io/config#devproxy
// https://github.com/http-party/node-http-proxy#options
export default defineNitroConfig({
  devProxy: {
    '/v1/': {
      target: process.env.API_URL ?? 'http://127.0.0.1:8000/v1'
    },
    '/media': {
      target: process.env.API_URL ?? 'http://127.0.0.1:8000/media'
    }
  }
})
