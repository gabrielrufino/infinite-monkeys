import process from 'node:process'

export default class WorkerListeners {
  static match(event) {
    console.log(event)
    process.exit(0)
  }
}
