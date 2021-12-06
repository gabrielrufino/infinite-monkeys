'use strict'

import { generateCharacter } from './helpers/index.js'

export default class Monkey {
  constructor ({ id, text, onUpdate, onMatch }) {
    this.id = id
    this.text = text
    this.onUpdate = onUpdate
    this.onMatch = onMatch
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

    this.onMatch({
      input,
      count: this.count
    })
  }
}
