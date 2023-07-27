/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  var counter = {}
  for(const c of str1){
    if(c in counter)
      counter[c]++;
    else
      counter[c]=1;
  }
  for(const c of str2){
    if(c in counter && counter[c]>0)
      counter[c]--;
    else
      return false;
  }
  for(let key in counter){
    if(counter[key]>0)
      return false;
  }
  return true;
}

module.exports = isAnagram;