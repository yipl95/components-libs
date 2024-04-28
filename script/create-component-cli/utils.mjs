import glob from 'glob'
import path from 'path'
import { spawnSync } from 'child_process'
import { __dirname } from '../utils.mjs'

/**
 * 获取目录下所有组件名称
 * @param {string} componentsRoot  组件根目录
 */
export const getAllComponents = (
  componentsRoot = path.resolve(process.cwd(), 'src')
) => {
  const all = glob.sync(`*`, { cwd: componentsRoot })
  return all.map((v) => v.split('/')[0])
}

/**
 * 获取git用户名
 */
export const getUserName = () => {
  const { status, stdout } = spawnSync('git', ['config', 'user.name'])
  if (status === 0) {
    return stdout.toString()
  }
}
/**
 * 获取git用户邮箱
 */
export const getUserEmail = () => {
  const { status, stdout } = spawnSync('git', ['config', 'user.email'])
  if (status === 0) {
    return stdout.toString()
  }
}

/**
 * 判断工作区是否干净的
 */
export const isCleanWorkspace = () => {
  const { status, stdout } = spawnSync('git', ['status', '-s'])
  if (status === 0) {
    return !stdout.toString()
  }
}

/**
 * 首字母大写
 * @param {string} str 字符串
 */
export const firstItemUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 获取不同命名规则的名称
 * @param {*} str
 */
export const getNames = (str) => {
  const nameObj = str.split('-')
  return {
    kebabCaseName: str,
    pascalCaseName: nameObj.map((key) => firstItemUpperCase(key)).join(''),
    camelCaseName: nameObj
      .map((key, index) => (index !== 0 ? firstItemUpperCase(key) : key))
      .join('')
  }
}

export const TEMPLATE_ROOT = path.resolve(__dirname, './create-component-cli/template')

