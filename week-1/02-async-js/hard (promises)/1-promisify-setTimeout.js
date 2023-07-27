/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function delay(n){
    return new Promise(resolve => setTimeout(resolve, n*1000));
}

delay(2).then(()=>console.log("Fulfilled!"));