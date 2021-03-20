class Command {
  
  /**
   * @param {String} commandType
   * @param {any} value
   */
  constructor(commandType, value) {

    if (!commandType) {
      throw Error("Command type required.");
    }
    this.commandType = commandType;
    
    this.value = value;
  }

}

module.exports = Command;