import { getDirName, getStagedFiles, getUnstagedFiles } from './utils'

async function main() {
  const stagedFiles = await getStagedFiles('./')
  const unStagedFiles = await getUnstagedFiles('./')
  const dirName = getDirName()

  console.log('dirname:', dirName)
  console.log('stage files', stagedFiles)
  console.log('unstage files', unStagedFiles)
}

main()
