#include <iostream>
#include <array>
#include <cmath>

using namespace std;

const array<int, 3> S = {5000, 10001, 15001}; //昇順で書く
const int S_length = S.size();
const int S_max = S[S_length - 1];

const int max_log2 = ceil(log2(S_max));
const int MAX_RANGE = (1 << max_log2);
const int RANGE_MASK = MAX_RANGE - 1;

int main() {
  long long old = MAX_RANGE;
  long long n = old * 2;
  array<int, MAX_RANGE> G;
  array<int, MAX_RANGE> check_ary;

  for(int i = 0; i < MAX_RANGE; i++){
    check_ary[i] = -1;
  }
  while(old < S_max){
    old = n;
    n *= 2;
  }
  for(int i = 0; i < S[0]; i++){
    G[i] = 0;
  }
  long long index = S[0];
  int mod_index = S[0];
  bool finish = false;
  bool bin_finish = false;

  int period = -1;

  array<int, S_length> exist;
  for(int i = 0; i < S_length; i++){
    exist[i] = -2;
  }

  while(true){
    for(int i = 0; i < S_length; i++){
      int alnext = index - S[i];
      int next = (MAX_RANGE + mod_index - S[i]) & RANGE_MASK;
      exist[i] = alnext >= 0 ? G[next] : -1;
    }


    int min = 0;
    for(int i = 0; i < S_length; i++){
      bool isOk = false;
      for(int j = 0; j < S_length; j++){
        if(min == exist[j]){
          min++;
          isOk = true;
          break;
        }
      }
      if(!isOk){
        break;
      }
    }
    G[mod_index] = min;

    {
      bool isOk = true;
      int mod_i = (MAX_RANGE + index - S_max) & RANGE_MASK;
      for(int i = 0; i < S_max; i++){
        if(check_ary[i] != G[mod_i]){
          isOk = false;
          break;
        }
        mod_i++;
        mod_i &= RANGE_MASK;
      }
      if(isOk){
        period = index - S_max - old/2;
        finish = true;
        break;
      }
    }

    if(index == old + S_max){
      for(int i = 0; i < S_max; i++){
        check_ary[i] = G[(old + i) & RANGE_MASK];
      }
      old = n;
      n *= 2;
    }

    if(finish){
      break;
    }
    index++;
    mod_index++;
    mod_index &= RANGE_MASK;
  }
  cout << period << endl;
}
