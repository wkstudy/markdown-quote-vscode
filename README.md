# Markdown Quote

一个极简的 VSCode 扩展：把选中的文本一键转成 Markdown 引用格式，并可选标注为 AI 回答。

## 功能

两个命令，都挂在右键菜单，也各有快捷键：

- **转为引用**：纯 `>` 引用，不加任何标注 —— `Cmd+Alt+Q`（Win/Linux：`Ctrl+Alt+Q`）
- **转为 AI 引用**：引用 + 顶部 AI 标注行 —— `Cmd+Alt+Shift+Q`（Win/Linux：`Ctrl+Alt+Shift+Q`）

「转为 AI 引用」效果：

```
> **🤖 AI 回答**
>
> 选中的内容...
```

## 配置

在 VSCode 设置里搜索 `Markdown Quote`：

- `markdownQuote.label`：AI 引用的标注文案，默认 `🤖 AI 回答`
- `markdownQuote.style`：
  - `bold`（默认）：加粗标注行
  - `alert`：使用 GitHub `[!NOTE]` 提示块样式

## 本地开发

用 VSCode 打开本目录，按 `F5` 启动「扩展开发宿主」窗口即可调试。

## License

MIT
