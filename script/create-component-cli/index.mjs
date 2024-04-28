import fs from 'fs'
import path from 'path'
import ls from 'log-symbols'
import artTemplate from 'art-template'
import { getUserName, getUserEmail, getNames, TEMPLATE_ROOT } from './utils.mjs'
import { componentsDir } from '../utils.mjs'

export default function init(config) {
  const { componentsPlatform, componentName, readme, demo, test } = config

  const COMPONENTS_ROOT = path.resolve(
    process.cwd(),
    `./${componentsDir}/${componentsPlatform}/src`
  )

  const { kebabCaseName, pascalCaseName, camelCaseName } =
    getNames(componentName)

  const templateData = {
    ...config,
    componentsPlatform,
    kebabCaseName,
    pascalCaseName,
    camelCaseName,
    currentDate: String(new Date()),
    currentUserName: getUserName().trim(),
    currentUserEmail: getUserEmail().trim()
  }

  const files = []

  // index.scss
  files.push({
    fileName: 'index.scss',
    template: path.resolve(TEMPLATE_ROOT, 'index.scss.art'),
    outPutPath: path.resolve(COMPONENTS_ROOT, kebabCaseName)
  })
  // index.vue
  files.push({
    fileName: 'index.vue',
    template: path.resolve(TEMPLATE_ROOT, 'index.vue.art'),
    outPutPath: path.resolve(COMPONENTS_ROOT, kebabCaseName)
  })
  // type.ts
  files.push({
    fileName: 'types.ts',
    template: path.resolve(TEMPLATE_ROOT, 'type.ts.art'),
    outPutPath: path.resolve(COMPONENTS_ROOT, kebabCaseName)
  })
  // readme
  if (readme) {
    files.push({
      fileName: 'README.md',
      template: path.resolve(TEMPLATE_ROOT, 'readme.md.art'),
      outPutPath: path.resolve(COMPONENTS_ROOT, kebabCaseName)
    })
  }
  // demo
  if (demo) {
    files.push({
      fileName: 'index.vue',
      template: path.resolve(TEMPLATE_ROOT, 'demo.vue.art'),
      outPutPath: path.resolve(COMPONENTS_ROOT, `${kebabCaseName}/demo`)
    })
  }
  files.forEach(({ fileName, template, outPutPath }) => {
    if (!fs.existsSync(outPutPath)) fs.mkdirSync(outPutPath)
    const savePath = path.resolve(outPutPath, fileName)
    fs.writeFileSync(savePath, artTemplate(template, templateData))

    console.log(ls.success, savePath)
  })
}
