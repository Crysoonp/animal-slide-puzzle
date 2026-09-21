# ローカル開発環境セットアップ記録

最終更新日: 2026-09-21  
対象プロジェクト: 動物スライドパズル  
リポジトリ: `https://github.com/Crysoonp/animal-slide-puzzle`

## 目的

GitHub Codespacesを使わず、Windows PC上で動物スライドパズルを編集、確認、コミット、プッシュできるようにするための環境記録です。

環境を再構築するときや、使用しているアプリ・設定が分からなくなったときは、このファイルを確認してください。

## インストール済みアプリ

### Visual Studio Code

用途:

- HTML、CSS、JavaScriptなどの編集
- PowerShellターミナルの実行
- Gitの変更確認
- GitHubへのコミットとプッシュ

プロジェクトを開く場所:

```text
%USERPROFILE%\Documents\GitHub\animal-slide-puzzle
```

フォルダーを開く手順:

```text
Visual Studio Code
→ File
→ Open Folder
→ %USERPROFILE%\Documents\GitHub\animal-slide-puzzle
```

ターミナルを開く手順:

```text
Terminal
→ New Terminal
```

### Git for Windows

用途:

- GitHubからリポジトリを取得する
- 変更履歴を保存する
- GitHubへ更新を送信する

インストール時の重要設定:

```text
Git from the command line and also from 3rd-party software
```

推奨エディター:

```text
Use Visual Studio Code as Git's default editor
```

認証管理:

```text
Git Credential Manager
```

確認コマンド:

```powershell
git --version
```

### Node.js

インストール済みバージョン:

```text
Node.js v24.21.0 LTS
```

用途:

- JavaScriptの構文確認
- npmパッケージの管理
- ローカルWebサーバーの起動
- Capacitorを使ったAndroidアプリ化

確認コマンド:

```powershell
node --version
```

確認済みの表示:

```text
v24.21.0
```

### npm

インストール済みバージョン:

```text
npm 11.19.0
```

確認コマンド:

```powershell
npm --version
```

確認済みの表示:

```text
11.19.0
```

## PowerShellの設定

npm実行時に次のエラーが出たため、現在のWindowsユーザーに対して実行ポリシーを変更しました。

```text
このシステムではスクリプトの実行が無効になっているため、npm.ps1を読み込むことができません。
```

実行したコマンド:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

設定後は、通常の`npm`コマンドを使用できます。

```powershell
npm --version
npx --version
npm install
```

設定を元に戻す必要がある場合:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Restricted
```

## GitHubリポジトリ

リポジトリURL:

```text
https://github.com/Crysoonp/animal-slide-puzzle.git
```

PC上の保存場所:

```text
%USERPROFILE%\Documents\GitHub\animal-slide-puzzle
```

再取得するときのコマンド:

```powershell
cd $HOME\Documents
New-Item -ItemType Directory -Name GitHub -Force
cd GitHub
git clone https://github.com/Crysoonp/animal-slide-puzzle.git
cd animal-slide-puzzle
code .
```

## 現在のゲームバージョン

```text
Ver.1.2
正式バージョン: 1.2.0
```

確認コマンド:

```powershell
Get-Content VERSION
```

正常な表示:

```text
1.2.0
```

## 作業開始時の確認

Visual Studio Codeでプロジェクトを開いたら、最初に以下を実行します。

```powershell
git pull
git status
node --check game.js
```

正常なGit状態:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

`node --check game.js`は、何も表示されず入力待ちへ戻れば正常です。

## ローカルでゲームを起動する方法

ターミナルで実行:

```powershell
npx http-server . -p 8000 -c-1
```

初回にインストール確認が出た場合:

```text
Ok to proceed? (y)
```

`y`を入力してEnterを押します。

ブラウザーで開くURL:

```text
http://127.0.0.1:8000
```

サーバーを停止する方法:

```text
Ctrl + C
```

## 基本的なGit操作

変更確認:

```powershell
git status --short
```

差分確認:

```powershell
git diff
```

変更を登録:

```powershell
git add 対象ファイル
```

コミット:

```powershell
git commit -m "変更内容"
```

GitHubへ送信:

```powershell
git push
```

最新状態を取得:

```powershell
git pull
```

## コード修正時の運用方針

- 長いコードはターミナルへ直接貼り付けない
- 長い修正は、構文確認済みの`.py`修正ファイルを使う
- 小規模修正は、編集ファイル、検索文字列、変更種類、正確な位置、選択範囲を確認して手動修正する
- 修正後は`node --check game.js`を実行する
- 問題がなければコミットしてプッシュする
- 作業終了時は`git status`で`working tree clean`を確認する

## Android試験版の今後の予定

次に導入予定:

```text
Android Studio
Android SDK
Capacitor
```

予定している試験版:

```text
アプリ名: 動物スライドパズル
英語名: Animal Slide Puzzle
試験版: 0.1.0
パッケージID候補: com.tecogame.animalslidepuzzle
```

Android関連のアプリや設定を追加した場合は、このファイルへ追記します。

## トラブル時の確認順

1. Visual Studio Codeで正しいフォルダーを開いているか確認
2. ターミナルの場所がプロジェクトフォルダーか確認
3. `git status`を実行
4. `node --version`を実行
5. `npm --version`を実行
6. `node --check game.js`を実行
7. 必要に応じて`git pull`を実行

正しいターミナル位置:

```text
PS %USERPROFILE%\Documents\GitHub\animal-slide-puzzle>
```
