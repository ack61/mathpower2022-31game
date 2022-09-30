# C++用の高速なGrundy数列の計算プログラム
`-O3`オプションをつけないとJavaScriptのと大して変わらないのでつけて使ってください。
今のところは普通の周期しか計算できないです。pre-periodの計算方法は頭にありますが実装が重そうなのでまだです。
### 環境
C++11以上(たぶん)
### 使い方
`const array<int, 3> S = {5000, 10001, 15001}; //昇順で書く`

の部分を、

`const array<int, 大きさ> S = {中身}; //昇順で書く`

にして、下のコマンドでコンパイル&実行してください。
### コンパイル
`main.cpp -O3`
### 動作確認
windows10

gcc version 8.2.0 (MinGW.org GCC-8.2.0-5)