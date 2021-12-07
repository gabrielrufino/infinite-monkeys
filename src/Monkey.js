'use strict'

import EventEmitter from 'events'

import { generateCharacter } from './helpers/index.js'

export default class Monkey extends EventEmitter {
  constructor ({ id, text, onUpdate }) {
    super()

    this.id = id
    this.text = text
    this.onUpdate = onUpdate
    this.count = 0
  }

  type () {
    let input = ''

    while (!input.includes(this.text)) {
      const character = generateCharacter()
      input += character

      if (input.length > 10000) {
        input = input.substring(1)
      }

      this.count++
    }

    this.emit('match', {
      input,
      count: this.count
    })
  }
}
