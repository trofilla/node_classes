const crypto = require('crypto');
const generate = require('./generate');

let self = module.exports;

function takeAbs(val) {
  return Math.abs(val);
}

// Generates a random number
let randomNumber = (max) => {
	let rand = crypto.randomBytes(1)[0];
	while (rand >= 256 - (256 % max)) {
		rand = crypto.randomBytes(1)[0];
	}
	return rand % max;
};

// Possible combinations
const symbols = {
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	digits: '0123456789',
	special: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
} 



let createPassword = (options) => {
	let password = '';
	const types = ['lowercase', 'uppercase', 'digits', 'special'];

	while(options.length > 0) {
		let type = types[randomNumber(types.length)];
		if (options[type] > 0 || options.totalNotFilled > 0) {
			const currentType = symbols[type];
			password += currentType[randomNumber(currentType.length)];
			options[type] > 0 ? options[type]-- : options.totalNotFilled--;
			options.length--;
		} 
	}
	return password;
};

// Generate a random password.
self.generatePassword = (program) => {
	// Set defaults.
	let options = {
		lowercase: 1,
		uppercase: 1,
		digits: 1,
		special: 1,
		totalNotFilled: 10,
		length: 14
	};
	if (program.hasOwnProperty('length')) {
		if (program.length < 8 || program.length < (program.digits + program.special + program.uppercase)) {
			throw new Error('Minimal password length is 8 characters');
		}
		options.totalNotFilled = program.length-1;
		options.length = program.length;
	};

	if (program.hasOwnProperty('digits')) {
		options.digits = program.digits;
		options.totalNotFilled -= program.digits;
	};
	if (program.hasOwnProperty('special')) {
		options.special = program.special;
		options.totalNotFilled -= program.special;
	};
	if (program.hasOwnProperty('uppercase')) {
		options.uppercase = program.uppercase;
		options.totalNotFilled -= program.uppercase;
	};

	let password = createPassword(options);
	console.log(password)
	return password;
};