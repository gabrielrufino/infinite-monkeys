import EventEmitter from 'node:events'

import { faker } from '@faker-js/faker'

export default class Monkey extends EventEmitter {
  private readonly id: number
  private readonly text: string
  private count: number

  constructor({ id, text }) {
    super()

    this.id = id
    this.text = text
    this.count = 0
  }

  type() {
    let input = ''

    while (!input.endsWith(this.text)) {
      const character = faker.string.alpha()
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
