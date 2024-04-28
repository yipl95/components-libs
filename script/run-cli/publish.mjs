import { resolve } from 'path'
import inquirer from 'inquirer'
import child_process from 'child_process'
import { componentsDir, libList, filterLibList } from '../utils.mjs'

const prompt = inquirer.createPromptModule()

const selectLib = () => {
  return prompt({
    type: 'list',
    message: '请选择需要发包的仓库:',
    name: 'componentsPlatform',
    choices: filterLibList(libList)
  })
}

const selectPublishType = () => {
  return prompt({
    type: 'list',
    message: '请选择发包类型:',
    name: 'componentsType',
    choices: [
      'beta-测试版',
      'official-正式版',
    ]
  })
}

const run = async () => {
  const { componentsPlatform } = await selectLib()
  const { componentsType } = await selectPublishType()

  // 执行 npm run build
  const buildProcess = child_process.spawn('npm', ['run', 'build'], {
    // 默认情况下不会将子进程的输出传递给父进程，通过设置stdio选项为inherit来解决
    stdio: 'inherit',
    // 设置执行命令的位置
    cwd: resolve(process.cwd(), `./${componentsDir}/${componentsPlatform}`)
  });

  // 监听 buildProcess 的 exit 事件
  buildProcess.on('exit', (code) => {
    if (code === 0) {
      // 执行 npm publish
      const type = componentsType.split('-')[0]
      const argument = type === 'official' ? '' : ` --tag ${type}`;
      child_process.spawn('npm', ['publish', `${argument}`], {
        stdio: 'inherit',
        cwd: resolve(process.cwd(), `./${componentsDir}/${componentsPlatform}`)
      });
    } else {
      console.log("🚀 ~ npm run build failed")
    }
  });
}

run()
