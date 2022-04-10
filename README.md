# Introduction
This is just a test monorepo to reproduce the issue I encounter in the main project monorepo that I work with. I want to try get nvim lspconfig working the same as coc.nvim and vscode, so I can integrate vim into my workflow.

For some reason with neovim's native lsp client I'm unable to use 'jump to definition' or 'find references'.

## Scenario
If you go to `apps/app1/src/page1.jsx` and put your cursor on `<NiceComponentOverlay />`then try to use
 `<cmd>lua vim.lsp.buf.definition()<CR>` which I have mapped to `gd`, it will only jump to `line 2` where it is imported.
The desired effect is to jump to the actual file definition in
`apps/app1/src/pages/page1/components/NiceComponentOverlay/NiceComponentOverlay.jsx`

Additionally when I use `:Telescope lsp_references` it does not include the file in the list of references.
But I am able to grep for `NiceComponentOverlay` and find it that way, which works but is not ideal.

But if you use VSCode and right click on the component and go to definition, it will jump directly to the definition. Likewise, when I use CoC.nvim I'm able to jump to the definition straight away.

## Why is this happening?

With how the project structure is, there is a global `node_modules` folder at the very root level, and each individual app with have it's own local node_modules with any specific packages it requires.

In the global node_modules folder, I realised that the `typescript` module was causing the issue for the lsp not to function properly. If I removed only this package it worked exactly like coc/vscode, but if this module was in the node_modules folder, it would not work.

How can I get the native lsp client working without removing this module folder as it's not viable to do so, and coc/vscode work without any modification.

### :LspInfo
```
 Client: tsserver (id: 2, pid: 31221, bufnr: [1])
 	filetypes:       javascript, javascriptreact, javascript.jsx, typescript, typescriptreact, typescript.tsx
 	autostart:       true
 	root directory:  /Users/name/test-monorepo-lsp/apps/app1
 	cmd:             typescript-language-server --stdio
```