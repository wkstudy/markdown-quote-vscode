# AI Quote

一个极简的 VSCode 扩展：把选中的文本一键转成 Markdown 引用格式，并在开头标注为 AI 回答。

## 功能

- 右键菜单：选中文本 → 「转成 AI 引用」
- 快捷键：选中文本 → `Cmd+Alt+Q`（Windows/Linux：`Ctrl+Alt+Q`）

转换效果：

```
> **🤖 AI 回答**
>
> 选中的内容...
```

## 配置

在 VSCode 设置里搜索 `AI Quote`：

- `aiQuote.label`：引用块开头的标注文案，默认 `🤖 AI 回答`
- `aiQuote.style`：
  - `bold`（默认）：加粗标注行
  - `alert`：使用 GitHub `[!NOTE]` 提示块样式

## 本地开发

用 VSCode 打开本目录，按 `F5` 启动「扩展开发宿主」窗口即可调试。

## License

MIT
