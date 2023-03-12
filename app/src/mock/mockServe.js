import Mock from 'mockjs';
// json不需要对外暴露即可引入
import banner from './banner.json'
import floor from './floor.json'
import userAddress from './userAddress.json'

// Mock.mock( rurl, template )
// 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
Mock.mock('/mock/user/userAddress/auth/findUserAddressList', { code: 200, data: userAddress })