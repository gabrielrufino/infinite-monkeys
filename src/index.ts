#!/usr/bin/env node

import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { Worker } from 'node:worker_threads'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { logger } from './config/logger'
import { MonkeyEventEnum } from './enums/monkey-event.enum'

async function main() {
  process.title = 'monkeys'

  const args = yargs(hideBin(process.argv))
    .option('target', {
      type: 'string',
      description: 'Target text to type',
      demmandOption: true,
    })
    .option('threads', {
      type: 'number',
      description: 'Number of threads',
      default: 1,
    })
    .help()
    .parse()

  if (args.threads > os.cpus().length) {
    logger.warn('Number of threads exceeds number of CPU cores')
  }

  const worker = path.join(__dirname, 'worker.cjs')

  const workers = Array.from({ length: args.threads })
    .map((_, index) => {
      return new Worker(worker, {
        workerData: {
          id: index + 1,
          text: args.target,
        },
      })
        .on('message', async (event) => {
          logger.info({ event })

          if (event.type === MonkeyEventEnum.MATCH) {
            await Promise.all(workers.map(worker => worker.terminate()))
            process.exit(0)
          }
        })
    })
}

main()
