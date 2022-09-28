const button = document.querySelector('input[type=button]');
const period_button = document.querySelector('#period_button');
const input = document.querySelector('input[type=text]');
const input_length = document.querySelector('#getLength');
const table = document.querySelector('table');
const paragraph = document.querySelector('p');

button.addEventListener('click', updateButton);
period_button.addEventListener('click', preCalcPeriod);

function updateButton() {
  console.log(input.value);
  while(table.firstChild) {
      table.removeChild(table.firstChild);
  }
  let G = input.value.split(',').map(Number);
  let S = [];
  S[0] = 0;
  add(0, 0);

  for(let i = 1; i < input_length.value; i++){
    let exist = [];
    for(let j = 0; j < G.length; j++){
      let next = Math.max(0, i - G[j]);
//      console.log(next);
      exist.push(S[next]);
    }
    exist.sort((a, b) => a - b);
//    console.log(exist);
    let min = 0;
    for(let j = 0; j < G.length; j++){
//      console.log("min:" + min + ", ex:"+exist[j]);
      if(min == exist[j]){
        min++;
      }else if(min != exist[j] + 1){
        break;
      }
    }
    S[i] = min;
//    console.log(min);
    add(i, min);
  }
}

function preCalcPeriod() {
  setTimeout(calcPeriod, 1);
}

function calcPeriod() {
  console.log(input.value);
  while(table.firstChild) {
      table.removeChild(table.firstChild);
  }
  let G = input.value.split(',').map(Number);
  let S = [];
  let old = 128;
  let n = 256;
  S[0] = 0;
  let index = 1;
  let finish = false;

  while(true){
    let exist = [];
    for(let j = 0; j < G.length; j++){
      let next = Math.max(0, index - G[j]);
//      console.log(next);
      exist.push(S[next]);
    }
    exist.sort((a, b) => a - b);
//    console.log(exist);
    let min = 0;
    for(let j = 0; j < G.length; j++){
//      console.log("min:" + min + ", ex:"+exist[j]);
      if(min == exist[j]){
        min++;
      }else if(min != exist[j] + 1){
        break;
      }
    }
    S[index] = min;
//    console.log(min);
//    add(index, min);

    if(index == n){
      for(let i = old + 1; i < n - G[G.length-1]; i++){
        let ok = true;
        for(let j = 0; j < G[G.length-1]; j++){
          if(S[old+j] != S[i+j]){
            ok = false;
            break;
          }
        }
        if(ok){
          console.log("@" + (i - old));          
          finish = true;
          tr = document.createElement('tr');
          tr.textContent = i - old;
          table.appendChild(tr);
          break;
        }
      }
      old = n;
      n *= 2;
    }

    if(index > 1000000){
      break;
    }
    if(finish){
      break;
    }
    index++;
  }
}

function add(index, num) {
  let tr = document.createElement('tr');
  let l1 = document.createElement('td');
  let l2 = document.createElement('td');
  let l3 = document.createElement('td');
  l1.textContent = index;
  l2.textContent = num;
  l3.textContent = `${"●".repeat(num)}`;
  tr.appendChild(l1);
  tr.appendChild(l2);
  tr.appendChild(l3);

  table.appendChild(tr);
}