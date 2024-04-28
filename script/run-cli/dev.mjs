import { resolve } from 'path'
import inquirer from 'inquirer'
import child_process from 'child_process'
import { componentsDir, libList, filterLibList } from '../utils.mjs'

const prompt = inquirer.createPromptModule()

const selectLib = () => {
  return prompt({
    type: 'list',
    message: '请选择需要本地调试的仓库:',
    name: 'componentsPlatform',
    choices: filterLibList(libList)
  })
}

const run = async () => {
  const { componentsPlatform } = await selectLib()
  child_process.spawn('npm', ['run', 'dev'], {
    // 默认情况下不会将子进程的输出传递给父进程，通过设置stdio选项为inherit来解决
    stdio: 'inherit',
    // 设置执行命令的位置
    cwd: resolve(process.cwd(), `./${componentsDir}/${componentsPlatform}`)
  });
}

run()
