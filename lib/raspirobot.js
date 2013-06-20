var RaspiRobot = function()
{
	var gpio = undefined;
	
	this.pins = {
		"left": {
			"go": {
				"mode": "out",
				"num": 17,
			},
			"direction": {
				"mode": "out",
				"num": 4
			}
		},
		"right": {
			"go": {
				"mode": "out",
				"num": 10
			},
			"direction": {
				"mode": "out",
				"num": 25
			}
		},
		"switch": {
			"1": {
				"mode": "in",
				"num": 11
			},
			"2": {
				"mode": "in",
				"num": 9
			}
		},
		"led": {
			"1": {
				"mode": "out",
				"num": 7
			},
			"2": {
				"mode": "out",
				"num": 8
			}
		},
		"oc": {
			"1": {
				"mode": "out",
				"num": 22
			},
			"2": {
				"mode": "out",
				"num": 21
			}
		}
	};
	
	this.setup = function()
	{
		if (gpio == undefined)
		{
			gpio = require("gpio");
		}
	
		for (object in this.pins)
		{
			for (pinName in this.pins[object])
			{
				var pin = this.pins[object][pinName];
				
				this.pins[object][pinName].gpio = gpio.export(pin.num, { "direction": pin.mode });
			}
		}
	}
	
	this.setGPIO = function(io)
	{
		gpio = io;
	}
	
	this.getGPIO = function()
	{
		return gpio;
	}
	
	this.setMotor = function(side, value, direction)
	{
		if (side != "left" && side != "right")
		{
			return;
		}
	
		if (direction == undefined)
		{
			direction = 0;
		}
		
		this.pins[side].go.gpio.set(value);
		this.pins[side].direction.gpio.set(direction);
	}
	
	this.getMotor = function(side)
	{
		return {"on": this.pins[side].go.gpio.value == 1, "direction": this.pins[side].direction.gpio.value};
	}
	
	this.setLED = function(led, value)
	{
		this.pins.led[led.toString()].gpio.set(value);
	}
	
	this.getLED = function(led)
	{
		return this.pins.led[led.toString()].gpio.value;
	}
	
	this.setOC = function(oc, value)
	{
		this.pins.oc[oc.toString()].gpio.set(value);
	}
	
	this.getOC = function(oc)
	{
		return this.pins.oc[oc.toString()].gpio.value;
	}
	
	this.setSwitchCallback = function(sw, callback)
	{
		this.pins.switch[sw.toString()].gpio.on("change", callback);
	}
}

module.exports.RaspiRobot = RaspiRobot;