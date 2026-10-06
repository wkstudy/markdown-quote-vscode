const vscode = require('vscode');

/**
 * 把一段文本转成 Markdown 引用：每一行前加 "> "，空行输出 ">"。
 */
function toQuote(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  return lines.map((l) => (l.length ? '> ' + l : '>')).join('\n');
}

/**
 * 在引用的基础上，在开头加一行 AI 标注。
 */
function toAiQuote(text, label, style) {
  const header = style === 'alert' ? '> [!NOTE] ' + label : '> **' + label + '**';
  return header + '\n>\n' + toQuote(text);
}

async function applyTransform(transform) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('没有活动的编辑器');
    return;
  }
  const selections = editor.selections.filter((s) => !s.isEmpty);
  if (selections.length === 0) {
    vscode.window.showInformationMessage('请先选中要转换的文本');
    return;
  }
  await editor.edit((editBuilder) => {
    for (const sel of selections) {
      editBuilder.replace(sel, transform(editor.document.getText(sel)));
    }
  });
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('markdownQuote.convert', () => applyTransform(toQuote)),
    vscode.commands.registerCommand('markdownQuote.convertAi', () => {
      const cfg = vscode.workspace.getConfiguration('markdownQuote');
      const label = cfg.get('label', '🤖 AI 回答');
      const style = cfg.get('style', 'bold');
      return applyTransform((text) => toAiQuote(text, label, style));
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate, toQuote, toAiQuote };
