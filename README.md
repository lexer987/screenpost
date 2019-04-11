# screenpost

webページをキャプチャしてdiscordへ送信する

![discord投稿画像例](http://i.imgur.com/K1w6lmQ.png "サンプル")

動作検証環境

- windows WSL
- node 8.1.0

install方法

```
npm install
cp .env.default .env
```

.envのWEBHOOKURLにdiscordのwebhookのurlを設定する

```
npm run start
```
でdiscordにscreenshotを送ることができます

## Google Cloud Functionsでの実行方法

### 最初にCloud Functionsエミュレーターを導入します

```
npm install -g @google-cloud/functions-emulator
```

関数をデプロイする前に、次のようにエミュレータを起動する必要があります。

```
functions start
```

関数をエミュレーターへデプロイします

```
functions deploy helloHttp --trigger-http
```

呼び出します

```
functions call helloHttp
```

### 本番へのdeploy方法

```
sudo apt-get install google-cloud-sdk
gcloud beta functions deploy helloHttp --trigger-http --runtime nodejs8 --memory 1024
```

https://console.cloud.google.com/functions/list

コンソールからアップロードしたfunctionの3点マークから関数をテストを実行してテストすることができます

割当メモリサイズは編集から1GBにして実行しました
