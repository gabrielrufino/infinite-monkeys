#!/usr/bin/env node

'use strict'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'

import Monkey from './Monkey.js'

async function main () {
  if (isMainThread) {
    const args = yargs(hideBin(process.argv))
      .command('type [text]', 'Make the monkey type madly')
      .option('monkeys', {
        alias: 'm',
        type: 'number',
        description: 'Number of monkeys',
        default: 1
      })
      .parse()

    const monkeys = Array(args.monkeys)
      .fill(undefined)
      .map((_, index) => new Worker(import.meta.url.replace('file://', ''), {
        workerData: {
          id: index + 1,
          text: args.text
        }
      }))

    monkeys.forEach(monkey => {
      monkey.on('message', result => {
        console.log(result)
        process.exit(0)
      })
    })
  } else {
    const { id, text } = workerData

    const monkey = new Monkey({
      id,
      text,
      onUpdate: () => {},
      onMatch: ({ input, count }) => {
        parentPort.postMessage({
          input,
          charactersCount: count
        })
      }
    })

    monkey.type()
  }
}

main()
