var RaspiRobot = function()
{
	var gpio = undefined;
	
	var pins = {
		"left": {
			"go": {
				"mode": "out",
				"num": 17
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
	
	var gpioPins = new Array();
	
	this.setGPIO = function(io)
	{
		gpio = io;
	}
	
	this.setup = function()
	{
		if (gpio == undefined)
		{
			gpio = require("gpio");
		}
	
		for (object in pins)
		{
			for (pinName in pins[object])
			{
				if (gpioPins[object] == undefined)
				{
					gpioPins[object] = new Array();
				}
				
				var pin = pins[object][pinName];
				
				gpioPins[object][pinName] = gpio.export(pin.num, { "direction": pin.mode });
			}
		}
	}
	
	this.setMotors = function(left, leftDirection, right, rightDirection)
	{
		gpioPins["left"]["go"].set(left);
		gpioPins["left"]["direction"].set(leftDirection);
		
		gpioPins["right"]["go"].set(right);
		gpioPins["right"]["direction"].set(rightDirection);
	}

	this.forward = function()
	{
		this.setMotors(1, 0, 1, 0);
	}
	
	this.backward = function()
	{
		this.setMotors(1, 1, 1, 1);
	}
	
	this.left = function()
	{
		this.setMotors(1, 0, 1, 1);
	}
	
	this.right = function()
	{
		this.setMotors(1, 1, 1, 0);
	}
	
	this.stop = function()
	{
		this.setMotors(0, 0, 0, 0);
	}
	
	this.forwardFor = function(seconds)
	{
		this.forward();
		var s = this;
		setTimeout(function()
		{
			s.stop();
		}, seconds*1000);
	}
	
	this.backwardFor = function(seconds)
	{
		this.backward();
		var s = this;
		setTimeout(function()
		{
			s.stop();
		}, seconds*1000);
	}
	
	this.leftFor = function(seconds)
	{
		this.left();
		var s = this;
		setTimeout(function()
		{
			s.stop();
		}, seconds*1000);
	}
	
	this.rightFor = function(seconds)
	{
		this.right();
		var s = this;
		setTimeout(function()
		{
			s.stop();
		}, seconds*1000);
	}
	
	this.setLED1 = function(value)
	{
		gpioPins["led"]["1"].set(value);
	}
	
	this.setLED2 = function(value)
	{
		gpioPins["led"]["2"].set(value);
	}
	
	this.setOC1 = function(value)
	{
		gpioPins["oc"]["1"].set(value);
	}
	
	this.setOC2 = function(value)
	{
		gpioPins["oc"]["2"].set(value);
	}
}

module.exports.RaspiRobot = RaspiRobot;
