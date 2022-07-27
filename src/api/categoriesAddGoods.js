import request from '@/utils/request'

export const getcategoriesParams = ({ type, pagenum, pagesize }) => {
  return request({
    url: 'categories',
    params: {
      type, pagenum, pagesize
    }
  })
}

// eslint-disable-next-line camelcase
export const Addcategories = ({ cat_pid, cat_name, cat_level }) => {
  return request({
    method: 'POST',
    url: 'categories',
    data: {
      cat_pid, cat_name, cat_level
    }
  })
}
