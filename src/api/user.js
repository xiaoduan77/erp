import request from '@/utils/request'

export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username,
      password
    }
  })
}

export const userList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}
export const EdirState = ({ uId, type }) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
}

export const EdirUser = ({ id, email, mobile }) => {
  return request({
    method: 'PUT',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}
export const DeleteUser = ({ id }) => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

export const GetRole = () => {
  return request({
    url: 'roles'
  })
}
