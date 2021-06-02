try {
	mod = require('./scenarios')
} catch (err) {
	console.log(err.code === `MODULE_NOT_FOUND`)
};
console.log(mod);
const scenario = require('./scenario');
scenario.name = "bot-temp";
for (let item in scenario) {
	console.log(scenario[item])
}
let myArray = [
	[1, 2],
	[3, 4, 5],
	[6, 7, 8, 9], 45, 87
];
let myNewArray = [].concat.apply([], myArray)
// let myNewArray = myArray.reduce(function(prev, curr) {
//      return prev.concat(curr);
// });

console.log(myNewArray);
