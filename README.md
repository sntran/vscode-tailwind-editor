# vscode-tailwind-editor

Tailwind Editor in VSCode.

Preview your web page built with Tailwind directly in Visual Studio Code without running any build toool.
Changes made in the preview's DevTools are saved back to the HTML file, and vice versa.

The goal is to provide visual editing UI to toggle Tailwind utilities on individual elements on the page.

## Features

- [x] Display visual preview of a HTML file with Tailwind.
- [x] Changes from DevTools are saved back to HTML file.
- [x] Changes from HTML file are reflected in editor.
- [x] Server-Side Includes.
- [ ] Changes from DevTools on SSI are saved in respective HTML file.
- [ ] Changes in SSI are reflected on the includee.
- [ ] Breadcrumbs for selected element in editor.
- [ ] Highlight elements.
- [ ] Menu items to Undo and Redo

## Requirements

None

## Extension Settings

This extension contributes the following settings:

- `tailwind.editor.serverSideIncludes`: settings for Server-Side Includes support

## Known Issues

## Release Notes

### 0.1.0

Initial release of VSCode Tailwind Editor with two-way editing and SSI support.
