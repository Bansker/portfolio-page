const foo = (num) => {
  if(num <= 11) {
    return -1;
  }

  newNum = num.toString().split('');
  indexes = num.toString().split('').length - 1;

  for(let i = indexes; i >= 1; i--) {
    if(newNum[i - 1] < newNum[i]) {
      ls = newNum[i];
      ms = newNum[i - 1];
      newNum[i] = ms;
      newNum[i - 1] = ls;

      return Number(newNum.join(''));
    } 
  }

  return -1;
};

console.log(foo(6566));