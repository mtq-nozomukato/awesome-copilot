# API 仕様

## パスワード生成 API

- エンドポイント: `/api/generate`
- メソッド: POST
- リクエストボディ:
  - `length`: number (6, 8, 任意)
  - `useSymbols`: boolean
  - `useUppercase`: boolean
  - `useLowercase`: boolean
  - `type`: 'password' | 'uuid' | 'sha256'
- レスポンス:
  - `result`: string

## サンプル

```json
{
  "length": 12,
  "useSymbols": true,
  "useUppercase": true,
  "useLowercase": true,
  "type": "password"
}
```
