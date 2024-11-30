import fs from 'fs'
import path from 'path'
import xlsx from 'xlsx'
import chalk from 'chalk'
import ora from 'ora'
const spinner = ora()
const transformLanguage = (rootDirectory, languageConfig) => {
  // 输出配置
  let result = languageConfig.output.map((config) => {
    const { key, value } = config
    const outputPath = path.join(
      rootDirectory,
      `/src/generated/lang/`,
      `${key}.ts`
    )
    // const outputPath = path.join(rootDirectory, `/src/generated/lang/`,`${key}.ts`).replace(/\\/g, '/');
    ensureDirectoryExists(path.dirname(outputPath))
    return { key, value, path: outputPath, object: {} }
  })

  // 根据 input文件的fileName，来获取完整文件地址，以此读取xlsx每一条
  const xlsxFiles = languageConfig.input
    .filter((file) => file.fileName.endsWith('.xlsx'))
    .map((item) => item.fileName)
  let langDir = path.join(rootDirectory, '/tools/lang/')
  // 存储已处理的 key
  const processedKeys = new Set()
  // 开始做循环，解析每一个表
  xlsxFiles.forEach((fileName) => {
    const filePath = path.join(langDir, fileName)
    // 根据路径，读取文件
    const workbook = xlsx.read(fs.readFileSync(filePath), { type: 'array' })
    const fileIndex = languageConfig.input.findIndex(
      (item) => item.fileName === fileName
    )
    // 异常处理函数
    if (fileIndex === -1) {
      handleError(chalk.red.bold(`文件 ${fileName} 没有在配置中定义`))
    }
    const sheetNames = languageConfig.input[fileIndex].sheetNames
    sheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName]
      const sheetData = xlsx.utils.sheet_to_json(sheet)

      // 此时获取到了xlsx的json 数据，怎么跟输出配置做匹配呢？
      sheetData.forEach((json) => {
        if (processedKeys.has(json['key'])) {
          handleError(
            chalk.red.bold(
              `文件 ${fileName} 的工作表 ${sheetName} 存在重复的 key: ${json['key']}`
            )
          )
        }
        processedKeys.add(json['key'])
        // 匹配到key，把value 赋值给对应的key
        result.forEach((config) => {
          const { key, value, path, object } = config
          let newValue = json[value] + ''
          console.log('newValue', newValue)
          newValue = newValue.replace(
            /%(\d+)\$@/g,
            (match, index) => `{param${index}}`
          )
          object[json['key']] = newValue
        })
      })
    })
  })
  // 生成 TypeScript 文件
  result.forEach((config) => {
    const { key, value, path, object } = config
    // const content = `export default\n{ \n${toSingleQuotedValues(object)}};`;
    const content = `export default ${JSON.stringify(object, null, 2)};`
    fs.writeFileSync(path, content, { recursive: true })
    spinner.succeed(chalk.green(`文件已保存：${path}`))
  })
}
/**
 * 辅助函数，将对象的值包裹在单引号中
 * @param obj
 * @returns
 */
function toSingleQuotedValues(obj) {
  const entries = Object.entries(obj).map(([key, value]) => {
    const quotedValue = value?.includes("'") ? `${value}` : `'${value}'`
    return `  ${key}: ${quotedValue}`
  })
  return entries.join(',\n')
}
/**
 * 辅助函数，确保输出目录存在，不存在则创建
 * @param directoryPath 路径
 */
function ensureDirectoryExists(directoryPath) {
  try {
    fs.mkdirSync(directoryPath, { recursive: true })
  } catch (error) {
    handleError(chalk.red.bold(`创建目录失败: ${directoryPath}: ${error}`))
  }
}
/**
 * 异常处理
 * @param errorMessage
 */
function handleError(errorMessage) {
  spinner.fail(chalk.red.bold(errorMessage))
  process.exit(1)
}

const xlsxTransformLanguage = () => {
  // 获取当前目录
  let rootDirectory = process.cwd()

  spinner.start()
  spinner.text = 'language脚本生成中...'

  // 获取json 文件
  let languageConfig = JSON.parse(
    fs.readFileSync(
      path.join(rootDirectory, '/tools/lang/lang-config.json'),
      'utf-8'
    )
  )
  transformLanguage(rootDirectory, languageConfig)
}
xlsxTransformLanguage()
