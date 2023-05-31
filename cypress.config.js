import { defineConfig } from 'cypress'
import developmentOptions from './fvtt.config.js'

let { baseURL } = developmentOptions

if (!baseURL) {
  baseURL = 'http://localhost:30000'
}

export default defineConfig({
  e2e: {
    baseUrl: baseURL
  },
  viewportWidth: 1920,
  viewportHeight: 1080
})
