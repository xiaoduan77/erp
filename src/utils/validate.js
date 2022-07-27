/**
 * 判断邮箱
 *
 */

export function Isemail(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
/**
 * 验证手机号
 * @param {*} mobile
 * @returns
 */
export function validMobile(mobile) {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/
  return reg.test(mobile)
}
