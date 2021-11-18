#!/usr/bin/env node

'use strict'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'

import { generateCharacter } from './helpers/index.js'

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
      .map(() => new Worker(import.meta.url.replace('file://', ''), {
        workerData: {
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
    const { text } = workerData

    let input = ''
    let charactersCount = 0

    while (!input.includes(text)) {
      const character = generateCharacter()
      input += character

      if (input.length > 10000) {
        input = input.substring(1)
      }

      charactersCount++
    }

    parentPort.postMessage({
      input,
      charactersCount
    })
  }
}

main()
