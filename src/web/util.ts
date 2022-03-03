import { DOMParser } from '@xmldom/xmldom';
import * as XPath from 'xpath';

export function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const parser = new DOMParser();

export function parseHtml(text: string) {
  return parser.parseFromString(text, 'text/html');
}

export function select1(xpath: string, node: Node): Element {
  return XPath.parse(xpath).select1({
    node,
    isHtml: true,
  });
}
