const fs = require('fs');

var got = JSON.parse(fs.readFileSync('./data.js'));

for(let i=0; i<45; i++) {
    console.log(i+1+" - "+got[i].name);
}