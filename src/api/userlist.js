import request from '@/utils/request'

export const getRoleList = () => {
  return request({
    url: 'roles'

  })
}
export const getPermission = (type) => {
  return request({
    url: `rights/${type}`
  })
}

export const RoleRight = (roleId, rids) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
export const AddRoles = ({ roleName, roleDesc }) => {
  return request({
    method: 'POST',
    url: 'roles',
    data: {
      roleName,
      roleDesc
    }
  })
}
export const DelectRole = (id) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
}

export const deleteRole = (roleId, rightId) => {
  return request({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
