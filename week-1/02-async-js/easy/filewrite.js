const fs = require("fs");

fs.readFile('easy\\counter1.js', 'utf-8',(err, data) => {
    console.log(data);
    if(err)
        throw err;
    fs.writeFile('easy\\test.txt', data, err => {
        if(err)
            throw err;
    });
    console.log("Done");
})
