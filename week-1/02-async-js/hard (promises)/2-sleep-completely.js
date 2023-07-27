/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (ms) {
    let startTime = new Date().getTime();
    while(new Date().getTime()<startTime+ms);
    console.log("Exiting!");
}
sleep(2000);