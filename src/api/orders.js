import request from '@/utils/request'

export const getOrders = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'orders',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
