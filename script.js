const button = document.querySelector('input[type=button]');
const input = document.querySelector('input[type=text]');
const input_length = document.querySelector('#getLength');
const table = document.querySelector('table');
const paragraph = document.querySelector('p');

button.addEventListener('click', updateButton);

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