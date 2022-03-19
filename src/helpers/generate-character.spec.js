import { describe, it, expect } from '@jest/globals'

import { generateCharacter } from './generate-character'

describe('generateCharacter', () => {
  it('Should be a function', () => {
    expect(generateCharacter).toBeInstanceOf(Function)
  })

  it('Should return a string', () => {
    const returned = generateCharacter()
    expect(typeof returned).toBe('string')
  })

  it('Should has the length 1', () => {
    const returned = generateCharacter()
    expect(returned).toHaveLength(1)
  })
})
