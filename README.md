# Introduction
This is just a test monorepo to reproduce the issue I encounter in the main project monorepo that I work with.
I want to try get nvim lspconfig working the same as coc.nvim and vscode, so I can integrate vim into my workflow.

For some reason with neovim's native lsp client I'm unable to use 'jump to definition' or 'find references'.
## Steps to reproduce

1.  [Setup a minimal config](https://github.com/neovim/nvim-lspconfig/blob/master/test/minimal_init.lua)
2.  Have tsserver installed `npm install -g typescript typescript-language-server`
3.  Clone this repo
4.  Go to `apps/app1/src/page1.jsx` and put your cursor on `<NiceComponentOverlay />`
5.  Use `<cmd>lua vim.lsp.buf.definition()<CR>` which should be mapped to `gd`
6.  - it will only jump to `line 2` where it is imported.
7.  - Expected behaviour is to jump to `apps/app1/src/pages/page1/components/NiceComponentOverlay/NiceComponentOverlay.jsx`
8.  Remove test-monorepo-lsp/node_modules/typescript
9.  Repeat steps 4 - 5 for desired behaviour

Additionally when I use `:Telescope lsp_references` it does not include the file in the list of references.
But I am able to grep for `NiceComponentOverlay` and find it that way, which works but is not ideal.

But if you use VSCode and right click on the component and go to definition, it will jump directly to the definition.
Likewise, when I use CoC.nvim I'm able to jump to the definition straight away.

## Why is this happening?

With how the project structure is, there is a global `node_modules` folder at the very root level, and each individual app with have it's own local node_modules with any specific packages it requires.

In the global node_modules folder, I realised that the `typescript` module was causing the issue for the lsp not to function properly. If I removed only this package it worked exactly like coc/vscode, but if this module was in the node_modules folder, it would not work.

How can I get the native lsp client working without removing this module folder as it's not viable to do so, and coc/vscode work without any modification.

## Information

### :LspInfo
```
 Client: tsserver (id: 2, pid: 31221, bufnr: [1])
 	filetypes:       javascript, javascriptreact, javascript.jsx, typescript, typescriptreact, typescript.tsx
 	autostart:       true
 	root directory:  /Users/name/test-monorepo-lsp/apps/app1
 	cmd:             typescript-language-server --stdio
```

### neovim version
```
NVIM v0.7.0-dev+1387-gd73bf3138
Build type: Release
LuaJIT 2.1.0-beta3
Compiled by rle44@UKC02G20GGML85
```