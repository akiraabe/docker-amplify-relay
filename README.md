# Amplifyによる駅伝アプリ

## このプロジェクトの目的

* FrontEndはReactで作る
* Amplifyを用いてCognito認証を組み込む
* AppSync + DynamoDBのバックエンドと連携する
* Amplify customを用いて、cdkとSNSの連携をする

## 参考
https://docs.amplify.aws/start/getting-started/installation/q/integration/react/

https://docs.amplify.aws/cli/graphql/data-modeling/#configure-a-secondary-index

## トラブル

AmplifyのAuthenticatorと、muiのDialogが共存できないような挙動を示した。（Custom導入後）  
一旦、Authenticatorのバージョンを１系に下げたあとに、２系に戻したら、直った。（Customも同時に削除した）  
原因不明。
