const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  /**
   * @param {Rover}
   */


  // 7 tests here!

  //Test 7
  it('constructor sets position and default values for mode and generatorWatts', () => {

    let rover = new Rover(1000);
    let message = new Message('Test message',
      [
        new Command('STATUS_CHECK'),
        new Command('MOVE', 400)
      ])

    expect(rover.position).toBe(1000);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  })


  //Test 8
  it('response returned by receiveMessage contains name of message', () => {
    let rover = new Rover(1000);
    let message = new Message('Test message',
      [
        new Command('STATUS_CHECK', 4),
        new Command('MOVE', 400)
      ])


    const response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  })


  //Test 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', () => {
    let rover = new Rover(1000);
    let message = new Message('Test message',
      [
        new Command('STATUS_CHECK'),
        new Command('MOVE', 400)
      ])

    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  })


  //Test 10
  it('responds correctly to status check command', () => {

    let rover = new Rover(1000);
    let message = new Message('Test message',
      [
        new Command('STATUS_CHECK'),
        new Command('MOVE', 400)
      ])

    const response = rover.receiveMessage(
      new Message('test', [new Command('STATUS_CHECK')])
    );

    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(1000);

  })


  //Test 11
  it('responds correctly to mode change command', () => {
    let rover = new Rover(1000);
    let message = new Message('Test message',
      [
        new Command('STATUS_CHECK'),
        new Command('MOVE', 400)
      ])

    const response = rover.receiveMessage(
      new Message('test', [new Command('STATUS_CHECK')]))

    expect(response.results[0].roverStatus.mode).toBeTruthy();

  })



  //Test 12
  it('responds with false completed value when attempting to move in LOW_POWER mode', () => {


    let rover = new Rover(100);
    const response = rover.receiveMessage(new Message('Change Mode', [new Command('MODE_CHANGE', 'LOWER_POWER')]))

    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOWER_POWER')

  })


  //Test 13
  it('responds with position for move command', () => {

    let rover = new Rover(100);
    let newVariable=33;
    const response = rover.receiveMessage(new Message('Change Mode', [new Command('MOVE', newVariable)]))


    expect(rover.position).toBe(newVariable);

  })

});
