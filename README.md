# screenpost

webページをキャプチャしてdiscordへ送信する

install方法

```
npm install
cp .env.default .env
```

.envのWEBHOOKURLにdiscordのwebhookのurlを設定する

```
node amedas_run.js
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
gcloud beta functions deploy helloHttp --trigger-http --runtime nodejs8
```

https://console.cloud.google.com/functions/list?project=screenshotman&folder&organizationId

コンソールからアップロードしたfunctionの3点マークから関数をテストを実行してテストすることができます
