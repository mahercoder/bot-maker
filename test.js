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
// *************************************************
let handler = {}

// [Tanlovlar]
handler.contests = function(ctx){

}

// [Loyiha yuborish]
handler.send_project = function(ctx){
     
}

// [English for science]
handler.english_for_science = function(ctx){
     
}

// [G'oya berish]
handler.send_idea = function(ctx){
     
}

// [Biz bilan bog'lanish]
handler.contact_us = function(ctx){
     ctx.deleteMessage()
     ctx.scene.enter('contact_us')
}

// [Bot haqida]
handler.about = function(ctx){
     ctx.deleteMessage()
     ctx.scene.enter('about')
}

module.exports = handler
//*************************************************