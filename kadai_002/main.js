// タイピングゲームのjsファイル

// 変数を準備し、初期化
let untyped = ''; //未入力文字の変数
let typed = '';   //入力済み文字の変数
let score = 0;  //スコアの変数設定

// getElementById()メソッドで、文字を表示するためのHTML要素を取得
const untypedfield = document.getElementById('untyped'); //未入力の文字列、()内の'untyped'はHMTLからとってきたid要素
const typedfield = document.getElementById('typed'); //入力済み文字列、()内の'untyped'はHMTLからとってきたid要素
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typeCount = document.getElementById('typecount');

// 複数のテキストを格納する配列を作成、配列には　定数　"定数名" = []（方括弧の中に配列要素を入れる)
// 変数・定数を宣言するときはコードの上部に記述するのが一般的。
const textLists = [ 
'Hello World','This is my App','How are you?',
'Today is sunny','I love JavaScript!','Good morning',
'I am Japanese','Let it be','Samurai',
'Typing Game','Information Technology',
'I want to be a programmer','What day is today?',
'I want to build a web app','Nice to meet you',
'Chrome Firefox Edge Safari','machine learning',
'Brendan Eich','John Resig','React Vue Angular',
'Netscape Communications','undefined null NaN',
'Thank you very much','Google Apple Facebook Amazon',
'ECMAScript','console.log','for while if switch',
'var let const','Windows Mac Linux iOS Android',
'programming'];


// ゲームの機能を分解し、それぞれの機能に対する関数を準備

// 関数１：ランダムなテキストを表示する。
// 　※creatTextは無名関数の名前：関数を設定するのは"()=>"でcreatTextの関数内容を定義している
const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  // getElementByIdで取得した定数typefieldのHTML要素に変数typedを差し込む
  typedfield.textContent = typed;
  // Math.random: 「0以上1未満の小数点以下の値」をランダムに取得
  // 上記に「*(数値)」すことで、0～指定した数値までの乱数を取得できるようになる
  // Math.floor：少数点以下を切り捨て、整数を取る　※Math.ceilは切り上げ
  let random = Math.floor(Math.random() * textLists.length)
  // 変数「untyped」に「textLists」の配列の値をランダムに代入する
  untyped = textLists[random];
  // untypedfield要素のテキスト内容をuntyped変数の値に設定する
  untypedfield.textContent = untyped;
}; 

// 関数２：キー入力の判定
  // イベント：Webページ上のボタンをクリックしたり、キーボードでキーを入力したりすること
  // イベントリスナー：イベントをきっかけに開始する「処理」のこと
  // イベントオブジェクト：イベントごとに生起される(通常"ｅ"や"event"という引数で渡される)

  // イベントオブジェクト「e」からどのキーが押されたかの情報を入手する。入力されたキーはkeyプロパティに入っている。
  // 引数が1つの場合は括弧を省略してもよい
