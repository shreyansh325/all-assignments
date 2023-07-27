const fs = require('fs');

fs.readFile('easy\\counter2.js', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(data);
});

for(let i = 0; i<10; i++);
console.log("idle")