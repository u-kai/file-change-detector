# auto_create_storybook

## 概要

-   tsx でコンポーネントを作成するとそのコンポーネントの storybook ファイルの雛形が以下のように自動生成される

```typescript : Index.stories.tsx
import { Index } from '../../../src/pages/Index'
import { action } from '@storybook/addon-action'
export default {
    component: Index,
    title: 'Index',
}
export const Storybook = () => <Index>auto create</Index>
```

## 使用方法

```
# ~/配下に本ディレクトリを配置していると仮定
#　以下コマンドは作業ディレクトリで行うこと
node ~/file-change-detector/dist/mains/auto_create_storybook.js
# 監視モードに入る
```

## 制約条件

-   作業ディレクトリに auto-sb.json を作成する．この値を参考にファイル生成を行っている

```json : auto-sb.json
{
    "srcTop": "./src",
    "storybookTop": "./storybooks"
}
```

-   srcTop がコンポーネントを格納するルートディレクトリ
-   storybookTop が storybook のファイルを格納するルートディレクトリ

-   srcTop 配下に作成するファイル名とコンポーネント名が一致していない場合，依存関係をうまく反映できない
-   コンポーネント名及びファイル名の一文字目は大文字出ないとエラーを投げる
