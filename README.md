<p align="center">
  <img src="./assets/monkeys-typing.png" width="300px" alt="Monkeys typing" />
</p>
<h1 align="center">Infinite monkeys</h1>

[![Black Tech by Gabriel Rufino](https://img.shields.io/badge/Black_Tech-by_Gabriel_Rufino_%F0%9F%96%A4-white?style=flat-square&labelColor=444444)](https://gabrielrufino.com)
[![CI](https://github.com/gabrielrufino/infinite-monkeys/actions/workflows/ci.yml/badge.svg)](https://github.com/gabrielrufino/infinite-monkeys/actions/workflows/ci.yml)

> The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type any given text, including the complete works of William Shakespeare. Source: [Wikipedia](https://en.wikipedia.org/wiki/Infinite_monkey_theorem)

CLI simulating infinite monkeys

## Getting started

1. Setup the CLI

```sh
git clone https://github.com/gabrielrufino/infinite-monkeys.git
cd infinite-monkeys
npm ci
npm run build
npm link
```

2. Execute the CLI
```sh
monkeys type "Hello" --threads 4
```
