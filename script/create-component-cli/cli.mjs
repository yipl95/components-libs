import inquirer from 'inquirer'
import { getAllComponents } from './utils.mjs'
import { componentsDir, libList, filterLibList } from '../utils.mjs'
import init from './index.mjs'


const prompt = inquirer.createPromptModule()

let ptf = ''

const generateComponentsPlatform = () =>
  prompt({
    type: 'list',
    message: '请选择组件适用平台:',
    name: 'componentsPlatform',
    choices: filterLibList(libList)
  })

const generateComponentsName = (platform) =>
  prompt({
    type: 'input',
    message:
      '请输入组件名: (e.g: button button-group. 注:kebab-case 中划线命名法)',
    name: 'componentName',
    transformer(val) {
      return val
    },
    validate: function (val) {
      ptf = platform
      if (val) {
        const _allComponents = getAllComponents(`./${componentsDir}/${platform}/src`)
        if (_allComponents.includes(val)) {
          return `组件 ${val} 已存在`
        } else {
          return true
        }
      } else {
        return '请输入正确的组件命名，kebab-case 中划线命名法'
      }
    }
  })

const generateDescription = (platform, name) =>
  prompt({
    type: 'input',
    message: `请输入组件描述`,
    name: 'description',
    default: `这是一个应用在${platform}平台的${name}类组件`
  })

const getConfig = async () => {
  const { componentsPlatform } = await generateComponentsPlatform()
  const { componentName } = await generateComponentsName(componentsPlatform)
  const { description } = await generateDescription(
    componentsPlatform,
    componentName
  )
  return {
    componentsPlatform,
    componentName,
    description,
    readme: true,
    demo: true,
    test: true
  }
}

getConfig().then(init)
