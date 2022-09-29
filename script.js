const button = document.querySelector('#start');
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
  for(let i = 0; i < G[0]; i++){
    S[i] = 0;
    add(i, 0);
  }
  let index = G[0];

  for(let i = 1; i < input_length.value; i++){
    let exist = [];
    for(let j = 0; j < G.length; j++){
      let next = i - G[j];
//      console.log(next);
      if(next >= 0){
        exist.push(S[next]);
      }
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
  let old = 1024;
  let n = 2048;
  for(let i = 0; i < G[0]; i++){
    S[i] = 0;
  }
  let index = G[0];
  let finish = false;
  let bin_finish = false;

  let period = 1;
  let bin_period;
  let max_start_period = 1;

  while(true){
    let exist = [];
    for(let j = 0; j < G.length; j++){
      let next = index - G[j];
//      console.log(next);
      if(next >= 0){
        exist.push(S[next]);
      }
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
      if(!bin_finish){
        for(let i = old + 1; i < n - G[G.length-1]; i++){
          let ok = true;
          for(let j = 0; j < G[G.length-1]; j++){
            if(!(S[old+j] == 0 && S[i+j] == 0 || S[old+j] != 0 && S[i+j] != 0)){
              ok = false;
              break;
            }
          }
          if(ok){
    //          console.log("@" + (i - old));          
            bin_finish = true;
            tr = document.createElement('tr');
            bin_period = i - old;
            tr.textContent = "01での周期: " + (i - old);
            table.appendChild(tr);
            break;
          }
        }
      }
      for(let i = old + 1; i < n - G[G.length-1]; i++){
        let ok = true;
        for(let j = 0; j < G[G.length-1]; j++){
          if(S[old+j] != S[i+j]){
            ok = false;
            break;
          }
        }
        if(ok){
//          console.log("@" + (i - old));          
          finish = true;
          tr = document.createElement('tr');
          max_start_period = old;
          period = i - old;
          tr.textContent = "周期: " + (i - old);
          table.appendChild(tr);
          break;
        }
      }
      old = n;
      n *= 2;
    }
    if(finish){
      break;
    }
    index++;
  }

  {
    let left = 0;
    let right = max_start_period;
    while(left != right){
      let mid = Math.floor((left + right) / 2);
      let isOk = true;
      for(let i = 0; i < G[G.length-1]; i++){
        if((S[mid+i] == 0) != (S[period+mid+i] == 0)){
          isOk = false;
          break;
        }
      }
      if(isOk){
        right = mid;
      }else{
        left = mid + 1;
      }
    }
    console.log(right);
    tr = document.createElement('tr');
    tr.textContent = "01での周期が始まるまでの項数: " + (right);
    table.appendChild(tr);
  }
  {
    let left = 0;
    let right = max_start_period;
    while(left != right){
      let mid = Math.floor((left + right) / 2);
      let isOk = true;
      for(let i = 0; i < G[G.length-1]; i++){
  //      console.log(S[mid+i]);
  //      console.log(S[period+mid+i]);
  //      console.log(S[mid+i] == S[period+mid+i]);
        if(S[mid+i] != S[period+mid+i]){
          isOk = false;
          break;
        }
      }
  //    console.log(isOk);
  //    console.log(right);
      if(isOk){
        right = mid;
  //      console.log("うおお");
      }else{
        left = mid + 1;
      }
    }
    console.log(right);
    tr = document.createElement('tr');
    tr.textContent = "周期が始まるまでの項数: " + (right);
    table.appendChild(tr);
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