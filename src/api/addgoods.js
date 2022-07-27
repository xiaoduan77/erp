import request from '@/utils/request'

export const getAddList = (type) => {
  return request({
    url: 'categories',
    params: {
      type
    }
  })
}

export const getParams = (id, sel) => {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}
