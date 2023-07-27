let currtime = new Date();
// console.log(currtime.toLocaleTimeString('it-IT'));
// console.log(currtime.toLocaleTimeString('en-US'));

function displayCurrTime(format='en-US'){
    let currtime = new Date();
    console.log(currtime.toLocaleTimeString(format));
}

setInterval(displayCurrTime, 1000);
