let count = 0;

function increaseCount(val) {
    count+=val;
    console.log(count);
}

const intId = setInterval(increaseCount, 1000, 1);
console.log(intId);