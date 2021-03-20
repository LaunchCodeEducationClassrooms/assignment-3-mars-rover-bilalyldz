
const Message = require('./message.js');
const Command = require('./command.js');



class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  /**
   * @param {Message}
   */

  //  new Message('Test message',
  // [
  //   new Command('STATUS_CHECK'),
  //   new Command('text', 400)
  // ]
  receiveMessage(message) {

    const results = [];

    if (message.commands) {
      for (const CC of message.commands) {
        let result;
        if (CC.commandType == "STATUS_CHECK") {
          result = {
            completed: true,
            roverStatus: {
              position: this.position,
              mode: this.mode,
              generatorWatts: this.generatorWatts
            }
          }
        } else if (CC.commandType == "MODE_CHANGE") {
          this.mode = CC.value;
          result = { completed: true }
        } else if (CC.commandType == "MOVE") {
          if (this.mode == "NORMAL") {
            this.position = CC.value;
            result = { completed: true }
          }
           else if (CC.commandType == "LOW_POWER") {
            result = { completed: false }
          }
        }
        //console.log(result)
        results.push(result)
      }

    }
    return {
      message: message.name,
      results
    }
  }
}

module.exports = Rover;