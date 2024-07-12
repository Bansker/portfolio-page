function log(input) {console.log(input)};


const Keyboard = {
  btn_numbers   : Array.from(document.querySelectorAll('.keyboard__keyrow__btn--numbers')),
  btn_operators : Array.from(document.querySelectorAll('.keyboard__keyrow__btn--operators')),

  btn_0 : document.querySelector('#btn-0'),
  btn_1 : document.querySelector('#btn-1'),
  btn_2 : document.querySelector('#btn-2'),
  btn_3 : document.querySelector('#btn-3'),
  btn_4 : document.querySelector('#btn-4'),
  btn_5 : document.querySelector('#btn-5'),
  btn_6 : document.querySelector('#btn-6'),
  btn_7 : document.querySelector('#btn-7'),
  btn_8 : document.querySelector('#btn-8'),
  btn_9 : document.querySelector('#btn-9'),

  btn_del : document.querySelector('#btn-del'),
  btn_ac  : document.querySelector('#btn-ac'),
  btn_mul : document.querySelector('#btn-mul'),
  btn_div : document.querySelector('#btn-div'),
  btn_add : document.querySelector('#btn-add'),
  btn_sub : document.querySelector('#btn-sub'),
  btn_dot : document.querySelector('#btn-dot'),
  btn_exp : document.querySelector('#btn-exp'),
  btn_ans : document.querySelector('#btn-ans'),
  btn_eq  : document.querySelector('#btn-eq'),


};

const Display = {
  expression : document.querySelector('.display__expression'),
  result     : document.querySelector('.display__result'),
};



for(let i = 0; i < Keyboard.btn_numbers.length; i++) {
  Keyboard.btn_numbers[i].addEventListener('click', (event) => {
    btn_function = event.target.textContent;
    log(btn_function);
//('+' || '-' || '×' || '÷')
    let displayChars = Display.expression.textContent.split('');
    if(displayChars[displayChars - 1] != '+') {
      Display.expression.textContent += btn_function;
      displayChars = Display.expression.textContent.split('');

      log(displayChars);
    }
  });
}



for(let i = 0; i < Keyboard.btn_operators.length; i++) {
  Keyboard.btn_operators[i].addEventListener('click', (event) => {
    elem = event.target.textContent;
    log(elem);

    if(elem == 'AC') {
      Display.expression.textContent = '';
      Display.result.textContent     = '';
    }
  });
}








