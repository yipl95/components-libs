import { readdirSync, lstatSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

export const __dirname = dirname(fileURLToPath(import.meta.url))

const filterDir = (list, parentPath) => {
  return list.filter((item) => {
    return lstatSync(resolve(parentPath, item))?.isDirectory()
  })
}

// 组件存放文件夹
export const componentsDir = 'components'

// 组件库存放路径
export const FROM_DIR = join(__dirname, `../${componentsDir}`)

// 控制台弹出选择组件库时，需要放置在前面的库
export const frontLib = ['pc']

// 组件库所在文件夹列表
export const libList = filterDir(readdirSync(FROM_DIR, 'utf-8'), FROM_DIR)

// 将指定数组放在目标数组最前面
export const filterLibList = (repos) => {
  return repos.sort((a, b) => {
    if (frontLib.includes(a) && !frontLib.includes(b)) {
      return -1;
    } if (!frontLib.includes(a) && frontLib.includes(b)) {
      return 1;
    } 
    return 0;
  });
}
