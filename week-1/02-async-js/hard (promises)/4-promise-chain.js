/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait(n){
    return new Promise(resolve => setTimeout(resolve, n*1000, n));
}

function waitOneSecond() {
    return wait(1);
}

function waitTwoSecond() {
    return wait(2);
}

function waitThreeSecond() {
    return wait(3);
}

function calculateTime() {
    let startTime = new Date().getTime();
    waitOneSecond().then(data => {
        console.log("Finished waiting for "+ data);
        return waitTwoSecond();
    }).then( data => {
        console.log("Finished waiting for "+ data);
        return waitThreeSecond();
    }).then( data => {
        console.log("Finished waiting for "+ data);
        console.log("Time take: "+ (new Date().getTime()-startTime)/1000);
    });
    
}

calculateTime();