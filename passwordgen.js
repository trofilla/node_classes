const program = require('commander');
const generate = require('./generate');


program
    .version('0.1.0')
    .option('-l, --length <n>', 'Total lenght', takeAbs, 14)
	.option('-u, --uppercase <n>', 'Uppercase lenght', takeAbs)
	.option('-d, --digits <n>', 'Digits lenght', takeAbs)
	.option('-s, --special <n>', 'Special lenght', takeAbs)
  .parse(process.argv);
 
console.log('you options:');
if (program.length) console.log('  - length', program.length);
if (program.uppercase) console.log('  - uppercase', program.uppercase);
if (program.digits) console.log('  - digits', program.digits);
if (program.special) console.log('  - special', program.special);

// Generates a random number

if (program.length < 8) {
	throw new Error('Minimal password length is 8 characters');
}

if (program.length < (program.digits + program.special + program.uppercase)) {
	throw new Error(`Password length cannot be less than ${program.digits + program.special + program.uppercase}`);
}

if (program.uppercase > (program.length - program.digits - program.special)) {
	throw new Error(`Uppercase length is invalid`);
}

if (program.digits > (program.length - program.uppercase - program.special)) {
	throw new Error(`Digits length is invalid`);
}

if (program.special > (program.length - program.uppercase - program.digits)) {
	throw new Error(`Specials length is invalid`);
}

function takeAbs(val) {
  return Math.abs(val);
}

generate.generatePassword(program);