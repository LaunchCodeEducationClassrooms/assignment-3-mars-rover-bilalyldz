

const Command = require('./command.js');



class Message {
  /**
   * @param name {string}
   * @param commands {Command[]}
   */
  constructor(name, commands) {
    if (!name) {
      throw Error('Message name required.');
    }
    this.name = name;
    
    this.commands = commands;

  }
}

module.exports = Message;