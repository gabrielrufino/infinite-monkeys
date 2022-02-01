#!/usr/bin/env node

'use strict'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Worker, isMainThread, workerData } from 'worker_threads'

import Monkey from './Monkey.js'
import MonkeyListeners from './MonkeyListeners.js'
import WorkerListeners from './WorkerListeners.js'

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

    Array(args.monkeys)
      .fill(undefined)
      .map((_, index) => new Worker(import.meta.url.replace('file://', ''), {
        workerData: {
          id: index + 1,
          text: args.text
        }
      }))
      .forEach(monkey => {
        monkey.on('message', event => {
          WorkerListeners[event.type](event)
        })
      })
  } else {
    const { id, text } = workerData

    const monkey = new Monkey({
      id,
      text
    })

    monkey.on('update', MonkeyListeners.update)
    monkey.on('match', MonkeyListeners.match)

    monkey.type()
  }
}

main()
