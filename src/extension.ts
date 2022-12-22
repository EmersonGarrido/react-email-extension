import * as vscode from 'vscode'
import { render } from 'jsx-to-html'
import * as babel from '@babel/core'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "react-email-extension" is now active!',
  )

  let disposable = vscode.commands.registerCommand('extension.previewTSX', () => {
    const panel = vscode.window.createWebviewPanel(
      'previewTSX',
      'React Email Preview',
      vscode.ViewColumn.Two,
      { enableScripts: true },
    )

    const updateWebview = () => {
      panel.title = 'React Email Preview'
      panel.webview.html = getWebviewContent()
    }

    // Atualiza a visualização do painel quando o código for alterado
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document === vscode.window.activeTextEditor?.document) {
        updateWebview()
      }
    })

    // Atualiza a visualização do painel quando o usuário mudar de aba no editor
    vscode.window.onDidChangeActiveTextEditor(() => {
      updateWebview()
    })
  })

  context.subscriptions.push(disposable)
}

function getWebviewContent() {
  const email = vscode.window.activeTextEditor?.document.getText()

  const { code } = babel.transform(email, {
    plugins: ['jsx-to-html/babel-plugin'],
    blacklist: ['react'],
  })

  const html = render(code)

  return html
}

export function deactivate() {}
