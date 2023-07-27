const fs = require("fs");

const filepath = "medium\\test.txt";
fs.readFile(filepath, 'utf-8', (err, data) => {
    if(err)
        throw err;
    let text = data.toString();
    let clean = "";
    let prev = ' ';
    for(let c of text){
        if(c!=' ' || c!=prev){
            clean+=c;
            prev=c;
        }
    }
    fs.writeFile(filepath, clean, err => {
        if(err)
            throw err;
    });
});
