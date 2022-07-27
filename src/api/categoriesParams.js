import request from '@/utils/request'

export const getcategoriesParams = () => {
  return request({
    url: 'categories',
    params: {

    }
  })
}

export const categoriesDelete = (id, attrid) => {
  return request({
    method: 'DELETE',
    url: `categories/${id}/attributes/${attrid}`
  })
}
// eslint-disable-next-line camelcase
export const addCategoriesAction = ({ id, attr_name, attr_sel }) => {
  return request({
    method: 'POST',
    url: `categories/${id}/attributes`,
    data: {
      attr_name,
      attr_sel
    }
  })
}
// eslint-disable-next-line camelcase
export const EdirParams = (id, attrId, { attr_sel, attr_name }) => {
  return request({
    method: 'PUT',
    url: `categories/${id}/attributes/${attrId}`,
    data: {
      attr_sel,
      attr_name
    }
  })
}
