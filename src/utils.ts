import type { ExecaReturnValue } from 'execa'

import { resolve } from 'pathe'
import { execa } from 'execa'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export function getDirName() {
  return dirname(fileURLToPath(import.meta.url))
}

async function resolveFilesWithGitCommand(
  args: string[],
  root: string
): Promise<string[]> {
  let result: ExecaReturnValue

  try {
    result = await execa('git', args, { cwd: root })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    e.message = e.stderr

    throw e
  }

  return result.stdout
    .split('\n')
    .filter((s) => s !== '')
    .map((changedPath) => resolve(root, changedPath))
}

export function getStagedFiles(root: string) {
  return resolveFilesWithGitCommand(['diff', '--cached', '--name-only'], root)
}

export function getUnstagedFiles(root: string) {
  return resolveFilesWithGitCommand(
    ['ls-files', '--other', '--modified', '--exclude-standard'],
    root
  )
}
