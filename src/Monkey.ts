import EventEmitter from 'node:events'

import { faker } from '@faker-js/faker'
import { keyboard } from './config/keyboard'

export default class Monkey extends EventEmitter {
  private readonly id: number
  private readonly text: string
  private count: number

  constructor({ id, text }) {
    super({})

    this.id = id
    this.text = text
    this.count = 0
  }

  public type() {
    let input = ''

    while (!input.endsWith(this.text)) {
      const character = faker.string.fromCharacters(keyboard)
      input += character

      if (input.length > 10000) {
        input = input.substring(1)
      }

      this.count++
    }

    this.emit('match', {
      id: this.id,
      input,
      count: this.count,
    })
  }
}
