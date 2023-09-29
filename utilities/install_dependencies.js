const {execSync} = require('child_process')


let command ="npm --prefix .. install --save-dev webpack "
console.log(command)
execSync(command)
let command2 ="npm --prefix .. install --save-dev webpack-cli "
console.log(command2)
execSync(command2)
let command3 ="npm --prefix .. install --save-dev jest "
console.log(command3)
execSync(command3)
