const vscode = require('vscode');

/**
 * 把一段文本转成 Markdown 引用，并在开头加 AI 标注。
 * 每一行前加 "> "，空行输出 ">"。
 */
function toAiQuote(text, label, style) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const body = lines.map((l) => (l.length ? '> ' + l : '>')).join('\n');
  const header = style === 'alert' ? '> [!NOTE] ' + label : '> **' + label + '**';
  return header + '\n>\n' + body;
}

function activate(context) {
  const cmd = vscode.commands.registerCommand('aiQuote.convertSelection', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('没有活动的编辑器');
      return;
    }
    const cfg = vscode.workspace.getConfiguration('aiQuote');
    const label = cfg.get('label', '🤖 AI 回答');
    const style = cfg.get('style', 'bold');

    const selections = editor.selections.filter((s) => !s.isEmpty);
    if (selections.length === 0) {
      vscode.window.showInformationMessage('请先选中要转换的文本');
      return;
    }

    await editor.edit((editBuilder) => {
      for (const sel of selections) {
        const text = editor.document.getText(sel);
        editBuilder.replace(sel, toAiQuote(text, label, style));
      }
    });
  });
  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate, toAiQuote };
