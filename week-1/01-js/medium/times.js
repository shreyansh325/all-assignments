/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function calculateSum(n) {
    var sum = 0;
    for(var i = 1; i<=n; i++)
        sum+=i;
    return sum;
}

function calculateTime(n) {
    var start = new Date();
    var sum = calculateSum(n);
    var end = new Date();
    return (end-start)/1000;
}

var testCases = [100, 10000, 1000000, 100000000, 10000000000];
for(let test of testCases){
    console.log("Time for "+test+"s = "+calculateTime(test));
}