/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/
function isAlphaNumeric(charCode) {
  return charCode>=96 && charCode<=123;
}

function isPalindrome(str) {
  str=str.toLowerCase();
  var left,right;
  for(left = 0, right = str.length-1; left<right; left++, right--){
    while(!isAlphaNumeric(str.charCodeAt(right)) && left<right)
      right--;
    while(!isAlphaNumeric(str.charCodeAt(left)) && left<right)
      left++;
    if(left<right && str[left]!=str[right])
      return false;
  }
  return true;
}

module.exports = isPalindrome;
