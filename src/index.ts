#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { Worker } from 'node:worker_threads'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import WorkerListeners from './WorkerListeners'

async function main() {
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

  const worker = path.join(__dirname, 'worker.cjs')

  Array.from({ length: args.threads })
    .map((_, index) => new Worker(worker, {
      workerData: {
        id: index + 1,
        text: args.target,
      },
    }))
    .forEach((monkey) => {
      monkey.on('message', (event) => {
        WorkerListeners[event.type](event)
      })
    })
}

main()
