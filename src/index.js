#!/usr/bin/env node

'use strict'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { generateCharacter } from './helpers/index.js'

async function main () {
  const args = yargs(hideBin(process.argv))
    .command('type [text]', 'Make the monkey type madly')
    .option('monkeys', {
      alias: 'm',
      type: 'number',
      description: 'Number of monkeys'
    })
    .parse()

  let input = ''
  let charactersCount = 0

  while (!input.includes(args.text)) {
    const character = generateCharacter()
    input += character

    if (input.length > 10000) {
      input = input.substring(1)
    }

    charactersCount++
  }

  console.log(args.text, input, charactersCount)
}

main()
