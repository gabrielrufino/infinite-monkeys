import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MonkeyEventEnum } from './enums/monkey-event.enum'
import { Monkey } from './monkey'

describe(Monkey.name, () => {
  let monkey: Monkey
  const id = 1
  const text = 'abc'

  beforeEach(() => {
    monkey = new Monkey({ id, text })
  })

  it('should emit MATCH when input ends with the target text', () => {
    const matchListener = vi.fn()
    monkey.on(MonkeyEventEnum.MATCH, matchListener)

    Reflect.set(monkey, 'input', 'ab')
    Reflect.set(monkey, 'count', 0)

    vi.spyOn(faker.string, 'fromCharacters').mockReturnValue('c')

    monkey.type()

    expect(matchListener).toHaveBeenCalledOnce()
    expect(matchListener).toHaveBeenCalledWith({
      type: MonkeyEventEnum.MATCH,
      id,
      input: expect.stringContaining(text),
      count: expect.any(Number),
    })
  })

  it('should emit PROGRESS every 100 iterations', () => {
    const progressListener = vi.fn()
    monkey.on(MonkeyEventEnum.PROGRESS, progressListener)

    vi.spyOn(faker.string, 'fromCharacters').mockReturnValue('x')

    Reflect.set(monkey, 'text', 'unmatchable')

    const originalNotify = Reflect.get(monkey, 'notify').bind(monkey)
    vi.spyOn(monkey as any, 'notify').mockImplementation((event) => {
      if (event === MonkeyEventEnum.PROGRESS && Reflect.get(monkey, 'count') >= 501) {
        throw new Error('StopLoop')
      }
      return originalNotify(event)
    })

    expect(() => monkey.type()).toThrowError('StopLoop')
    expect(progressListener).toHaveBeenCalledTimes(5)
  })
})
