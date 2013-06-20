# RaspiRobot
A Node.js library to control SparkFun's [RaspiRobot board](https://www.sparkfun.com/products/11561).

Based on [GpiO](https://github.com/EnotionZ/GpiO) by EnotionZ.

## Installation
**You will need node.js installed on your Raspberry Pi to use this library.**
You can install node.js on Raspbian using `apt-get install nodejs` as root.

RaspiRobot is an npm package, so you can use the following to install it;

	npm install RaspiRobot
	
## Usage
**Standard Usage**

	var robot = require("RaspiRobot"); // Import the library
	robot.setup(); // Set up GPIO ports
	
	robot.setLED(1, 1); // Turn on LED 1
	robot.setMotor("left", 1); // Turn on the left motor
	robot.setMotor("right", 1, 1); // Turn on the right motor

**Input**

	var robot = require("RaspiRobot"); // Import the library
	robot.setup(); // Set up GPIO ports
	
	robot.setSwitchCallback(1, function(value) // Set the switch callback to a function
	{
		console.log("Switch changed to "+value); // Output the new value of the switch
	});

## Methods
A list of all the available RaspiRobot methods can be found below

`setup()` - Sets up the GPIO ports for SparkFun's [RaspiRobot board](https://www.sparkfun.com/products/11561).

`setGPIO(gpio)` - Set the GPIO variable to be used (needs to be functionally identical to the [default library](https://github.com/EnotionZ/GpiO)).

`getGPIO()` - Get the GPIO variable being used.

`setMotor(side, value, [direction])` - Set the motor to on or off (1 or 0) using an optional motor direction.

`getMotor(side)` - Returns information about the motor in the format `{"on": true, "direction": 0}`.

`setLED(led, value)` - Set the LED to on or off (1 or 0).

`getLED(led)` - Returns the LEDs current value (1 or 0).

`setOC(oc, value)` - Set the OC to on or off (1 or 0).

`getOC(oc)` - Returns the OCs current value (1 or 0).

`setSwitchCallback(switch, callback)` - Adds a callback to the switch that is called on value change.