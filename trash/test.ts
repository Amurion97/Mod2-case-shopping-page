import chalk = require("chalk");

let s = `he \t \t \t SSS`
console.log(s);
console.log(s.indexOf("S"))

let usernameRegEx = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
console.log(usernameRegEx.test("giang123"));
console.log(chalk.red("Giang"))