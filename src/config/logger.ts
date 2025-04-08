import path from 'node:path'
import process from 'node:process'
import pino from 'pino'

export const logger = pino(
  {},
  pino.destination(
    path
      .join(
        process.cwd(),
        `monkeys-${new Date().toISOString()}.log`,
      ),
  ),
)
