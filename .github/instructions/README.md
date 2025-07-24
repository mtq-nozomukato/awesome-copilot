# instructions ディレクトリ運用ルール

このディレクトリには、GitHub Copilot で使用するカスタム指示ファイル(.instructions.md)を配置します。

## カスタム指示ファイル一覧

1. [`testing.instructions.md`](./testing.instructions.md)

   - テスト実装・運用に関する詳細ルールや Tips を記載

## ガイドライン

指示ファイルは適宜追加可能です。

- 独自の命名規則や例外ルール、運用 Tips を共有する場合
- ファイル名は`{scope}.instructions.md`の形式
- 例: `style.instructions.md`, `validation.instructions.md`

## ファイルを使用する

1. コマンドパレットを開き、「命令を添付」を選択します。
2. 使用するファイルを選ぶと自動的にチャットに追加されます。

## ファイルを作成する

1. コマンドパレットを開き、「命令を添付」を選択します。
2. 「新しい命令ファイルを作成」を選択します。
3. ワークスペースで共有する場合は、`.github/instructions/` ディレクトリに保存してください。
4. ユーザーが自分用に命令ファイルを作成する場合は、任意の「ユーザーデータフォルダ」に保存してください。

## 指示ファイルの参照・優先順位

- すべてのチャットに[copilot-instructions.md](../copilot-instructions.md)が追加されます。
- `*instructions.md` ファイルは、指定したスコープに応じて適用されます。
- 指示ファイル同士の競合や曖昧な指示に注意してください。
