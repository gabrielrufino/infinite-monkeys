import EventEmitter from 'node:events'

import { faker } from '@faker-js/faker'
import { keyboard } from './config/keyboard'
import { MonkeyEventEnum } from './enums/monkey-event.enum'

export class Monkey extends EventEmitter {
  private readonly id: number
  private readonly text: string
  private count: number = 0
  private input: string = ''

  constructor(params: {
    id: number
    text: string
  }) {
    super({})

    this.id = params.id
    this.text = params.text
  }

  public type() {
    while (!this.input.endsWith(this.text)) {
      const character = faker.string.fromCharacters(keyboard)
      this.count += 1

      if (this.count % 100000 === 0) {
        this.notify(MonkeyEventEnum.PROGRESS)
      }

      if (this.input.length > 100) {
        this.input = this.input.slice(1) + character
        continue
      }

      this.input += character
    }

    this.notify(MonkeyEventEnum.MATCH)
  }

  private notify(event: MonkeyEventEnum) {
    this.emit(event, {
      type: event,
      id: this.id,
      input: this.input,
      count: this.count,
    })
  }
}
