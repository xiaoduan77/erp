import request from '@/utils/request'

export const getList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
