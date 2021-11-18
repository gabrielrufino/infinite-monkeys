'use strict'

export function generateCharacter() {
  const character = String.fromCharCode(
    Math.floor(Math.random() * 128)
  )

  return character
}