const keyPress = (e) => {
  // 【誤タイプの場合】　打ったキーがtypeしていない一文字目と一致しない場合
  // e.key：KeyboardEventオブジェクトのkeyプロパティを表す
  if(e.key !== untyped.substring(0,1)){
    // 誤タイプ時にclassList.add()メソッドでclass属性（mistyped）を追加し、背景色を変更
    wrap.classList.add('mistyped');
    // 100ミリ秒後に背景色を元に戻す
    setTimeout(()=>{
      // 100ミリ秒後の処理内容
      wrap.classList.remove('mistyped');
    }, 100)
    // returnは戻り値を返す役割と、処理を終了する役割がある。
    // これを記述することで、誤タイプの場合は文字色は変わらなくなる
    return;
  }
  // 【正タイプの場合】if内容でなければ、以下を実行
  //正タイプした数をスコアにインクリメントする
  score++;
  // 正タイプ時にclassList.remove()メソッドでclass属性（mistyped）を削除し、背景色を元に戻す
  wrap.classList.remove('mistyped');
  // 正タイプであれば、タイプした文字とタイプしていない一文字目substring(開始値, 指定値-1)の文字列をtypeに呼び出し
  typed += untyped.substring(0,1); // typed = typed + untyped.substring(0,1) と同じ意味
  // 正タイプであればuntypedにuntypedの2文字名以降の文字列を再代入する
  untyped = untyped.substring(1);
  // HTML要素に上記に指示した変数の内容を差し込む
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // 正タイプであれば、タイプした文字数を表示させる
  // タイプ数をカウントし、HTML画面に出力させる
  typecount.textContent = `${score}`;
  
  console.log(score); //タイプしたキーの確認
  console.log(e.key); //タイプしたキーの確認

  // 未入力テキストがなくなったら、新しいテキストを表示
  if(untyped === ''){
  // untypedがなくなったら、createTextを呼び出し
  // createText関数を呼び出し：関数を呼び出すには、関数名の後に括弧を記述する必要がある
  // 関数に引数を渡す場合は、括弧内に引数を記述します。　引数設定は、無名関数の後につけた()に設定
  // 関数は、複数回呼び出すことができます。
  createText();
  }
};

// 関数３．タイピングスキルのランクを判定　(ゲームオーバーの中で処理される)
const rankCheck = (score) => {
  // テキストを格納する変数を作る
  let text = '';
  // スコアに応じて異なるメッセージを作成する
  if (score < 100){
    text = `あなたのランクはCです。 \nBランクまであと${100-score}です。`;
  }else if (score < 200){
    text = `あなたのランクはBです。 \nAランクまであと${200-score}です。`
  }else if (score < 300){
    text = `あなたのランクはAです。 \nSランクまであと${300-score}です。`
  }else if (score >= 300){
    text = `あなたのランクはSです。 \nおめでとうございます！`
  }
  // 生起した文字と一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};


// 関数４．ゲームを終了
// ※"id"はtimerで定義した関数を引き取ったもの、gameOverの中で再定義する必要がない
const gameOver = (id) => {
  // clearInterval　※メソッド: 処理を終了設定する
  clearInterval(id);
    // 正タイプした文字列をクリア
    typed = '';
    // getElementByIdで取得した定数typefieldのHTML要素に変数typedを差し込む
    typedfield.textContent = typed;
    // タイマーが0になったら「タイムアップ！」を<div>に表示
    untypedfield.textContent = `タイムアップ！`;

  // 結果は「タイムアップ！」表示から10ミリ秒後に、結果を表示
  setTimeout(()=> {
  // 結果を表示
    const result = confirm(rankCheck(score));
  // OKボタンがクリックされたらリロードする
  // confim()メソッドで作成したダイアログは「OK」ボタンを押すと戻り値として、tureを取得できる
  if(result == true){
    window.location.reload();
  }
  }, 10);
};

// 関数５．カウントダウンタイマー
const timer = () => {
  // タイマー部分のHTML要素を(p要素)を取得して変数timeに代入し、関数内で適用する
  let time = count.textContent;

  // setInterval　※メソッド: 処理の間隔を設定する
  const id = setInterval(() => {
    // 変数で設定したtimeの数値を"--"で1ずつ減らす
    time--;
    // 定数countにtimeで定義した1ずつ減らした数値をブラウザに表示する(更新)
    count.textContent = time;

    // カウントがゼロになったらタイマーを停止する
    if(time <= 0){
      // gemeOver関数を呼び出して、idを渡す
      gameOver(id);
    }
    // setIntervalの第2引数、カウント間隔をミリ秒を指定する(必須)
  }, 1000)
};

// ゲームスタート時の処理
// クリックしたら、｛｝内を実行する
start.addEventListener('click', () => {
  // カウントダウンタイマーを開始する　※timer関数の呼び出し
  timer();

  // ランダムなテキストを表示する　※createText関数の呼び出し
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
})
// クリックするまでは'スタートボタンで開始'を表示
untypedfield.textContent = 'スタートボタンで開始';

