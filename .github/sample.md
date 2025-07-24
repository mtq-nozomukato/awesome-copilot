---
tags:
  - MtQ
  - Github
  - github_copilot
published:
marp: true
theme: default
paginate: true
_paginate: false
---

<!--
headingDivider: 2 - 見出しレベル2以下で区切る
style: |
  h1, h2, p, ul, ol{
    color: #333;
  }
-->

# Github Copilot for Review

2025.07.11 Github Copilot と VSCode を使用したコードレビューの効率化と導入事例

## 概要

- GitHub Copilot を活用して開発支援やコードレビューにあたっての予備知識とそれに伴う注意が必要。
- VSCode では GitHub Copilot の カスタマイズすることでチームのコーディング規約やプロジェクトの要件に合わせたコードの生成やレビューの実施が可能。
- GitHub Copilot によるレビューはあくまで補完材料。**最終確認は人間が行うことが重要**。
- 今後、自立型エージェントを活用する場合は、ドキュメントの整備が肝心。**MCP サーバー**を使って外部ツールと連携もできるようになる。

## 目次

1. [前提条件と注意事項](#1-前提条件と注意事項)
2. [プロジェクトでの活用事例](#2-プロジェクトでの活用事例)
3. [GitHub 上での Pull Request レビュー](#3-github-上での-pull-request-レビュー)
4. [VSCode 上での Github Copilot のカスタマイズ](#4-vscode-上での-github-copilot-のカスタマイズ)
   - [カスタムインストラクション（指示ファイル）](#43-カスタムインストラクション指示ファイル)
   - [プロンプトファイル](#44-プロンプトファイル)
   - [カスタムチャットモード](#45-カスタムチャットモード)
5. [MCP (Model Context Protocol) サーバーの活用](#5-mcp-model-context-protocol-サーバーの活用)
6. [GitHub Copilot 活用のためのドキュメント整備](#6-github-copilot-活用のためのドキュメント整備)
7. [今後の変化と取り組みについて](#7-今後の変化と取り組みについて)

## 1. 前提条件と注意事項

## 1.1. 前提条件

GitHub Copilot を VS Code で利用するには、以下の準備が必要です。

- **Visual Studio Code の最新バージョン**がインストールされていること。
- **GitHub Copilot へのアクセス**があること。これには GitHub Copilot の拡張機能のインストールも含まれます。

## 1.2. 課金体系について

GitHub Copilot の利用にはいくつかのプランがあります。

- **Copilot Free プラン**: 月間上限付きでコード補完とチャット対話が利用可能です。
- **有料プラン（Copilot Pro, Copilot Business など）**: 基本モデル使用時は無制限のコード補完、エージェントリクエスト、チャット対話が可能です。

## 1.3. Premium リクエスト

Copilot Chat、Agent モード、コードレビュー、Copilot Extensions など、一部の高度な Copilot 機能は Premium リクエストを消費します。

- Premium リクエストの消費量は、使用される AI モデルによって異なります（例: GPT-4.5 は 50 倍の乗数）。
- 月間クォータを使い切った後も基本モデルは利用できますが、**追加の Premium リクエストは 1 リクエストあたり$0.04 USD で課金されます**。
- 特に、Copilot コードレビューの**「変更のレビュー」は Premium 機能**であり、月間クォータが適用されます。このクォータは 2025 年 5 月 5 日から開始されます。

## 1.4. 利用上の注意点

- **AI によるレビュー結果の最終確認は人間が行う**: Copilot はコードの潜在的な問題点や改善点を指摘しますが、その結果を鵜呑みにせず、必ず人間の目で確認することが重要です。AI はコードの意図や、最新のセキュリティ脅威に対応できない場合があります。
- **ガイドラインの明確化**: チーム内でコードレビューのガイドラインを設け、Copilot の利用方法と責任範囲を明確にしておくことが推奨されます。
- **MCP サーバーの安全性**: MCP サーバーは任意のコードを実行する可能性があるため、**信頼できるソースからのみ追加し、その設定を十分にレビューしてください**。
- **Agent モードの自動承認**: `chat.tools.autoApprove` 設定を有効にすると、ツール実行時の確認が省略されます。これにより、モデルが潜在的に破壊的なアクションを自動で実行してしまう可能性があるため、注意が必要です。

## 2. プロジェクトでの活用事例

## 2.1. プロジェクトでの活用事例

大規模基幹システムでの導入

- 多数のメンバー（ドメイン単位でチーム編成＆レビュー）
- Frontend: React(CRA)
- Backend: Laravel(PHP)

新規開発プロジェクト（現状）

- 2 人
- Frontend: React(Vite)
- Backend: Laravel(PHP)
- **Document: AI コーディング前提で使用**。Markdown 管理用

※小規模かつ言語が同じなら、モノレポの方が効率的

## 2.2. 大規模基幹システムでの導入

- **指示ファイルの整備**: プロジェクト固有の文脈や設計方針、命名規則などを記述した指示ファイル（カスタムインストラクション）を整備し、Copilot のコード生成や提案の精度を高めています
- **プロンプトファイルの共有**: 基本的なレビューに利用できるプロンプトファイルを共有。チーム内での Copilot の利用を標準化し始めています
- **個人での活用**: 上記以外の Copilot の機能（MCP 連携、PR 自動作成）については、運用ルールが未整備のため、現状は主に個人レベルで活用しています

今後、全体またはチーム毎に Copilot の運用ルールやガイドラインを定め、ドキュメントの整備を進める。個人的には Agent Mode や MCP の活用を推進したい。

## 3. GitHub 上での Pull Request レビュー

## 3.1. GitHub 上での PR レビュー

GitHub Copilot は、プルリクエスト（PR）に対して AI が自動的にレビューを行い、フィードバックを提供することが可能です。これにより、コードの潜在的な問題点や改善点を指摘し、コード品質の向上を支援します。

![w:100em](attachments/20250709171709.png)

## 3.2. 利用方法 - 手動

**手動アサイン**(推奨):

1. プルリクエストを作成するか、既存のプルリクエストに移動します。
2. 「Reviewers」メニューを開き、**「Copilot」を選択してアサイン**します。
3. Copilot が PR をレビューするまで待ちます。通常は 30 秒未満で完了します。
4. Copilot は **「コメント」レビュー**を残します。「承認」や「変更要求」にはカウントされません。

## 3.3 利用方法 - 自動

**自動レビュー設定**:

1. リポジトリの設定で**ルールセット**を追加または編集します。
2. 「Require a pull request before merging」を有効化した上で、その配下にある **「Request pull request review from Copilot」にチェック**を入れると、すべての PR で Copilot が自動的にレビューするようになります。

**再レビューの要求**: PR への変更をプッシュした後、Copilot による再レビューは自動では行われません。再レビューを要求するには、「Reviewers」メニューの Copilot の名前の横にあるボタンをクリックします。

## 3.4. レビューのカスタマイズ例

Copilot のレビューを特定のニーズに合わせて調整できます。

- **PULL_REQUEST_TEMPLATE.md による設定**:

  - GitHub の`PULL_REQUEST_TEMPLATE.md`ファイルを編集し、`<!-- for GitHub Copilot review rule -->` で囲んだ形式で指示を埋め込むことができます。
  - これにより、PR 作成者がレビューしてほしいポイントを明確に伝えられ、レビュー担当者（Copilot）が指示に基づいて効率的にレビューを進めることができます。
  - 例として、セキュリティチェックや可読性のレビュー、依存関係の確認などをリスト形式で記述できます。

## 3.5. PULL_REQUEST_TEMPLATE.md の設定例

`.github/pull_request_template.md`

```markdown
<!-- I want to review in Japanese. -->

## 内容

[チケット](url): xxx の改修をしました。

## 動作確認項目

- [x] xxxxxx

## レビュー希望日

mm/dd (曜日) までにレビューお願いします！

<!-- for GitHub Copilot review rule -->
<!-- レビューする際には、以下のprefix(接頭辞)をつけてください [must] [imo] (in my opinion) [nits](nitpick) [ask] [fyi] -->
<!-- for GitHub Copilot review rule-->
<!-- I want to review in Japanese. -->
```

## 3.6. プルリクエストレビューの設定例

- **コメント指示による設定**:
  - `<!-- for GitHub Copilot review rule -->` で囲む形式で Copilot に指示を出すことも可能です。
  - 例：「この関数にセキュリティ上の懸念がないか教えてください」、「このコードがプロジェクトのコーディング規約に準拠しているか確認してください」。
- **日本語でのレビュー**:
  - コメントに**`<!-- I want to review in Japanese. -->`** を含めることで、Copilot に日本語でレビューを依頼できます。
  - 英語と日本語の併記を依頼することも可能です。
- **その他**:
  - 現状カスタム指示は渡せない。PR 内に記載するしかない。
  - Premium リクエストを消費する

## 3.7. GitHub Copilot Review Example

![w:600](attachments/20250709164041.png)

## 3.8. Copilot Chat や VSCode を使ったコードレビューの実施

**Copilot Chat**: [https://github.com/copilot](https://github.com/copilot)

- Github 版の Chat AI
- 例えば、pull request 時に chat を起動した場合、Web 上に履歴として残る。

**変更確認（変更のレビュー）**:

- コードの変更が全体に与える影響を詳細に評価
- カスタムコーディングガイドラインやコンテキストの追加もサポート

**選択的レビュー**:

- VSCode でのみ利用可能で、コードの特定部分に焦点を当てたレビュー

## 4. VSCode 上での Github Copilot のカスタマイズ

## 4.1. 主なカスタマイズ方法

VSCode では以下の方法で GitHub Copilot の応答をカスタマイズできます。

1. カスタムインストラクション
2. プロンプトファイル
3. カスタムチャットモード

チャット動作を特定のタスクに合わせて調整し、コーディングプラクティスやプロジェクト要件に合わせた応答やコード生成が可能になります。

## 4.2. ディレクトリ構成例

```sh
.github
├── copilot-instructions.md
├── PULL_REQUEST_TEMPLATE.md
├── instructions
│   ├── general.instructions.md
│   ├── README.md
│   └── testing.instructions.md
├── prompts
│   ├── README.md
│   └── review.prompt.md
├── chatmodes
│   ├── planning.chatmode.md
│   └── README.md
├── actions
└── workflows

.vscode
├── extensions.json
└── settings.json
```

## 4.3. カスタムインストラクション（指示ファイル）

**概要**: AI に共通のガイドラインやルールを記述し、コード生成、コードレビュー、コミットメッセージ生成などのタスクにおいて、AI が特定のコーディングプラクティスや技術スタックに合わせた応答を生成するように設定できます。これにより、チャットプロンプトに毎回同じ情報を入力する手間が省けます。

**種類と利用方法**: VS Code では、カスタムインストラクションを定義する複数の方法がサポートされています。

1. `copilot-instructions.md`
2. `*.instructions.md`
3. VSCode 設定（`settings.json`）

## 4.3.1. `.github/copilot-instructions.md` ファイル

- プロジェクトのルートにこの Markdown ファイルを作成し、コード生成に関する指示を記述します。
- このファイルに記述された指示は、Copilot がサポートする**全ての IDE** (VS Code, Visual Studio, GitHub.com など) で利用でき、**全てのチャットリクエストに自動的に含まれます**。
- 一般的なコーディング規約、推奨技術、プロジェクト要件の定義に適しています。
- 利用するには、`github.copilot.chat.codeGeneration.useInstructionFiles` 設定を`true`にする必要があります。
- **例**: Java の依存関係管理に Bazel を使用する、JavaScript のコーディングスタイル（二重引用符とタブ）を指定する、Jira をタスク追跡に使用する、など。

## 4.3.2. `*.instructions.md` ファイル

- 1 つまたは複数の`.instructions.md`ファイルをワークスペースまたはユーザープロファイルに作成できます。
- これらのファイルは、**タスク固有のコード生成指示**や、指示を自動的に適用するファイル（glob パターンを使用）を細かく制御したい場合に有用です。
- デフォルトでは、ワークスペースの指示ファイルは`.github/instructions`フォルダーに保存されます。
- ファイルは Front Matter ヘッダーと指示内容のボディで構成され、`applyTo`プロパティで適用対象を指定できます。
- **例**: TypeScript/React のコーディングガイドライン、命名規則、エラーハンドリングなど。

## 4.3.3. 使用例

`.github/instructions/types.instructions.md`

```markdown
---
applyTo: "types/**.ts,types/**.tsx"
---

# 型定義

TypeScript での型定義に関するガイドライン

### 型の使用方針

1. 具体的な型を使用
   - any の使用を避ける

### エラー処理

1. Result 型の使用
```

## 4.3.4. VS Code 設定（`settings.json`）

- VS Code のユーザー設定またはワークスペース設定で直接カスタムインストラクションを指定できます。
- これは、コード生成以外のシナリオ（**テスト生成、コミットメッセージ、コードレビュー、プルリクエストのタイトル・説明生成**など）に指示を適用するのに便利です。
- 設定値としてテキストを直接記述する（`text`プロパティ）か、外部ファイルを参照する（`file`プロパティ）ことができます。

## 4.3.5. 設定例

コミットメッセージを日本語で生成するように指示する(text or file)

```json
{
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "text": "コミットメッセージは、日本語で生成してください"
    }
  ]
}
```

```json
{
  "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "file": ".github/copilot-instructions.md"
    }
  ]
}
```

## 4.3.6. カスタムインストラクションの作成と管理のコツ

- **簡潔に事実のみを記述する**: 指示は短く、自己完結型の文であるべきです。複雑なルールには具体例を含めると良いでしょう。
- **外部リソースを参照しない**: 指示内で特定のコーディング標準などの外部リソースを参照しないようにします。
- **指示を複数ファイルに分割する**: トピックやタスクタイプごとに指示ファイルを分割することで、整理しやすく、管理が容易になります。
- **継続的な改善**: カスタムインストラクションは一度作成して完成するものではなく、**徐々に加筆修正して精度を上げていく**ことが重要です。
- **Copilot Chat にのみ適用**: カスタムインストラクションは Copilot Chat の応答にのみ影響し、**インラインコード補完には適用されません**。
- **競合の回避**: 複数の種類のカスタム指示が会話に適用されることがありますが、AI の応答品質を確保するため、競合する指示を提供しないように注意する必要があります。

## 4.4. プロンプトファイル

【実験的機能 experimental】

**概要**: コード生成やコードレビューのような一般的なタスクのために、**再利用可能なプロンプト**を定義できます。これらはスタンドアロンのプロンプトとして、チャットで直接実行できます。共通のコンテキストは指示ファイルに記述しつつ、タスク固有の指示をプロンプトファイルに含めることができます。

**ファイル構造**: `.prompt.md`という拡張子の Markdown ファイルで定義されます。

## 4.4.1. プロンプトファイルの構成

- **Front Matter (オプション)**:
  - `mode`: プロンプト実行時に使用するチャットモード（`ask`, `edit`, `agent`、デフォルトは`agent`）。
  - `tools`: Agent モードで使用可能なツール（セット）の名前のリスト。
  - `description`: プロンプトの短い説明。
- **Body**: 自然言語の指示、追加コンテキスト、他のプロンプトファイルや指示ファイルへのリンクなどを Markdown 形式で記述します。
- **変数**: プロンプト内で`${variableName}`構文を使用して変数を参照できます。これにはワークスペース変数、選択変数、ファイルコンテキスト変数、入力変数が含まれます。

## 4.4.2. 種類とスコープ

- **Workspace prompt files**: 特定のワークスペース内でのみ利用可能で、デフォルトで`.github/prompts`フォルダーに保存されます。
- **User prompt files**: 複数のワークスペースで再利用可能で、現在の VS Code プロファイルに保存されます。設定同期（Settings Sync）機能を使って、複数のデバイス間で同期することも可能です。

## 4.4.3. 作成方法

1. コマンドパレットから `Chat: New Prompt File`を実行します。
2. プロンプトファイルを保存する場所（ワークスペースまたはユーザーデータフォルダー）を選択し、ファイル名を入力します。
3. Markdown 形式でチャットプロンプトの内容を記述します。

## 4.4.4. 利用方法

プロンプトファイルを実行するには複数の方法があります。

1. コマンドパレットから`Chat: Run Prompt`を実行し、リストからプロンプトファイルを選択します。
2. チャット入力フィールドで`/`に続けてプロンプトファイル名を入力します。例えば、`/create-react-form`。
   ![w:500](attachments/20250710112552.png)
3. エディターでプロンプトファイルを開き、タイトルエリアの再生ボタンを押します。
   ![w:600](attachments/20250710112455.png)

## 4.5. カスタムチャットモード

【実験的機能 experimental】

**概要**: カスタムチャットモードは、VS Code 内の AI チャット動作を特定のタスクに合わせて調整するための**事前定義された設定**です。組み込みのチャットモード（Ask, Edit, Agent）に加えて、独自のカスタムモードを定義できます。各チャットプロンプトは、そのモードの境界内で実行され、毎回ツールや指示を設定する必要がありません。

**構成**: `.chatmode.md`という拡張子の Markdown ファイルで定義されます。

## 4.5.1. カスタムチャットモードの構成

- **Front Matter**:
  - `description`: チャットモードの簡単な説明。Chat ビューのモードドロップダウンリストでホバー時に表示されます。
  - `tools`: このチャットモードで利用可能なツールまたはツールセットのリスト。組み込みツール、MCP ツール、拡張機能が提供するツールを含めることができます。
- **Body**: AI に特定のプロンプト、ガイドライン、その他の関連情報を指示します。Markdown リンクを使用して指示ファイルを参照することも可能です。

## 4.5.2. 例

- **プランニングモード**: AI がコードベースへの読み取り専用アクセスを持ち、実装計画のみを生成するモード。
- **研究チャットモード**: 外部リソースにアクセスして新しい技術を探索したり、情報を収集したりできるモード。
- **フロントエンド開発者チャットモード**: フロントエンド開発に関連するコードのみを生成・修正できるモード。

```markdown
---
description: "コードベースへの読み取り専用アクセスを持ち、実装計画のみを生成するモード"
tools:
["codebase", "fetch", "findTestFiles", "githubRepo", "search", "usages"]
---
```

## 4.5.3. 作成方法

1. コマンドパレットから`Chat: New Mode File`を実行します。
2. 新しいチャットモードファイルをワークスペースまたはユーザープロファイルのどちらに作成するかを選択します。
3. チャットモードの名前を入力します。この名前が Chat ビューのモードドロップダウンリストに表示されます。
4. 作成された`.chatmode.md`ファイルに、Front Matter で説明とツールリストを、ボディにチャットモードの指示を追加します。

- VS Code はデフォルトでワークスペースのチャットモードファイルを`.github/chatmodes`フォルダーで探します。

**管理**: 既存のチャットモードを編集・管理するには、コマンドパレットから`Chat: Configure Chat Modes`コマンドを選択します。

## 5. MCP (Model Context Protocol) サーバーの活用

## 5.1. MCP 概要

**概要**: **Model Context Protocol (MCP)** は、AI モデルが外部ツール、アプリケーション、データソースを発見し、連携するための標準化された方法です。VS Code の Agent モードでチャットプロンプトを入力すると、AI モデルは MCP サーバーが提供する様々なツールを呼び出し、ファイル操作、データベースアクセス、API 呼び出しなどのタスクを実行できます。

## 5.1. 利用のメリット

- **機能拡張**: Copilot が扱う情報の範囲を広げ、より適切な提案やタスクの実行を可能にします。
- **カスタマイズ性**: 特定のデータベース接続、カスタム API の呼び出し、Sentry などの監視ツールとの連携など、プロジェクト固有の要件に合わせて Copilot の能力を拡張できます。

## 5.2. MCP サーバーの追加方法

VS Code で MCP サポートを有効にするには、`chat.mcp.enabled`設定を有効にする必要があります。

- **ワークスペース設定 (`.vscode/mcp.json`)**:
  - 特定のワークスペース用に MCP サーバーを設定するには、ワークスペースフォルダーに`.vscode/mcp.json`ファイルを作成します。
  - これにより、チームメンバーとサーバー設定を共有できます。
  - API キーなどの機密情報は、入力変数や環境ファイルを使用することでハードコーディングを避けるべきです。
- **ユーザー設定**: 全てのワークスペースで同じサーバー設定を再利用したい場合は、ユーザー設定にサーバー設定を追加できます。
- **自動検出**: Claude Desktop などの他のツールで定義された MCP サーバーを VS Code が自動的に検出して再利用するよう設定することも可能です（`chat.mcp.discovery.enabled`設定）。

## 5.3. 設定例: GitHub MCP サーバー

`.vscode/mcp.json`

```json
{
  "servers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>"
      }
    }
  }
}
```

## 5.4. MCP ツールの利用

- MCP サーバーを追加すると、Agent モードでそのツールを利用できます。
- Chat ビューで「Tools」ボタンを選択し、利用したいツールを選択または解除できます。
- チャットプロンプトに`#`に続けてツール名を直接記述することで、ツールを参照することも可能です。
- **ツールの承認**: ツールが呼び出される際、デフォルトでは VS Code がアクションの確認を求めます。これは、ツールがローカルマシン上でファイルを変更するなどのアクションを実行する可能性があるためです。継続ボタンのドロップダウンオプションから、特定のツールを現在のセッション、ワークスペース、または今後の全ての呼び出しで自動的に承認するように設定できます。

## 5.5. MCP リソースとプロンプトの利用

- **MCP リソース**: チャットプロンプトでコンテキストとして利用できるリソースも提供できます。例: データベースのテーブル情報
- **MCP プロンプト**: 事前に設定されたプロンプトを提供することができる。チャット入力ボックスで`/mcp.servername.promptname`と入力して直接呼び出し可能

**活用事例**:

- **GitHub の Issue 一覧確認**: GitHub の MCP を設定すると、Copilot Chat の Agent モードで、GitHub の Issue 情報を取得して操作が可能。
- **PostgreSQL データベース操作**: PostgreSQL 拡張をインストールした上で、関連する MCP ツールをチャットモードに含めることで、データベースの管理やクエリの実行が可能。

## 5.6. 例

![w:400](attachments/20250710074526.png)

## 6. GitHub Copilot 活用のためのドキュメント整備

## 6.1. まずはどこからやるべき？

順番に以下を作成していくのがオススメです。

1. プロジェクトのコーディング規約とスタイルガイド
2. コミットメッセージと PR の説明に関するガイドライン
3. テストコード生成とレビューのためのガイドライン
4. 再利用可能なプロンプトファイル
5. カスタムチャットモード定義
6. MCP サーバーの設定とツールの定義

## 6.2. プロジェクトのコーディング規約とスタイルガイド

- **目的**: チームの規約に沿わせる。既存のコードベースと一貫性を持たせる。
- **内容**:
  - **命名規則**: 変数、関数、クラス、コンポーネントなどの命名規約
  - **コード構造とアーキテクチャ**: モジュール、クラス、関数の単一責任の原則、関数のサイズ、継承の深さ、コードの重複回避（DRY 原則）など
  - **特定の技術スタックのガイドライン**: 言語やフレームワークに特化したガイドラインを記述します。
- **配置場所**: `.github/copilot-instructions.md`、増えてきたら`.github/instructions/*.instructions.md`ファイルに分割。

 <!--具体的に定義（例: `PascalCase`, `camelCase`, `ALL_CAPS`など）。 -->
<!-- commnet - **エラーハンドリング**: `try/catch`ブロックの使用、エラー境界の実装、エラーロギングの規則などを定めます。-->

## 6.3. コミットメッセージと PR の説明に関するガイドライン

- **目的**: コミットメッセージや PR の説明が、チームの標準やリリースプロセス（例: Semantic Versioning）に準拠するようにします。
- **内容**:
  - コミットメッセージの基本構造、タイプ（`feat`, `fix`, `docs`など）、Semantic Versioning の適用ルール（`major`, `minor`, `patch`の定義）を具体的に示します。
  - PR の目的、動作確認項目、レビュー希望日、レビュー観点などを定型化します。
- **配置場所**: VS Code の`settings.json`で特定の指示を定義。PR テンプレート（`.github/pull_request_template.md`）に組み込みます。

## 6.4. テストコード生成とレビューのためのガイドライン

- **目的**: テストコードや、コードレビューの質を高めるための指示を提供します。
- **内容**:
  - 使用するテストフレームワーク（例: `@testing-library/react`, Vitest）とベストプラクティス。
  - モック化の戦略やテストの構造、アサーションのスタイル
  - テスト対象（実装ではなくユーザーの操作や振る舞い）の明確化。
- **配置場所**: `.github/instructions/*.instructions.md`ファイルや VS Code の`settings.json`（`github.copilot.chat.testGeneration.instructions`など）。

## 6.5. 再利用可能なプロンプトファイル

- **目的**: 頻繁に実行するタスク（コンポーネントの足場作成、API ルートの生成、セキュリティレビューなど）のプロンプトをテンプレート化し、チーム全体で再利用することで、一貫性を確保し、プロンプト記述の手間を削減します。
- **内容**: 特定のタスクを定義した Markdown ファイル（`.prompt.md`）。必要に応じて、Agent モードで利用するツールやチャットモードも指定します。
- **配置場所**: `.github/prompts/`ディレクトリに配置します。

## 6.6. カスタムチャットモード定義

- **目的**: 特定の役割やタスクに特化した AI の振る舞いを定義し、よりコンテキストに応じたアシスタンスを提供します。
- **内容**: チャットモードの目的、使用可能なツール、AI が取るべきペルソナや指示を記述した Markdown ファイル（`.chatmode.md`）。
- **配置場所**: `.github/chatmodes/`ディレクトリに配置します。

## 6.7. MCP サーバーの設定とツールの定義

- **目的**: AI が外部ツールやデータソースと連携できるようにするための設定を行います。これにより、AI はプロジェクト固有の情報やリソースにアクセスし、より適切な提案やタスクの実行が可能になります。
- **内容**: MCP サーバーの設定ファイル（`.vscode/mcp.json`）に、使用するサーバーのコマンドや環境変数を定義します。また、MCP ツールの定義も行います。
- **配置場所**: ワークスペースの`.vscode/mcp.json`ファイルに配置します。

## 7. 今後の変化と取り組みについて

## 7.1. 今後の変化と取り組みについて

Agent モードのような自立型 AI に触れると、もはや 副操縦士ではなく**パイロット**になりつつあることを実感します。

- Agent モードを中心とした利用できるような環境整備
  - 高レベルタスク（大規模改修、レガシーコードの移行）も任せたい。
  - Github Actions に設定して、Issue を割り当てることで Pull Request を自動生成する機能の活用
- Claude Code, Gemini CLI などターミナルで動かせる AI の活用
- 専用の AI レビューサービス 例: [CodeRabbit](https://www.coderabbit.ai/ja)

## 参考

Document

- [GitHub Copilot のドキュメント - GitHub Docs](https://docs.github.com/ja/copilot)
- [Customize AI responses in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)

YouTube

- [Smaller prompts, better answers with GitHub Copilot Custom Instructions](https://www.youtube.com/watch?v=zwIlqbTHjac)

GitHub

- [サンプル - mtq-nozomukato/awesome-copilot](https://github.com/mtq-nozomukato/awesome-copilot)
- [GitHub - github/awesome-copilot](https://github.com/github/awesome-copilot)

## 参考記事

- [Copilot Chat で効率化｜ GitHub コードレビュー設定と注意点 | Hakky Handbook](https://book.st-hakky.com/data-science/efficient-code-review-with-github-copilot-chat)
- [Findy の爆速開発を支える GitHub Copilot とエージェント活用法 - Findy Tech Blog](https://tech.findy.co.jp/entry/2025/06/16/070000)
- [GitHub Copilot を味方につける：AI に渡すコンテキスト整備の工夫 - メドピア開発者ブログ](https://tech.medpeer.co.jp/entry/github-copilot-on-your-side)
- [GitHub Copilot の使い方まとめ](https://zenn.dev/ikepon/articles/github-copilot-usage-summary)
- [GitHub Copilot の指示書が複数ファイル対応に！ルールを用途別に整理できる新機能](https://zenn.dev/m10maeda/articles/copilot-multi-instruction-files)
- [GitHub Copilot コードレビュー機能でプルリクエストを日本語でレビューしてもらいたい](https://zenn.dev/rescuenow/articles/55ea72023527d1)
- [GitHub Copilot がプルリクを勝手にレビューしてくれる設定を広めたい](https://zenn.dev/ncdc/articles/7807f5b6e3ee88)
- [VS Code の Copilot と Copilot Chat の機能と活用方法 | DevelopersIO](https://dev.classmethod.jp/articles/vs-code-copilot-features/)

## マトリクス

<style scoped>
section{
   margin: 0 auto;
   padding: 0;
   max-width: 95%;
}
table {
    font-size: 9.5px;
}
</style>

| 機能                                    | `.github/copilot-instructions.md`                                                                                                                                 | `*.instructions.md` (タスク/ファイル固有指示)                                                                                          | `settings.json` (VSCode のタスク別設定)                                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **VS Code**                             |                                                                                                                                                                   |                                                                                                                                        |                                                                                                                                                       |
| コード補完 (Inline Completions)         | **参照なし**                                                                                                                                                      | **参照なし**                                                                                                                           | **参照なし**                                                                                                                                          |
| Copilot Chat                            | `github.copilot.chat.codeGeneration.useInstructionFiles` 設定が `true` (既定で有効) の場合、**自動参照**されます。                                                | `applyTo` メタデータに指定された glob パターンに基づいて**自動参照**。**手動でコンテキストとして追加可能**                             | **参照なし** (一般的な対話モードの動作は別途カスタムチャットモードやプロンプトファイルで設定され、これらの設定がカスタム指示を利用する側になります)。 |
| コミットメッセージ自動生成              | `settings.json`参照させることで利用可。                                                                                                                           | `settings.json`参照させることで利用可。                                                                                                | **設定方法**: `github.copilot.chat.commitMessageGeneration.instructions` に直接テキスト記述 or ファイルパス指定で設定可                               |
| コードレビュー (選択範囲/変更差分)      | `settings.json`参照させることで利用可。                                                                                                                           | `settings.json`参照させることで利用可。                                                                                                | **設定方法**: `github.copilot.chat.reviewSelection.instructions` に直接テキスト記述 or ファイルパス指定で設定可                                       |
| テスト生成                              | `settings.json`参照させることで利用可。                                                                                                                           | `settings.json`参照させることで利用可。                                                                                                | **設定方法**: `github.copilot.chat.testGeneration.instructions` に直接テキスト記述 or ファイルパス指定で設定可                                        |
| Pull Request タイトル/説明生成          | `settings.json`参照させることで利用可。                                                                                                                           | `settings.json`参照させることで利用可。                                                                                                | **設定方法**: `github.copilot.chat.pullRequestDescriptionGeneration.instructions` に直接テキスト記述 or ファイルパス指定で設定可                      |
| プロンプトファイル (`.prompt.md`)       | プロンプトファイル内で、他の指示ファイルを Markdown リンクを使用して**明示的に参照可能**                                                                          | プロンプトファイル内で、他の指示ファイルを Markdown リンクを使用して**明示的に参照可能**                                               | **参照なし** (プロンプトファイルは、カスタム指示を利用するためのメカニズムです)。                                                                     |
| カスタムチャットモード (`.chatmode.md`) | カスタムチャットモードの定義ファイル内で、そのモード固有の指示を記述したり、既存の指示ファイルを Markdown リンクで参照したりできます。                            | カスタムチャットモードの定義ファイル内で、そのモード固有の指示を記述したり、既存の指示ファイルを Markdown リンクで参照したりできます。 | **参照なし** (カスタムチャットモードは、カスタム指示を利用するためのメカニズムです)。                                                                 |
| **GitHub (Web)**                        |                                                                                                                                                                   |                                                                                                                                        |                                                                                                                                                       |
| Copilot Chat (Web 版)                   | ファイルを保存するとすぐに、リポジトリに関連するチャットプロンプトに指示セットが**自動的に追加され使用されます**。                                                | **参照なし** (これは VS Code 固有の機能です)。                                                                                         | **参照なし**                                                                                                                                          |
| コードレビュー (Pull Request)           | リポジトリ設定でカスタムコーディングガイドラインを構成することで**自動参照**されます。また、プルリクエスト内のコメントで Copilot に直接指示を出すことも可能です。 | **参照なし** (これは VS Code 固有の機能です)。                                                                                         | **参照なし**                                                                                                                                          |
