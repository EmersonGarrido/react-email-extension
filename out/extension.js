"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const jsx_to_html_1 = require("jsx-to-html");
const babel = __importStar(require("@babel/core"));
function activate(context) {
    console.log('Congratulations, your extension "react-email-extension" is now active!');
    let disposable = vscode.commands.registerCommand("extension.previewTSX", () => {
        const panel = vscode.window.createWebviewPanel("previewTSX", "React Email Preview", vscode.ViewColumn.Two, { enableScripts: true });
        const updateWebview = () => {
            panel.title = "React Email Preview";
            panel.webview.html = getWebviewContent();
        };
        vscode.workspace.onDidChangeTextDocument((event) => {
            var _a;
            if (event.document === ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document)) {
                updateWebview();
            }
        });
        vscode.window.onDidChangeActiveTextEditor(() => {
            updateWebview();
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getWebviewContent() {
    var _a;
    const email = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.getText();
    const { code } = babel.transform(email, {
        plugins: ["jsx-to-html/babel-plugin"],
        blacklist: ["react"],
    });
    const html = (0, jsx_to_html_1.render)(code);
    return `${html}`;
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map