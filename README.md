# 1. js-lesson
もりけん先生の【マークアップエンジニアの為の課題 Work】課題用リポジトリです。
https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md


## 1.このDOMをhtml内のulの中に差し込んでください
```html
<li>これです</li>
```
[1.codesandbox](https://codesandbox.io/s/js-tast1-ktgo5)
## 2.このDOMをJavaScriptでつくり、html内のulの中に差し込んでください
```html
<li>
  <a href="1.html"><img src="bookmark.png" alt="ブックマーク" />これです</a>
</li>
```
[2.codesandbox](https://codesandbox.io/s/js-task2-mezxu?file=/app.js)
## 3.このDOMをJavaScriptでつくり、html内のulの中に差し込んでください
```html
<ul>
  <li><a href="a1.html"><img src="/img/bookmark.png">a1</li>
  <li><a href="a2.html"><img src="/img/bookmark.png">a2</li>
</ul>
```
[3.codesandbox](https://codesandbox.io/s/js-task3-yetrk)

## 4.下記の配列を使ってDOMをJavaScriptでつくり、html内のulの中に差し込んでください


### 配列
```json
[{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}]
```
### DOM
```html
<ul>
 <li><a href="/bookmark.html"><img src="1.png" alt="画像1">ブックマーク</a></li>
 <li><a href="/message.html"><img src="2.png" alt="画像2">メッセージ</a></li>
</ul>
```
[4.codesandbox](https://codesandbox.io/s/js-task4-c7du6)

## 5.こんどはPromiseオブジェクトを使って解決された値として受け取り4と同じように出力してください
[5.codesandbox](https://codesandbox.io/s/js-task5-57xr4)
## 6.5で作ったものを3秒後に解決されるようにしてください
[6.codesandbox](https://codesandbox.io/s/js-task6-8vh8w)
## 7.loadingを実装してみてください。
[7.codesandbox](https://codesandbox.io/s/js-task7-tlo64)

## 8.resolveで解決するのではなく(resolveを実行するのではなく) 3秒後にrejectを実行してthenでその値をコンソール出力してください。
[8.codesandbox](https://codesandbox.io/s/js-task8-w2uxb)

## 9.async awaitを使って同じことをやってください。
[9.codesandbox](https://codesandbox.io/s/js-task9-ori3c)

## 10.問題9に追加で try-catch-finaliy を書いてください
[10.codesandbox](https://codesandbox.io/s/js-task10-oqc7g)

## 11.簡易的なAPIを使って同じことを[こちら](https://json.okiba.me/)のサイトに下記データ登録してエンドポイントを取得 前回までのコードを生かして fetchを使ってデータを取得してください
```json
{ "data": [
  {
    "a": "bookmark",
    "img": "img/1.png",
    "alt": "画像１",
    "text": "ブックマーク"
  },
  {
    "a": "message",
    "img": "img/2.png",
    "alt": "画像２",
    "text": "メッセージ"
  }
]}
```
[11.codesandbox](https://codesandbox.io/s/js-task11-selun)
## 12.クリックしたらリクエストをして、それらが表示されるようにしてください
[12.codesandbox](https://codesandbox.io/s/js-task12-6dnd6)
## 13.クリックしたらモーダルが出てきて、12で作ったボタンを押したらリクエストされ表示するようにしてください
[13.codesandbox](https://codesandbox.io/s/js-task13-jqjvc)
## 14.13で作ったモーダル内にinput (typeはnumber)をおいて、クリックした際にinput(type number)のvalueを取得して、リクエストできるようにしてください。
[14.codesandbox](https://codesandbox.io/s/js-task14-k62pf)

## 15.モーダル内に formをおいて、input(type number)値、input(type text)、を新たに作ったsubmitボタン押下で リクエスト、 APIから値を取ってきてください
[15.codesandbox](https://codesandbox.io/s/js-task15-9ehqi)
## 16.ニュースUIコンポーネント作成
[16.codesandbox](https://codesandbox.io/s/js-task16-huidn)

## 17.スライドショー作成
[17.codesandbox](https://codesandbox.io/s/js-task17-zguuh)

## 18.スライドショーにドットのページネーションを作りましょう
[18.codesandbox](https://codesandbox.io/s/js-task18-np5ux)

## 19.ニュースUIコンポーネントとスライドショーを合わせる
[19.codesandbox](https://codesandbox.io/s/js-task19-p62i7)

## 20.ユーザーテーブル作成
こちらは課題が追加されたときに出来た問題になります。
私がチャレンジした当時はありませんでしたので割愛します。

## 21.ユーザーテーブルにソート機能実装(IDのみ)
[21.codesandbox](https://codesandbox.io/s/js-task21-5py9u)

## 22.ユーザーテーブルにソート機能実装(ID・年齢)
[22.codesandbox](https://codesandbox.io/s/js-task22-mntlp)

## 23.ユーザーテーブルにページネーションを実装する
こちらの課題はdeprecatedのため、飛ばしました。
もう少し成長してからチャレンジする予定です。

## 24.会員登録画面作成
[24.codesandbox](https://codesandbox.io/s/js-task24-67ep7)

## 25.会員登録画面にバリデーションを実装
[25.codesandbox](https://codesandbox.io/s/js-tesk25-tic5h)
## 26.ログイン画面作成
[26.codesandbox](https://codesandbox.io/s/js-task26-4vrsz?file=/login.html)
こちらは
```
名前: test1,パスワード: N302aoe3
名前: test2,パスワード: N302aoe4
名前: test3,パスワード: N302aoe5
```
でログインできます。試してみてください。

## 27. index.htmlページ遷移時に 学習の為のローカルストレージのトークンを参照して もし {token: far0fja*ff]afaawfqrlzkfq@aq9283af}の値があれば 作ったコンテンツUI画面を 何もない場合はログイン画面(login.html)に遷移するように作ってください
[27.codesandbox](https://codesandbox.io/s/js-task27-u4q9o)
こちらは上記と同じパスワードです。
```
名前: test1,パスワード: N302aoe3
名前: test2,パスワード: N302aoe4
名前: test3,パスワード: N302aoe5
```
でログインできます。試してみてください。

