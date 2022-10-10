#include <iostream>
#include <array>
#include <cmath>

using namespace std;

const int s = 4;
const array<int, 5> S = {4,11,12,14,71}; //昇順で書く
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
  array<bool, S_length> existsNum;

  long long period = -1;

  array<int, S_length> exist;
  for(int i = 0; i < S_length; i++){
    exist[i] = -2;
  }

  for(int p = 0; p < S_max; p++){
    for(int i = 0; i < S_length; i++){
      existsNum[i] = false;
    }
    for(int i = 0; i < S_length; i++){
      long long alnext = index - S[i];
      int next = (MAX_RANGE + mod_index - S[i]) & RANGE_MASK;
      exist[i] = alnext >= 0 ? G[next] : -1;
      existsNum[exist[i]] = true;
    }


    int min = 0;
    for(int i = 0; i < S_length; i++){
      if(existsNum[i]){
        min++;
      }else{
        break;
      }
    }
    G[mod_index] = min;
//    G[mod_index] = min > 0 ? 1 : 0;

    {
      bool isOk = true;
      int mod_i = (MAX_RANGE + index % MAX_RANGE - S_max) & RANGE_MASK;
      for(int i = 0; i < S_max; i++){
        if(check_ary[i] != G[mod_i]){
          isOk = false;
          break;
        }
        mod_i++;
        mod_i &= RANGE_MASK;
      }
      if(isOk){
//        cout << ((MAX_RANGE + index % MAX_RANGE - S_max) & RANGE_MASK) << endl;
//        cout << mod_i << endl;
//        cout << index << ", " << S_max << ", " << old/2 << endl;
        period = index - S_max - old/2;
        finish = true;
        break;
      }
    }

    if(index == old + S_max){
      for(int i = 0; i < S_max; i++){
        check_ary[i] = G[(old % MAX_RANGE + i) & RANGE_MASK];
      }
//      cout << index << endl;
      old = n;
      n *= 2;
    }

    if(index % 100000000L == 0){
      cout << "progress : " << index << endl;
//      cout << ((MAX_RANGE + index - S_max) & RANGE_MASK) << endl;
    }

    if(finish){
      break;
    }
    index++;
    mod_index++;
    mod_index &= RANGE_MASK;
  }

  if(finish){
    cout << "#" << period << endl;
    return 0;
  }

  while(!finish){
    for(int i = 0; i < S_length; i++){
      existsNum[i] = false;
    }
    for(int i = 0; i < S_length; i++){
      int next = (MAX_RANGE + mod_index - S[i]) & RANGE_MASK;
      existsNum[G[next]] = true;
    }


    int min = 0;
    for(int i = 0; i < S_length; i++){
      if(existsNum[i]){
        min++;
      }else{
        break;
      }
    }
    G[mod_index] = min;
//    G[mod_index] = min > 0 ? 1 : 0;

    {
      bool isOk = true;
      int mod_i = (MAX_RANGE + mod_index - S_max) & RANGE_MASK;
      for(int i = 0; i < S_max; i++){
        if(check_ary[i] != G[mod_i]){
          isOk = false;
          break;
        }
        mod_i++;
        mod_i &= RANGE_MASK;
      }
      if(isOk){
//        cout << ((MAX_RANGE + index % MAX_RANGE - S_max) & RANGE_MASK) << endl;
//        cout << mod_i << endl;
//        cout << index << ", " << S_max << ", " << old/2 << endl;
        period = index - S_max - old/2;
        finish = true;
        break;
      }
    }

    if(index == old + S_max){
      for(int i = 0; i < S_max; i++){
        check_ary[i] = G[(old % MAX_RANGE + i) & RANGE_MASK];
      }
//      cout << index << endl;
      old = n;
      n *= 2ull;
    }

    if(index % 100000000L == 0){
      cout << "progress : " << index << endl;
//      cout << ((MAX_RANGE + index - S_max) & RANGE_MASK) << endl;
    }

    index++;
    mod_index++;
    mod_index &= RANGE_MASK;
  }
  cout << "#" << period << endl;
}
