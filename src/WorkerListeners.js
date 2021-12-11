'use strict'

export default class MonkeyListeners {  
  static match(event) {
    console.log(event)
    process.exit(0)
  }
}
