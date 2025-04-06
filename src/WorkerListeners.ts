import process from 'node:process'
import { logger } from './config/logger'

export default class WorkerListeners {
  static match(event) {
    logger.info({ ...event })
    process.exit(0)
  }
}
