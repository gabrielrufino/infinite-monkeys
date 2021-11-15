'use strict'

async function main () {
  const [,, text] = process.argv
  let input = ''
  let charactersCount = 0

  while (!input.includes(text)) {
    const character = String.fromCharCode(
      Math.floor(Math.random() * 128)
    )
    input += character

    if (input.length > 10000) {
      input = input.substring(1)
    }

    charactersCount++
  }

  console.log(text, input, charactersCount)
}

main()
