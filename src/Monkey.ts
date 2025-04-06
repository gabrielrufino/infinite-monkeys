import EventEmitter from 'node:events'

import { faker } from '@faker-js/faker'
import { keyboard } from './config/keyboard'

export default class Monkey extends EventEmitter {
  private readonly id: number
  private readonly text: string

  constructor(params: {
    id: number
    text: string
  }) {
    super({})

    this.id = params.id
    this.text = params.text
  }

  public type() {
    let count = 0
    let input = ''

    while (!input.endsWith(this.text)) {
      const character = faker.string.fromCharacters(keyboard)
      count += 1

      if (input.length > 100) {
        input = input.slice(1) + character
        continue
      }

      input += character
    }

    this.emit('match', {
      id: this.id,
      input,
      count,
    })
  }
}
