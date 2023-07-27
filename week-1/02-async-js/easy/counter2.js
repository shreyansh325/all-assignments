let count = 0;

function increaseCount(val=1) {
    count+=val;
    console.log(count);
    let timeId = setTimeout(increaseCount, 0.1, val);
}

increaseCount();