import { api } from './api'

export const ReelService = {
  list: () => api.get('/reels'),
  create: (payload) => api.post('/reels', payload),
}