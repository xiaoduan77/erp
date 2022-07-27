import request from '@/utils/request'

export const getPermissionData = () => {
  return request({
    url: 'rights/list'
  })
}
