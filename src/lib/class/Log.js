export class Log {
  constructor() {
    this.msgQueue = [];
  }

  addMessage(msg) {
    this.msgQueue.push(msg);
  }

  takeMessage() {
    return this.msgQueue.shift();
  }
}

export class LogMessage {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}