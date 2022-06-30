var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
    "use strict";
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    var MIME_TYPE = freeze({
      HTML: "text/html",
      isHTML: function(value) {
        return value === MIME_TYPE.HTML;
      },
      XML_APPLICATION: "application/xml",
      XML_TEXT: "text/xml",
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var NAMESPACE = freeze({
      HTML: "http://www.w3.org/1999/xhtml",
      isHTML: function(uri) {
        return uri === NAMESPACE.HTML;
      },
      SVG: "http://www.w3.org/2000/svg",
      XML: "http://www.w3.org/XML/1998/namespace",
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports.freeze = freeze;
    exports.MIME_TYPE = MIME_TYPE;
    exports.NAMESPACE = NAMESPACE;
  }
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
    var conventions = require_conventions();
    var NAMESPACE = conventions.NAMESPACE;
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!current.hasOwnProperty(element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input)
        return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function copy(src, dest) {
      for (var p in src) {
        dest[p] = src[p];
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt, t2);
        Class.prototype = pt = t2;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error = message;
      } else {
        error = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, DOMException);
      }
      error.code = code;
      if (message)
        this.message = this.message + ": " + message;
      return error;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      length: 0,
      item: function(index) {
        return this[index] || null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc != inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i];
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      hasFeature: function(feature, version) {
        return true;
      },
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        this.insertBefore(newChild, oldChild);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (map[n] == namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (prefix in map) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs = el.childNodes;
        if (newChild) {
          cs[cs.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs[i++] = child;
            child = child.nextSibling;
          }
          cs.length = i;
          delete cs[cs.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function _insertBefore(parentNode, newChild, nextChild) {
      var cp = newChild.parentNode;
      if (cp) {
        cp.removeChild(newChild);
      }
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = newChild.firstChild;
        if (newFirst == null) {
          return newChild;
        }
        var newLast = newChild.lastChild;
      } else {
        newFirst = newLast = newChild;
      }
      var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = nextChild;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parentNode.firstChild = newFirst;
      }
      if (nextChild == null) {
        parentNode.lastChild = newLast;
      } else {
        nextChild.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parentNode;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode);
      if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
        newChild.firstChild = newChild.lastChild = null;
      }
      return newChild;
    }
    function _appendSingleChild(parentNode, newChild) {
      if (newChild.parentNode) {
        newChild.parentNode.removeChild(newChild);
      }
      newChild.parentNode = parentNode;
      newChild.previousSibling = parentNode.lastChild;
      newChild.nextSibling = null;
      if (newChild.previousSibling) {
        newChild.previousSibling.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      return newChild;
    }
    Document.prototype = {
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base.documentElement, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name2) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name2;
        node.nodeName = name2;
        node.localName = name2;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name2) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name2;
        return node;
      },
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name2) {
        return this.getAttributeNode(name2) != null;
      },
      getAttribute: function(name2) {
        var attr = this.getAttributeNode(name2);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name2) {
        return this.attributes.getNamedItem(name2);
      },
      setAttribute: function(name2, value) {
        var attr = this.ownerDocument.createAttribute(name2);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name2) {
        var attr = this.getAttributeNode(name2);
        attr && this.removeAttributeNode(attr);
      },
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text() {
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
          var prefixedNodeName = nodeName;
          if (!isHTML && !node.prefix && node.namespaceURI) {
            var defaultNS;
            for (var ai = 0; ai < attrs.length; ai++) {
              if (attrs.item(ai).name === "xmlns") {
                defaultNS = attrs.item(ai).value;
                break;
              }
            }
            if (!defaultNS) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                  defaultNS = namespace.namespace;
                  break;
                }
              }
            }
            if (defaultNS !== node.namespaceURI) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.namespace === node.namespaceURI) {
                  if (namespace.prefix) {
                    prefixedNodeName = namespace.prefix + ":" + nodeName;
                  }
                  break;
                }
              }
            }
          }
          buf.push("<", prefixedNodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                child = child.nextSibling;
              }
            }
            buf.push("</", prefixedNodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return addSerializedAttribute(buf, node.name, node.value);
        case TEXT_NODE:
          return buf.push(node.data.replace(/[<&]/g, _xmlEncoder).replace(/]]>/g, "]]&gt;"));
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(" PUBLIC ", pubid);
            if (sysid && sysid != ".") {
              buf.push(" ", sysid);
            }
            buf.push(">");
          } else if (sysid && sysid != ".") {
            buf.push(" SYSTEM ", sysid, ">");
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        var v = node[n];
        if (typeof v != "object") {
          if (v != node2[n]) {
            node2[n] = v;
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports.DocumentType = DocumentType;
    exports.DOMException = DOMException;
    exports.DOMImplementation = DOMImplementation;
    exports.Element = Element;
    exports.Node = Node;
    exports.NodeList = NodeList;
    exports.XMLSerializer = XMLSerializer;
  }
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
    var freeze = require_conventions().freeze;
    exports.XML_ENTITIES = freeze({ amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' });
    exports.HTML_ENTITIES = freeze({
      lt: "<",
      gt: ">",
      amp: "&",
      quot: '"',
      apos: "'",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      times: "\xD7",
      divide: "\xF7",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      "int": "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      fnof: "\u0192",
      circ: "\u02C6",
      tilde: "\u02DC",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      bull: "\u2022",
      hellip: "\u2026",
      permil: "\u2030",
      prime: "\u2032",
      Prime: "\u2033",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      oline: "\u203E",
      euro: "\u20AC",
      trade: "\u2122",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  }
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
    var NAMESPACE = require_conventions().NAMESPACE;
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, ParseError);
    }
    ParseError.prototype = new Error();
    ParseError.prototype.name = ParseError.name;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse2(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
        domBuilder.endDocument();
      }
    };
    function parse2(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k = a2.slice(1, -1);
        if (Object.hasOwnProperty.call(entityMap, k)) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!source.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 3);
              var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
              var config = parseStack.pop();
              if (end < 0) {
                tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config.localNSMap;
              var endMatch = config.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config.uri, config.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                }
              } else {
                parseStack.push(config);
              }
              end++;
              break;
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
      function addAttribute(qname, value2, startIndex) {
        if (el.attributeNames.hasOwnProperty(qname)) {
          errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        el.addValue(qname, value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer), startIndex);
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
              case S_ATTR_SPACE:
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          case "\x80":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            domBuilder.endPrefixMapping(prefix);
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source, target) {
      for (var n in source) {
        target[n] = source[n];
      }
    }
    function parseDCC(source, start, domBuilder, errorHandler) {
      var next = source.charAt(start + 2);
      switch (next) {
        case "-":
          if (source.charAt(start + 3) === "-") {
            var end = source.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source.substr(start + 3, 6) == "CDATA[") {
            var end = source.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name2 = matchs[1][0];
            var pubid = false;
            var sysid = false;
            if (len > 3) {
              if (/^public$/i.test(matchs[2][0])) {
                pubid = matchs[3][0];
                sysid = len > 4 && matchs[4][0];
              } else if (/^system$/i.test(matchs[2][0])) {
                sysid = matchs[3][0];
              }
            }
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name2, pubid, sysid);
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source, start, domBuilder) {
      var end = source.indexOf("?>", start);
      if (end) {
        var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match) {
          var len = match[0].length;
          domBuilder.processingInstruction(match[1], match[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes() {
      this.attributeNames = {};
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
    };
    function split(source, start) {
      var match;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source);
      while (match = reg.exec(source)) {
        buf.push(match);
        if (match[1])
          return buf;
      }
    }
    exports.XMLReader = XMLReader;
    exports.ParseError = ParseError;
  }
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
    var conventions = require_conventions();
    var dom = require_dom();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = sax.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
    }
    function DOMParser2(options) {
      this.options = options || { locator: {} };
    }
    DOMParser2.prototype.parseFromString = function(source, mimeType) {
      var options = this.options;
      var sax2 = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var isHTML = /\/x?html?$/.test(mimeType);
      var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax2.domBuilder = options.domBuilder || domBuilder;
      if (isHTML) {
        defaultNSMap[""] = NAMESPACE.HTML;
      }
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var normalize = options.normalizeLineEndings || normalizeLineEndings;
      if (source && typeof source === "string") {
        sax2.parse(normalize(source), defaultNSMap, entityMap);
      } else {
        sax2.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn2 = errorImpl[key];
        if (!fn2 && isCallback) {
          fn2 = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn2 && function(msg) {
          fn2("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name2) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name2, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name2, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      warning: function(error) {
        console.warn("[xmldom warning]	" + error, _locator(this.locator));
      },
      error: function(error) {
        console.error("[xmldom error]	" + error, _locator(this.locator));
      },
      fatalError: function(error) {
        throw new ParseError(error, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    exports.__DOMHandler = DOMHandler;
    exports.normalizeLineEndings = normalizeLineEndings;
    exports.DOMParser = DOMParser2;
  }
});

// node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/@xmldom/xmldom/lib/index.js"(exports) {
    var dom = require_dom();
    exports.DOMImplementation = dom.DOMImplementation;
    exports.XMLSerializer = dom.XMLSerializer;
    exports.DOMParser = require_dom_parser().DOMParser;
  }
});

// node_modules/xpath/xpath.js
var require_xpath = __commonJS({
  "node_modules/xpath/xpath.js"(exports) {
    var xpath = typeof exports === "undefined" ? {} : exports;
    (function(exports2) {
      "use strict";
      function curry(func) {
        var slice = Array.prototype.slice, totalargs = func.length, partial = function(args, fn3) {
          return function() {
            return fn3.apply(this, args.concat(slice.call(arguments)));
          };
        }, fn2 = function() {
          var args = slice.call(arguments);
          return args.length < totalargs ? partial(args, fn2) : func.apply(this, slice.apply(arguments, [0, totalargs]));
        };
        return fn2;
      }
      var forEach = function(f, xs) {
        for (var i = 0; i < xs.length; i += 1) {
          f(xs[i], i, xs);
        }
      };
      var reduce = function(f, seed, xs) {
        var acc = seed;
        forEach(function(x, i) {
          acc = f(acc, x, i);
        }, xs);
        return acc;
      };
      var map = function(f, xs) {
        var mapped = new Array(xs.length);
        forEach(function(x, i) {
          mapped[i] = f(x);
        }, xs);
        return mapped;
      };
      var filter = function(f, xs) {
        var filtered = [];
        forEach(function(x, i) {
          if (f(x, i)) {
            filtered.push(x);
          }
        }, xs);
        return filtered;
      };
      var includes = function(values, value) {
        for (var i = 0; i < values.length; i += 1) {
          if (values[i] === value) {
            return true;
          }
        }
        return false;
      };
      function always(value) {
        return function() {
          return value;
        };
      }
      function toString(x) {
        return x.toString();
      }
      var join = function(s, xs) {
        return xs.join(s);
      };
      var wrap = function(pref, suf, str) {
        return pref + str + suf;
      };
      var prototypeConcat = Array.prototype.concat;
      var MAX_ARGUMENT_LENGTH = 32767;
      function flatten(arr) {
        var result = [];
        for (var start = 0; start < arr.length; start += MAX_ARGUMENT_LENGTH) {
          var chunk = arr.slice(start, start + MAX_ARGUMENT_LENGTH);
          result = prototypeConcat.apply(result, chunk);
        }
        return result;
      }
      function assign(target, varArgs) {
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
          if (nextSource != null) {
            for (var nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      }
      XPathParser.prototype = new Object();
      XPathParser.prototype.constructor = XPathParser;
      XPathParser.superclass = Object.prototype;
      function XPathParser() {
        this.init();
      }
      XPathParser.prototype.init = function() {
        this.reduceActions = [];
        this.reduceActions[3] = function(rhs) {
          return new OrOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[5] = function(rhs) {
          return new AndOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[7] = function(rhs) {
          return new EqualsOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[8] = function(rhs) {
          return new NotEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[10] = function(rhs) {
          return new LessThanOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[11] = function(rhs) {
          return new GreaterThanOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[12] = function(rhs) {
          return new LessThanOrEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[13] = function(rhs) {
          return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[15] = function(rhs) {
          return new PlusOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[16] = function(rhs) {
          return new MinusOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[18] = function(rhs) {
          return new MultiplyOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[19] = function(rhs) {
          return new DivOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[20] = function(rhs) {
          return new ModOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[22] = function(rhs) {
          return new UnaryMinusOperation(rhs[1]);
        };
        this.reduceActions[24] = function(rhs) {
          return new BarOperation(rhs[0], rhs[2]);
        };
        this.reduceActions[25] = function(rhs) {
          return new PathExpr(void 0, void 0, rhs[0]);
        };
        this.reduceActions[27] = function(rhs) {
          rhs[0].locationPath = rhs[2];
          return rhs[0];
        };
        this.reduceActions[28] = function(rhs) {
          rhs[0].locationPath = rhs[2];
          rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
          return rhs[0];
        };
        this.reduceActions[29] = function(rhs) {
          return new PathExpr(rhs[0], [], void 0);
        };
        this.reduceActions[30] = function(rhs) {
          if (Utilities.instance_of(rhs[0], PathExpr)) {
            if (rhs[0].filterPredicates == void 0) {
              rhs[0].filterPredicates = [];
            }
            rhs[0].filterPredicates.push(rhs[1]);
            return rhs[0];
          } else {
            return new PathExpr(rhs[0], [rhs[1]], void 0);
          }
        };
        this.reduceActions[32] = function(rhs) {
          return rhs[1];
        };
        this.reduceActions[33] = function(rhs) {
          return new XString(rhs[0]);
        };
        this.reduceActions[34] = function(rhs) {
          return new XNumber(rhs[0]);
        };
        this.reduceActions[36] = function(rhs) {
          return new FunctionCall(rhs[0], []);
        };
        this.reduceActions[37] = function(rhs) {
          return new FunctionCall(rhs[0], rhs[2]);
        };
        this.reduceActions[38] = function(rhs) {
          return [rhs[0]];
        };
        this.reduceActions[39] = function(rhs) {
          rhs[2].unshift(rhs[0]);
          return rhs[2];
        };
        this.reduceActions[43] = function(rhs) {
          return new LocationPath(true, []);
        };
        this.reduceActions[44] = function(rhs) {
          rhs[1].absolute = true;
          return rhs[1];
        };
        this.reduceActions[46] = function(rhs) {
          return new LocationPath(false, [rhs[0]]);
        };
        this.reduceActions[47] = function(rhs) {
          rhs[0].steps.push(rhs[2]);
          return rhs[0];
        };
        this.reduceActions[49] = function(rhs) {
          return new Step(rhs[0], rhs[1], []);
        };
        this.reduceActions[50] = function(rhs) {
          return new Step(Step.CHILD, rhs[0], []);
        };
        this.reduceActions[51] = function(rhs) {
          return new Step(rhs[0], rhs[1], rhs[2]);
        };
        this.reduceActions[52] = function(rhs) {
          return new Step(Step.CHILD, rhs[0], rhs[1]);
        };
        this.reduceActions[54] = function(rhs) {
          return [rhs[0]];
        };
        this.reduceActions[55] = function(rhs) {
          rhs[1].unshift(rhs[0]);
          return rhs[1];
        };
        this.reduceActions[56] = function(rhs) {
          if (rhs[0] == "ancestor") {
            return Step.ANCESTOR;
          } else if (rhs[0] == "ancestor-or-self") {
            return Step.ANCESTORORSELF;
          } else if (rhs[0] == "attribute") {
            return Step.ATTRIBUTE;
          } else if (rhs[0] == "child") {
            return Step.CHILD;
          } else if (rhs[0] == "descendant") {
            return Step.DESCENDANT;
          } else if (rhs[0] == "descendant-or-self") {
            return Step.DESCENDANTORSELF;
          } else if (rhs[0] == "following") {
            return Step.FOLLOWING;
          } else if (rhs[0] == "following-sibling") {
            return Step.FOLLOWINGSIBLING;
          } else if (rhs[0] == "namespace") {
            return Step.NAMESPACE;
          } else if (rhs[0] == "parent") {
            return Step.PARENT;
          } else if (rhs[0] == "preceding") {
            return Step.PRECEDING;
          } else if (rhs[0] == "preceding-sibling") {
            return Step.PRECEDINGSIBLING;
          } else if (rhs[0] == "self") {
            return Step.SELF;
          }
          return -1;
        };
        this.reduceActions[57] = function(rhs) {
          return Step.ATTRIBUTE;
        };
        this.reduceActions[59] = function(rhs) {
          if (rhs[0] == "comment") {
            return NodeTest.commentTest;
          } else if (rhs[0] == "text") {
            return NodeTest.textTest;
          } else if (rhs[0] == "processing-instruction") {
            return NodeTest.anyPiTest;
          } else if (rhs[0] == "node") {
            return NodeTest.nodeTest;
          }
          return new NodeTest(-1, void 0);
        };
        this.reduceActions[60] = function(rhs) {
          return new NodeTest.PITest(rhs[2]);
        };
        this.reduceActions[61] = function(rhs) {
          return rhs[1];
        };
        this.reduceActions[63] = function(rhs) {
          rhs[1].absolute = true;
          rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
          return rhs[1];
        };
        this.reduceActions[64] = function(rhs) {
          rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, NodeTest.nodeTest, []));
          rhs[0].steps.push(rhs[2]);
          return rhs[0];
        };
        this.reduceActions[65] = function(rhs) {
          return new Step(Step.SELF, NodeTest.nodeTest, []);
        };
        this.reduceActions[66] = function(rhs) {
          return new Step(Step.PARENT, NodeTest.nodeTest, []);
        };
        this.reduceActions[67] = function(rhs) {
          return new VariableReference(rhs[1]);
        };
        this.reduceActions[68] = function(rhs) {
          return NodeTest.nameTestAny;
        };
        this.reduceActions[69] = function(rhs) {
          return new NodeTest.NameTestPrefixAny(rhs[0].split(":")[0]);
        };
        this.reduceActions[70] = function(rhs) {
          return new NodeTest.NameTestQName(rhs[0]);
        };
      };
      XPathParser.actionTable = [
        " s s        sssssssss    s ss  s  ss",
        "                 s                  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                rrrrr               ",
        " s s        sssssssss    s ss  s  ss",
        "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
        " s s        sssssssss    s ss  s  ss",
        "                            s       ",
        "                            s       ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "  s                                 ",
        "                            s       ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "a                                   ",
        "r       s                    rr  r  ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrs  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr sr  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "                sssss               ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "              s                     ",
        "                             s      ",
        "                rrrrr               ",
        " s s        sssssssss    s sss s  ss",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s s        sssssssss      ss  s  ss",
        " s s        sssssssss    s ss  s  ss",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s           s  sssss          s  s ",
        " s           s  sssss          s  s ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr sr  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             s      ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             rr     ",
        "                             s      ",
        "                             rs     ",
        "r      sr                    rr  r  ",
        "r   s  rr            s       rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rssrr            rss     rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrr            rrrss   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrsss         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrr   rr  r  ",
        "r   rrrrrrrr         rrrrrr  rr  r  ",
        "                                 r  ",
        "                                 s  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  srrrrrrrr         rrrrrrs rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr  r  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        " s s        sssssssss    s ss  s  ss",
        "r  rrrrrrrrr         rrrrrrr rr rr  ",
        "                             r      "
      ];
      XPathParser.actionTableNumber = [
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "                 J                  ",
        "a  aaaaaaaaa         aaaaaaa aa  a  ",
        "                YYYYY               ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        `K1  KKKKKKKK .  +*)('KKKKKK  KK# K" `,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "                            N       ",
        "                            O       ",
        "e  eeeeeeeee         eeeeeee ee ee  ",
        "f  fffffffff         fffffff ff ff  ",
        "d  ddddddddd         ddddddd dd dd  ",
        "B  BBBBBBBBB         BBBBBBB BB BB  ",
        "A  AAAAAAAAA         AAAAAAA AA AA  ",
        "  P                                 ",
        "                            Q       ",
        ` 1           .  +*)('          #  " `,
        "b  bbbbbbbbb         bbbbbbb bb  b  ",
        "                                    ",
        "!       S                    !!  !  ",
        '"      T"                    ""  "  ',
        "$   V  $$            U       $$  $  ",
        "&   &ZY&&            &XW     &&  &  ",
        ")   )))))            )))\\[   ))  )  ",
        ".   ....._^]         .....   ..  .  ",
        "1   11111111         11111   11  1  ",
        "5   55555555         55555`  55  5  ",
        "7   77777777         777777  77  7  ",
        "9   99999999         999999  99  9  ",
        ":  c::::::::         ::::::b :: a:  ",
        "I  fIIIIIIII         IIIIIIe II  I  ",
        "=  =========         ======= == ==  ",
        "?  ?????????         ??????? ?? ??  ",
        "C  CCCCCCCCC         CCCCCCC CC CC  ",
        "J   JJJJJJJJ         JJJJJJ  JJ  J  ",
        "M   MMMMMMMM         MMMMMM  MM  M  ",
        "N  NNNNNNNNN         NNNNNNN NN  N  ",
        "P  PPPPPPPPP         PPPPPPP PP  P  ",
        "                +*)('               ",
        "R  RRRRRRRRR         RRRRRRR RR aR  ",
        "U  UUUUUUUUU         UUUUUUU UU  U  ",
        "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
        "c  ccccccccc         ccccccc cc cc  ",
        "                             j      ",
        "L  fLLLLLLLL         LLLLLLe LL  L  ",
        "6   66666666         66666   66  6  ",
        "              k                     ",
        "                             l      ",
        "                XXXXX               ",
        ` 1 0        /.-,+*)('    & %$m #  "!`,
        "_  f________         ______e __  _  ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1 0        /.-,+*)('      %$  #  "!`,
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        ` 1           .  +*)('          #  " `,
        ` 1           .  +*)('          #  " `,
        ">  >>>>>>>>>         >>>>>>> >> >>  ",
        ` 1           .  +*)('          #  " `,
        ` 1           .  +*)('          #  " `,
        "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
        "V  VVVVVVVVV         VVVVVVV VV aV  ",
        "T  TTTTTTTTT         TTTTTTT TT  T  ",
        "@  @@@@@@@@@         @@@@@@@ @@ @@  ",
        "                             \x87      ",
        "[  [[[[[[[[[         [[[[[[[ [[ [[  ",
        "D  DDDDDDDDD         DDDDDDD DD DD  ",
        "                             HH     ",
        "                             \x88      ",
        "                             F\x89     ",
        "#      T#                    ##  #  ",
        "%   V  %%            U       %%  %  ",
        "'   'ZY''            'XW     ''  '  ",
        "(   (ZY((            (XW     ((  (  ",
        "+   +++++            +++\\[   ++  +  ",
        "*   *****            ***\\[   **  *  ",
        "-   -----            ---\\[   --  -  ",
        ",   ,,,,,            ,,,\\[   ,,  ,  ",
        "0   00000_^]         00000   00  0  ",
        "/   /////_^]         /////   //  /  ",
        "2   22222222         22222   22  2  ",
        "3   33333333         33333   33  3  ",
        "4   44444444         44444   44  4  ",
        "8   88888888         888888  88  8  ",
        "                                 ^  ",
        "                                 \x8A  ",
        ";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
        "<  f<<<<<<<<         <<<<<<e <<  <  ",
        "O  OOOOOOOOO         OOOOOOO OO  O  ",
        "`  `````````         ``````` ``  `  ",
        "S  SSSSSSSSS         SSSSSSS SS  S  ",
        "W  WWWWWWWWW         WWWWWWW WW  W  ",
        "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
        "E  EEEEEEEEE         EEEEEEE EE EE  ",
        ` 1 0        /.-,+*)('    & %$  #  "!`,
        "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
        "                             G      "
      ];
      XPathParser.gotoTable = [
        "3456789:;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "L456789:;<=>?@ AB  CDEFGH IJ ",
        "            M        EFGH IJ ",
        "       N;<=>?@ AB  CDEFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "            S        EFGH IJ ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "              e              ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                        h  J ",
        "              i          j   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ ABpqCDEFGH IJ ",
        "                             ",
        "  r6789:;<=>?@ AB  CDEFGH IJ ",
        "   s789:;<=>?@ AB  CDEFGH IJ ",
        "    t89:;<=>?@ AB  CDEFGH IJ ",
        "    u89:;<=>?@ AB  CDEFGH IJ ",
        "     v9:;<=>?@ AB  CDEFGH IJ ",
        "     w9:;<=>?@ AB  CDEFGH IJ ",
        "     x9:;<=>?@ AB  CDEFGH IJ ",
        "     y9:;<=>?@ AB  CDEFGH IJ ",
        "      z:;<=>?@ AB  CDEFGH IJ ",
        "      {:;<=>?@ AB  CDEFGH IJ ",
        "       |;<=>?@ AB  CDEFGH IJ ",
        "       };<=>?@ AB  CDEFGH IJ ",
        "       ~;<=>?@ AB  CDEFGH IJ ",
        "         \x7F=>?@ AB  CDEFGH IJ ",
        "\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
        "            \x82        EFGH IJ ",
        "            \x83        EFGH IJ ",
        "                             ",
        "                     \x84 GH IJ ",
        "                     \x85 GH IJ ",
        "              i          \x86   ",
        "              i          \x87   ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "                             ",
        "o456789:;<=>?@ AB\x8CqCDEFGH IJ ",
        "                             ",
        "                             "
      ];
      XPathParser.productions = [
        [1, 1, 2],
        [2, 1, 3],
        [3, 1, 4],
        [3, 3, 3, -9, 4],
        [4, 1, 5],
        [4, 3, 4, -8, 5],
        [5, 1, 6],
        [5, 3, 5, -22, 6],
        [5, 3, 5, -5, 6],
        [6, 1, 7],
        [6, 3, 6, -23, 7],
        [6, 3, 6, -24, 7],
        [6, 3, 6, -6, 7],
        [6, 3, 6, -7, 7],
        [7, 1, 8],
        [7, 3, 7, -25, 8],
        [7, 3, 7, -26, 8],
        [8, 1, 9],
        [8, 3, 8, -12, 9],
        [8, 3, 8, -11, 9],
        [8, 3, 8, -10, 9],
        [9, 1, 10],
        [9, 2, -26, 9],
        [10, 1, 11],
        [10, 3, 10, -27, 11],
        [11, 1, 12],
        [11, 1, 13],
        [11, 3, 13, -28, 14],
        [11, 3, 13, -4, 14],
        [13, 1, 15],
        [13, 2, 13, 16],
        [15, 1, 17],
        [15, 3, -29, 2, -30],
        [15, 1, -15],
        [15, 1, -16],
        [15, 1, 18],
        [18, 3, -13, -29, -30],
        [18, 4, -13, -29, 19, -30],
        [19, 1, 20],
        [19, 3, 20, -31, 19],
        [20, 1, 2],
        [12, 1, 14],
        [12, 1, 21],
        [21, 1, -28],
        [21, 2, -28, 14],
        [21, 1, 22],
        [14, 1, 23],
        [14, 3, 14, -28, 23],
        [14, 1, 24],
        [23, 2, 25, 26],
        [23, 1, 26],
        [23, 3, 25, 26, 27],
        [23, 2, 26, 27],
        [23, 1, 28],
        [27, 1, 16],
        [27, 2, 16, 27],
        [25, 2, -14, -3],
        [25, 1, -32],
        [26, 1, 29],
        [26, 3, -20, -29, -30],
        [26, 4, -21, -29, -15, -30],
        [16, 3, -33, 30, -34],
        [30, 1, 2],
        [22, 2, -4, 14],
        [24, 3, 14, -4, 23],
        [28, 1, -35],
        [28, 1, -2],
        [17, 2, -36, -18],
        [29, 1, -17],
        [29, 1, -19],
        [29, 1, -18]
      ];
      XPathParser.DOUBLEDOT = 2;
      XPathParser.DOUBLECOLON = 3;
      XPathParser.DOUBLESLASH = 4;
      XPathParser.NOTEQUAL = 5;
      XPathParser.LESSTHANOREQUAL = 6;
      XPathParser.GREATERTHANOREQUAL = 7;
      XPathParser.AND = 8;
      XPathParser.OR = 9;
      XPathParser.MOD = 10;
      XPathParser.DIV = 11;
      XPathParser.MULTIPLYOPERATOR = 12;
      XPathParser.FUNCTIONNAME = 13;
      XPathParser.AXISNAME = 14;
      XPathParser.LITERAL = 15;
      XPathParser.NUMBER = 16;
      XPathParser.ASTERISKNAMETEST = 17;
      XPathParser.QNAME = 18;
      XPathParser.NCNAMECOLONASTERISK = 19;
      XPathParser.NODETYPE = 20;
      XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
      XPathParser.EQUALS = 22;
      XPathParser.LESSTHAN = 23;
      XPathParser.GREATERTHAN = 24;
      XPathParser.PLUS = 25;
      XPathParser.MINUS = 26;
      XPathParser.BAR = 27;
      XPathParser.SLASH = 28;
      XPathParser.LEFTPARENTHESIS = 29;
      XPathParser.RIGHTPARENTHESIS = 30;
      XPathParser.COMMA = 31;
      XPathParser.AT = 32;
      XPathParser.LEFTBRACKET = 33;
      XPathParser.RIGHTBRACKET = 34;
      XPathParser.DOT = 35;
      XPathParser.DOLLAR = 36;
      XPathParser.prototype.tokenize = function(s1) {
        var types = [];
        var values = [];
        var s = s1 + "\0";
        var pos = 0;
        var c = s.charAt(pos++);
        while (1) {
          while (c == " " || c == "	" || c == "\r" || c == "\n") {
            c = s.charAt(pos++);
          }
          if (c == "\0" || pos >= s.length) {
            break;
          }
          if (c == "(") {
            types.push(XPathParser.LEFTPARENTHESIS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ")") {
            types.push(XPathParser.RIGHTPARENTHESIS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "[") {
            types.push(XPathParser.LEFTBRACKET);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "]") {
            types.push(XPathParser.RIGHTBRACKET);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "@") {
            types.push(XPathParser.AT);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ",") {
            types.push(XPathParser.COMMA);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "|") {
            types.push(XPathParser.BAR);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "+") {
            types.push(XPathParser.PLUS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "-") {
            types.push(XPathParser.MINUS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "=") {
            types.push(XPathParser.EQUALS);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == "$") {
            types.push(XPathParser.DOLLAR);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ".") {
            c = s.charAt(pos++);
            if (c == ".") {
              types.push(XPathParser.DOUBLEDOT);
              values.push("..");
              c = s.charAt(pos++);
              continue;
            }
            if (c >= "0" && c <= "9") {
              var number = "." + c;
              c = s.charAt(pos++);
              while (c >= "0" && c <= "9") {
                number += c;
                c = s.charAt(pos++);
              }
              types.push(XPathParser.NUMBER);
              values.push(number);
              continue;
            }
            types.push(XPathParser.DOT);
            values.push(".");
            continue;
          }
          if (c == "'" || c == '"') {
            var delimiter = c;
            var literal = "";
            while (pos < s.length && (c = s.charAt(pos)) !== delimiter) {
              literal += c;
              pos += 1;
            }
            if (c !== delimiter) {
              throw XPathException.fromMessage("Unterminated string literal: " + delimiter + literal);
            }
            pos += 1;
            types.push(XPathParser.LITERAL);
            values.push(literal);
            c = s.charAt(pos++);
            continue;
          }
          if (c >= "0" && c <= "9") {
            var number = c;
            c = s.charAt(pos++);
            while (c >= "0" && c <= "9") {
              number += c;
              c = s.charAt(pos++);
            }
            if (c == ".") {
              if (s.charAt(pos) >= "0" && s.charAt(pos) <= "9") {
                number += c;
                number += s.charAt(pos++);
                c = s.charAt(pos++);
                while (c >= "0" && c <= "9") {
                  number += c;
                  c = s.charAt(pos++);
                }
              }
            }
            types.push(XPathParser.NUMBER);
            values.push(number);
            continue;
          }
          if (c == "*") {
            if (types.length > 0) {
              var last = types[types.length - 1];
              if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS && last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS && last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
                types.push(XPathParser.MULTIPLYOPERATOR);
                values.push(c);
                c = s.charAt(pos++);
                continue;
              }
            }
            types.push(XPathParser.ASTERISKNAMETEST);
            values.push(c);
            c = s.charAt(pos++);
            continue;
          }
          if (c == ":") {
            if (s.charAt(pos) == ":") {
              types.push(XPathParser.DOUBLECOLON);
              values.push("::");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
          }
          if (c == "/") {
            c = s.charAt(pos++);
            if (c == "/") {
              types.push(XPathParser.DOUBLESLASH);
              values.push("//");
              c = s.charAt(pos++);
              continue;
            }
            types.push(XPathParser.SLASH);
            values.push("/");
            continue;
          }
          if (c == "!") {
            if (s.charAt(pos) == "=") {
              types.push(XPathParser.NOTEQUAL);
              values.push("!=");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
          }
          if (c == "<") {
            if (s.charAt(pos) == "=") {
              types.push(XPathParser.LESSTHANOREQUAL);
              values.push("<=");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
            types.push(XPathParser.LESSTHAN);
            values.push("<");
            c = s.charAt(pos++);
            continue;
          }
          if (c == ">") {
            if (s.charAt(pos) == "=") {
              types.push(XPathParser.GREATERTHANOREQUAL);
              values.push(">=");
              pos++;
              c = s.charAt(pos++);
              continue;
            }
            types.push(XPathParser.GREATERTHAN);
            values.push(">");
            c = s.charAt(pos++);
            continue;
          }
          if (c == "_" || Utilities.isLetter(c.charCodeAt(0))) {
            var name2 = c;
            c = s.charAt(pos++);
            while (Utilities.isNCNameChar(c.charCodeAt(0))) {
              name2 += c;
              c = s.charAt(pos++);
            }
            if (types.length > 0) {
              var last = types[types.length - 1];
              if (last != XPathParser.AT && last != XPathParser.DOUBLECOLON && last != XPathParser.LEFTPARENTHESIS && last != XPathParser.LEFTBRACKET && last != XPathParser.AND && last != XPathParser.OR && last != XPathParser.MOD && last != XPathParser.DIV && last != XPathParser.MULTIPLYOPERATOR && last != XPathParser.SLASH && last != XPathParser.DOUBLESLASH && last != XPathParser.BAR && last != XPathParser.PLUS && last != XPathParser.MINUS && last != XPathParser.EQUALS && last != XPathParser.NOTEQUAL && last != XPathParser.LESSTHAN && last != XPathParser.LESSTHANOREQUAL && last != XPathParser.GREATERTHAN && last != XPathParser.GREATERTHANOREQUAL) {
                if (name2 == "and") {
                  types.push(XPathParser.AND);
                  values.push(name2);
                  continue;
                }
                if (name2 == "or") {
                  types.push(XPathParser.OR);
                  values.push(name2);
                  continue;
                }
                if (name2 == "mod") {
                  types.push(XPathParser.MOD);
                  values.push(name2);
                  continue;
                }
                if (name2 == "div") {
                  types.push(XPathParser.DIV);
                  values.push(name2);
                  continue;
                }
              }
            }
            if (c == ":") {
              if (s.charAt(pos) == "*") {
                types.push(XPathParser.NCNAMECOLONASTERISK);
                values.push(name2 + ":*");
                pos++;
                c = s.charAt(pos++);
                continue;
              }
              if (s.charAt(pos) == "_" || Utilities.isLetter(s.charCodeAt(pos))) {
                name2 += ":";
                c = s.charAt(pos++);
                while (Utilities.isNCNameChar(c.charCodeAt(0))) {
                  name2 += c;
                  c = s.charAt(pos++);
                }
                if (c == "(") {
                  types.push(XPathParser.FUNCTIONNAME);
                  values.push(name2);
                  continue;
                }
                types.push(XPathParser.QNAME);
                values.push(name2);
                continue;
              }
              if (s.charAt(pos) == ":") {
                types.push(XPathParser.AXISNAME);
                values.push(name2);
                continue;
              }
            }
            if (c == "(") {
              if (name2 == "comment" || name2 == "text" || name2 == "node") {
                types.push(XPathParser.NODETYPE);
                values.push(name2);
                continue;
              }
              if (name2 == "processing-instruction") {
                if (s.charAt(pos) == ")") {
                  types.push(XPathParser.NODETYPE);
                } else {
                  types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
                }
                values.push(name2);
                continue;
              }
              types.push(XPathParser.FUNCTIONNAME);
              values.push(name2);
              continue;
            }
            types.push(XPathParser.QNAME);
            values.push(name2);
            continue;
          }
          throw new Error("Unexpected character " + c);
        }
        types.push(1);
        values.push("[EOF]");
        return [types, values];
      };
      XPathParser.SHIFT = "s";
      XPathParser.REDUCE = "r";
      XPathParser.ACCEPT = "a";
      XPathParser.prototype.parse = function(s) {
        var types;
        var values;
        var res = this.tokenize(s);
        if (res == void 0) {
          return void 0;
        }
        types = res[0];
        values = res[1];
        var tokenPos = 0;
        var state = [];
        var tokenType = [];
        var tokenValue = [];
        var s;
        var a;
        var t;
        state.push(0);
        tokenType.push(1);
        tokenValue.push("_S");
        a = types[tokenPos];
        t = values[tokenPos++];
        while (1) {
          s = state[state.length - 1];
          switch (XPathParser.actionTable[s].charAt(a - 1)) {
            case XPathParser.SHIFT:
              tokenType.push(-a);
              tokenValue.push(t);
              state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
              a = types[tokenPos];
              t = values[tokenPos++];
              break;
            case XPathParser.REDUCE:
              var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
              var rhs = [];
              for (var i = 0; i < num; i++) {
                tokenType.pop();
                rhs.unshift(tokenValue.pop());
                state.pop();
              }
              var s_ = state[state.length - 1];
              tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
              if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == void 0) {
                tokenValue.push(rhs[0]);
              } else {
                tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
              }
              state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
              break;
            case XPathParser.ACCEPT:
              return new XPath2(tokenValue.pop());
            default:
              throw new Error("XPath parse error");
          }
        }
      };
      XPath2.prototype = new Object();
      XPath2.prototype.constructor = XPath2;
      XPath2.superclass = Object.prototype;
      function XPath2(e) {
        this.expression = e;
      }
      XPath2.prototype.toString = function() {
        return this.expression.toString();
      };
      function setIfUnset(obj, prop, value) {
        if (!(prop in obj)) {
          obj[prop] = value;
        }
      }
      XPath2.prototype.evaluate = function(c) {
        c.contextNode = c.expressionContextNode;
        c.contextSize = 1;
        c.contextPosition = 1;
        if (c.isHtml) {
          setIfUnset(c, "caseInsensitive", true);
          setIfUnset(c, "allowAnyNamespaceForNoPrefix", true);
        }
        setIfUnset(c, "caseInsensitive", false);
        return this.expression.evaluate(c);
      };
      XPath2.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
      XPath2.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";
      Expression.prototype = new Object();
      Expression.prototype.constructor = Expression;
      Expression.superclass = Object.prototype;
      function Expression() {
      }
      Expression.prototype.init = function() {
      };
      Expression.prototype.toString = function() {
        return "<Expression>";
      };
      Expression.prototype.evaluate = function(c) {
        throw new Error("Could not evaluate expression.");
      };
      UnaryOperation.prototype = new Expression();
      UnaryOperation.prototype.constructor = UnaryOperation;
      UnaryOperation.superclass = Expression.prototype;
      function UnaryOperation(rhs) {
        if (arguments.length > 0) {
          this.init(rhs);
        }
      }
      UnaryOperation.prototype.init = function(rhs) {
        this.rhs = rhs;
      };
      UnaryMinusOperation.prototype = new UnaryOperation();
      UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
      UnaryMinusOperation.superclass = UnaryOperation.prototype;
      function UnaryMinusOperation(rhs) {
        if (arguments.length > 0) {
          this.init(rhs);
        }
      }
      UnaryMinusOperation.prototype.init = function(rhs) {
        UnaryMinusOperation.superclass.init.call(this, rhs);
      };
      UnaryMinusOperation.prototype.evaluate = function(c) {
        return this.rhs.evaluate(c).number().negate();
      };
      UnaryMinusOperation.prototype.toString = function() {
        return "-" + this.rhs.toString();
      };
      BinaryOperation.prototype = new Expression();
      BinaryOperation.prototype.constructor = BinaryOperation;
      BinaryOperation.superclass = Expression.prototype;
      function BinaryOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      BinaryOperation.prototype.init = function(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
      };
      OrOperation.prototype = new BinaryOperation();
      OrOperation.prototype.constructor = OrOperation;
      OrOperation.superclass = BinaryOperation.prototype;
      function OrOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      OrOperation.prototype.init = function(lhs, rhs) {
        OrOperation.superclass.init.call(this, lhs, rhs);
      };
      OrOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
      };
      OrOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (b.booleanValue()) {
          return b;
        }
        return this.rhs.evaluate(c).bool();
      };
      AndOperation.prototype = new BinaryOperation();
      AndOperation.prototype.constructor = AndOperation;
      AndOperation.superclass = BinaryOperation.prototype;
      function AndOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      AndOperation.prototype.init = function(lhs, rhs) {
        AndOperation.superclass.init.call(this, lhs, rhs);
      };
      AndOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
      };
      AndOperation.prototype.evaluate = function(c) {
        var b = this.lhs.evaluate(c).bool();
        if (!b.booleanValue()) {
          return b;
        }
        return this.rhs.evaluate(c).bool();
      };
      EqualsOperation.prototype = new BinaryOperation();
      EqualsOperation.prototype.constructor = EqualsOperation;
      EqualsOperation.superclass = BinaryOperation.prototype;
      function EqualsOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      EqualsOperation.prototype.init = function(lhs, rhs) {
        EqualsOperation.superclass.init.call(this, lhs, rhs);
      };
      EqualsOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
      };
      EqualsOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
      };
      NotEqualOperation.prototype = new BinaryOperation();
      NotEqualOperation.prototype.constructor = NotEqualOperation;
      NotEqualOperation.superclass = BinaryOperation.prototype;
      function NotEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      NotEqualOperation.prototype.init = function(lhs, rhs) {
        NotEqualOperation.superclass.init.call(this, lhs, rhs);
      };
      NotEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
      };
      NotEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
      };
      LessThanOperation.prototype = new BinaryOperation();
      LessThanOperation.prototype.constructor = LessThanOperation;
      LessThanOperation.superclass = BinaryOperation.prototype;
      function LessThanOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      LessThanOperation.prototype.init = function(lhs, rhs) {
        LessThanOperation.superclass.init.call(this, lhs, rhs);
      };
      LessThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
      };
      LessThanOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
      };
      GreaterThanOperation.prototype = new BinaryOperation();
      GreaterThanOperation.prototype.constructor = GreaterThanOperation;
      GreaterThanOperation.superclass = BinaryOperation.prototype;
      function GreaterThanOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      GreaterThanOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOperation.superclass.init.call(this, lhs, rhs);
      };
      GreaterThanOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
      };
      GreaterThanOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
      };
      LessThanOrEqualOperation.prototype = new BinaryOperation();
      LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
      LessThanOrEqualOperation.superclass = BinaryOperation.prototype;
      function LessThanOrEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      LessThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
      };
      LessThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
      };
      LessThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
      };
      GreaterThanOrEqualOperation.prototype = new BinaryOperation();
      GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
      GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;
      function GreaterThanOrEqualOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      GreaterThanOrEqualOperation.prototype.init = function(lhs, rhs) {
        GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
      };
      GreaterThanOrEqualOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
      };
      GreaterThanOrEqualOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
      };
      PlusOperation.prototype = new BinaryOperation();
      PlusOperation.prototype.constructor = PlusOperation;
      PlusOperation.superclass = BinaryOperation.prototype;
      function PlusOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      PlusOperation.prototype.init = function(lhs, rhs) {
        PlusOperation.superclass.init.call(this, lhs, rhs);
      };
      PlusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
      };
      PlusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
      };
      MinusOperation.prototype = new BinaryOperation();
      MinusOperation.prototype.constructor = MinusOperation;
      MinusOperation.superclass = BinaryOperation.prototype;
      function MinusOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      MinusOperation.prototype.init = function(lhs, rhs) {
        MinusOperation.superclass.init.call(this, lhs, rhs);
      };
      MinusOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
      };
      MinusOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
      };
      MultiplyOperation.prototype = new BinaryOperation();
      MultiplyOperation.prototype.constructor = MultiplyOperation;
      MultiplyOperation.superclass = BinaryOperation.prototype;
      function MultiplyOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      MultiplyOperation.prototype.init = function(lhs, rhs) {
        MultiplyOperation.superclass.init.call(this, lhs, rhs);
      };
      MultiplyOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
      };
      MultiplyOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
      };
      DivOperation.prototype = new BinaryOperation();
      DivOperation.prototype.constructor = DivOperation;
      DivOperation.superclass = BinaryOperation.prototype;
      function DivOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      DivOperation.prototype.init = function(lhs, rhs) {
        DivOperation.superclass.init.call(this, lhs, rhs);
      };
      DivOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
      };
      DivOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
      };
      ModOperation.prototype = new BinaryOperation();
      ModOperation.prototype.constructor = ModOperation;
      ModOperation.superclass = BinaryOperation.prototype;
      function ModOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      ModOperation.prototype.init = function(lhs, rhs) {
        ModOperation.superclass.init.call(this, lhs, rhs);
      };
      ModOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
      };
      ModOperation.prototype.toString = function() {
        return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
      };
      BarOperation.prototype = new BinaryOperation();
      BarOperation.prototype.constructor = BarOperation;
      BarOperation.superclass = BinaryOperation.prototype;
      function BarOperation(lhs, rhs) {
        if (arguments.length > 0) {
          this.init(lhs, rhs);
        }
      }
      BarOperation.prototype.init = function(lhs, rhs) {
        BarOperation.superclass.init.call(this, lhs, rhs);
      };
      BarOperation.prototype.evaluate = function(c) {
        return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
      };
      BarOperation.prototype.toString = function() {
        return map(toString, [this.lhs, this.rhs]).join(" | ");
      };
      PathExpr.prototype = new Expression();
      PathExpr.prototype.constructor = PathExpr;
      PathExpr.superclass = Expression.prototype;
      function PathExpr(filter2, filterPreds, locpath) {
        if (arguments.length > 0) {
          this.init(filter2, filterPreds, locpath);
        }
      }
      PathExpr.prototype.init = function(filter2, filterPreds, locpath) {
        PathExpr.superclass.init.call(this);
        this.filter = filter2;
        this.filterPredicates = filterPreds;
        this.locationPath = locpath;
      };
      function findRoot(node) {
        while (node && node.parentNode) {
          node = node.parentNode;
        }
        return node;
      }
      PathExpr.applyPredicates = function(predicates, c, nodes) {
        if (predicates.length === 0) {
          return nodes;
        }
        var ctx = c.extend({});
        return reduce(function(inNodes, pred) {
          ctx.contextSize = inNodes.length;
          return filter(function(node, i) {
            ctx.contextNode = node;
            ctx.contextPosition = i + 1;
            return PathExpr.predicateMatches(pred, ctx);
          }, inNodes);
        }, nodes, predicates);
      };
      PathExpr.getRoot = function(xpc, nodes) {
        var firstNode = nodes[0];
        if (firstNode.nodeType === 9) {
          return firstNode;
        }
        if (xpc.virtualRoot) {
          return xpc.virtualRoot;
        }
        var ownerDoc = firstNode.ownerDocument;
        if (ownerDoc) {
          return ownerDoc;
        }
        var n = firstNode;
        while (n.parentNode != null) {
          n = n.parentNode;
        }
        return n;
      };
      PathExpr.applyStep = function(step, xpc, node) {
        var self = this;
        var newNodes = [];
        xpc.contextNode = node;
        switch (step.axis) {
          case Step.ANCESTOR:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            var m;
            if (xpc.contextNode.nodeType == 2) {
              m = PathExpr.getOwnerElement(xpc.contextNode);
            } else {
              m = xpc.contextNode.parentNode;
            }
            while (m != null) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
              if (m === xpc.virtualRoot) {
                break;
              }
              m = m.parentNode;
            }
            break;
          case Step.ANCESTORORSELF:
            for (var m = xpc.contextNode; m != null; m = m.nodeType == 2 ? PathExpr.getOwnerElement(m) : m.parentNode) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
              if (m === xpc.virtualRoot) {
                break;
              }
            }
            break;
          case Step.ATTRIBUTE:
            var nnm = xpc.contextNode.attributes;
            if (nnm != null) {
              for (var k = 0; k < nnm.length; k++) {
                var m = nnm.item(k);
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
              }
            }
            break;
          case Step.CHILD:
            for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
            }
            break;
          case Step.DESCENDANT:
            var st = [xpc.contextNode.firstChild];
            while (st.length > 0) {
              for (var m = st.pop(); m != null; ) {
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
                if (m.firstChild != null) {
                  st.push(m.nextSibling);
                  m = m.firstChild;
                } else {
                  m = m.nextSibling;
                }
              }
            }
            break;
          case Step.DESCENDANTORSELF:
            if (step.nodeTest.matches(xpc.contextNode, xpc)) {
              newNodes.push(xpc.contextNode);
            }
            var st = [xpc.contextNode.firstChild];
            while (st.length > 0) {
              for (var m = st.pop(); m != null; ) {
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
                if (m.firstChild != null) {
                  st.push(m.nextSibling);
                  m = m.firstChild;
                } else {
                  m = m.nextSibling;
                }
              }
            }
            break;
          case Step.FOLLOWING:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            var st = [];
            if (xpc.contextNode.firstChild != null) {
              st.unshift(xpc.contextNode.firstChild);
            } else {
              st.unshift(xpc.contextNode.nextSibling);
            }
            for (var m = xpc.contextNode.parentNode; m != null && m.nodeType != 9 && m !== xpc.virtualRoot; m = m.parentNode) {
              st.unshift(m.nextSibling);
            }
            do {
              for (var m = st.pop(); m != null; ) {
                if (step.nodeTest.matches(m, xpc)) {
                  newNodes.push(m);
                }
                if (m.firstChild != null) {
                  st.push(m.nextSibling);
                  m = m.firstChild;
                } else {
                  m = m.nextSibling;
                }
              }
            } while (st.length > 0);
            break;
          case Step.FOLLOWINGSIBLING:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
            }
            break;
          case Step.NAMESPACE:
            var n = {};
            if (xpc.contextNode.nodeType == 1) {
              n["xml"] = XPath2.XML_NAMESPACE_URI;
              n["xmlns"] = XPath2.XMLNS_NAMESPACE_URI;
              for (var m = xpc.contextNode; m != null && m.nodeType == 1; m = m.parentNode) {
                for (var k = 0; k < m.attributes.length; k++) {
                  var attr = m.attributes.item(k);
                  var nm = String(attr.name);
                  if (nm == "xmlns") {
                    if (n[""] == void 0) {
                      n[""] = attr.value;
                    }
                  } else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
                    var pre = nm.substring(6, nm.length);
                    if (n[pre] == void 0) {
                      n[pre] = attr.value;
                    }
                  }
                }
              }
              for (var pre in n) {
                var nsn = new XPathNamespace(pre, n[pre], xpc.contextNode);
                if (step.nodeTest.matches(nsn, xpc)) {
                  newNodes.push(nsn);
                }
              }
            }
            break;
          case Step.PARENT:
            m = null;
            if (xpc.contextNode !== xpc.virtualRoot) {
              if (xpc.contextNode.nodeType == 2) {
                m = PathExpr.getOwnerElement(xpc.contextNode);
              } else {
                m = xpc.contextNode.parentNode;
              }
            }
            if (m != null && step.nodeTest.matches(m, xpc)) {
              newNodes.push(m);
            }
            break;
          case Step.PRECEDING:
            var st;
            if (xpc.virtualRoot != null) {
              st = [xpc.virtualRoot];
            } else {
              st = [findRoot(xpc.contextNode)];
            }
            outer:
              while (st.length > 0) {
                for (var m = st.pop(); m != null; ) {
                  if (m == xpc.contextNode) {
                    break outer;
                  }
                  if (step.nodeTest.matches(m, xpc)) {
                    newNodes.unshift(m);
                  }
                  if (m.firstChild != null) {
                    st.push(m.nextSibling);
                    m = m.firstChild;
                  } else {
                    m = m.nextSibling;
                  }
                }
              }
            break;
          case Step.PRECEDINGSIBLING:
            if (xpc.contextNode === xpc.virtualRoot) {
              break;
            }
            for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
              if (step.nodeTest.matches(m, xpc)) {
                newNodes.push(m);
              }
            }
            break;
          case Step.SELF:
            if (step.nodeTest.matches(xpc.contextNode, xpc)) {
              newNodes.push(xpc.contextNode);
            }
            break;
          default:
        }
        return newNodes;
      };
      function applyStepWithPredicates(step, xpc, node) {
        return PathExpr.applyPredicates(step.predicates, xpc, PathExpr.applyStep(step, xpc, node));
      }
      function applyStepToNodes(context, nodes, step) {
        return flatten(map(applyStepWithPredicates.bind(null, step, context), nodes));
      }
      PathExpr.applySteps = function(steps, xpc, nodes) {
        return reduce(applyStepToNodes.bind(null, xpc), nodes, steps);
      };
      PathExpr.prototype.applyFilter = function(c, xpc) {
        if (!this.filter) {
          return { nodes: [c.contextNode] };
        }
        var ns = this.filter.evaluate(c);
        if (!Utilities.instance_of(ns, XNodeSet)) {
          if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
            throw new Error("Path expression filter must evaluate to a nodeset if predicates or location path are used");
          }
          return { nonNodes: ns };
        }
        return {
          nodes: PathExpr.applyPredicates(this.filterPredicates || [], xpc, ns.toUnsortedArray())
        };
      };
      PathExpr.applyLocationPath = function(locationPath, xpc, nodes) {
        if (!locationPath) {
          return nodes;
        }
        var startNodes = locationPath.absolute ? [PathExpr.getRoot(xpc, nodes)] : nodes;
        return PathExpr.applySteps(locationPath.steps, xpc, startNodes);
      };
      PathExpr.prototype.evaluate = function(c) {
        var xpc = assign(new XPathContext(), c);
        var filterResult = this.applyFilter(c, xpc);
        if ("nonNodes" in filterResult) {
          return filterResult.nonNodes;
        }
        var ns = new XNodeSet();
        ns.addArray(PathExpr.applyLocationPath(this.locationPath, xpc, filterResult.nodes));
        return ns;
      };
      PathExpr.predicateMatches = function(pred, c) {
        var res = pred.evaluate(c);
        return Utilities.instance_of(res, XNumber) ? c.contextPosition === res.numberValue() : res.booleanValue();
      };
      PathExpr.predicateString = function(predicate) {
        return wrap("[", "]", predicate.toString());
      };
      PathExpr.predicatesString = function(predicates) {
        return join("", map(PathExpr.predicateString, predicates));
      };
      PathExpr.prototype.toString = function() {
        if (this.filter != void 0) {
          var filterStr = toString(this.filter);
          if (Utilities.instance_of(this.filter, XString)) {
            return wrap("'", "'", filterStr);
          }
          if (this.filterPredicates != void 0 && this.filterPredicates.length) {
            return wrap("(", ")", filterStr) + PathExpr.predicatesString(this.filterPredicates);
          }
          if (this.locationPath != void 0) {
            return filterStr + (this.locationPath.absolute ? "" : "/") + toString(this.locationPath);
          }
          return filterStr;
        }
        return toString(this.locationPath);
      };
      PathExpr.getOwnerElement = function(n) {
        if (n.ownerElement) {
          return n.ownerElement;
        }
        try {
          if (n.selectSingleNode) {
            return n.selectSingleNode("..");
          }
        } catch (e) {
        }
        var doc = n.nodeType == 9 ? n : n.ownerDocument;
        var elts = doc.getElementsByTagName("*");
        for (var i = 0; i < elts.length; i++) {
          var elt = elts.item(i);
          var nnm = elt.attributes;
          for (var j = 0; j < nnm.length; j++) {
            var an = nnm.item(j);
            if (an === n) {
              return elt;
            }
          }
        }
        return null;
      };
      LocationPath.prototype = new Object();
      LocationPath.prototype.constructor = LocationPath;
      LocationPath.superclass = Object.prototype;
      function LocationPath(abs, steps) {
        if (arguments.length > 0) {
          this.init(abs, steps);
        }
      }
      LocationPath.prototype.init = function(abs, steps) {
        this.absolute = abs;
        this.steps = steps;
      };
      LocationPath.prototype.toString = function() {
        return (this.absolute ? "/" : "") + map(toString, this.steps).join("/");
      };
      Step.prototype = new Object();
      Step.prototype.constructor = Step;
      Step.superclass = Object.prototype;
      function Step(axis, nodetest, preds) {
        if (arguments.length > 0) {
          this.init(axis, nodetest, preds);
        }
      }
      Step.prototype.init = function(axis, nodetest, preds) {
        this.axis = axis;
        this.nodeTest = nodetest;
        this.predicates = preds;
      };
      Step.prototype.toString = function() {
        return Step.STEPNAMES[this.axis] + "::" + this.nodeTest.toString() + PathExpr.predicatesString(this.predicates);
      };
      Step.ANCESTOR = 0;
      Step.ANCESTORORSELF = 1;
      Step.ATTRIBUTE = 2;
      Step.CHILD = 3;
      Step.DESCENDANT = 4;
      Step.DESCENDANTORSELF = 5;
      Step.FOLLOWING = 6;
      Step.FOLLOWINGSIBLING = 7;
      Step.NAMESPACE = 8;
      Step.PARENT = 9;
      Step.PRECEDING = 10;
      Step.PRECEDINGSIBLING = 11;
      Step.SELF = 12;
      Step.STEPNAMES = reduce(function(acc, x) {
        return acc[x[0]] = x[1], acc;
      }, {}, [
        [Step.ANCESTOR, "ancestor"],
        [Step.ANCESTORORSELF, "ancestor-or-self"],
        [Step.ATTRIBUTE, "attribute"],
        [Step.CHILD, "child"],
        [Step.DESCENDANT, "descendant"],
        [Step.DESCENDANTORSELF, "descendant-or-self"],
        [Step.FOLLOWING, "following"],
        [Step.FOLLOWINGSIBLING, "following-sibling"],
        [Step.NAMESPACE, "namespace"],
        [Step.PARENT, "parent"],
        [Step.PRECEDING, "preceding"],
        [Step.PRECEDINGSIBLING, "preceding-sibling"],
        [Step.SELF, "self"]
      ]);
      NodeTest.prototype = new Object();
      NodeTest.prototype.constructor = NodeTest;
      NodeTest.superclass = Object.prototype;
      function NodeTest(type, value) {
        if (arguments.length > 0) {
          this.init(type, value);
        }
      }
      NodeTest.prototype.init = function(type, value) {
        this.type = type;
        this.value = value;
      };
      NodeTest.prototype.toString = function() {
        return "<unknown nodetest type>";
      };
      NodeTest.prototype.matches = function(n, xpc) {
        console.warn("unknown node test type");
      };
      NodeTest.NAMETESTANY = 0;
      NodeTest.NAMETESTPREFIXANY = 1;
      NodeTest.NAMETESTQNAME = 2;
      NodeTest.COMMENT = 3;
      NodeTest.TEXT = 4;
      NodeTest.PI = 5;
      NodeTest.NODE = 6;
      NodeTest.isNodeType = function(types) {
        return function(node) {
          return includes(types, node.nodeType);
        };
      };
      NodeTest.makeNodeTestType = function(type, members, ctor) {
        var newType = ctor || function() {
        };
        newType.prototype = new NodeTest(type);
        newType.prototype.constructor = newType;
        assign(newType.prototype, members);
        return newType;
      };
      NodeTest.makeNodeTypeTest = function(type, nodeTypes, stringVal) {
        return new (NodeTest.makeNodeTestType(type, {
          matches: NodeTest.isNodeType(nodeTypes),
          toString: always(stringVal)
        }))();
      };
      NodeTest.hasPrefix = function(node) {
        return node.prefix || (node.nodeName || node.tagName).indexOf(":") !== -1;
      };
      NodeTest.isElementOrAttribute = NodeTest.isNodeType([1, 2]);
      NodeTest.nameSpaceMatches = function(prefix, xpc, n) {
        var nNamespace = n.namespaceURI || "";
        if (!prefix) {
          return !nNamespace || xpc.allowAnyNamespaceForNoPrefix && !NodeTest.hasPrefix(n);
        }
        var ns = xpc.namespaceResolver.getNamespace(prefix, xpc.expressionContextNode);
        if (ns == null) {
          throw new Error("Cannot resolve QName " + prefix);
        }
        return ns === nNamespace;
      };
      NodeTest.localNameMatches = function(localName, xpc, n) {
        var nLocalName = n.localName || n.nodeName;
        return xpc.caseInsensitive ? localName.toLowerCase() === nLocalName.toLowerCase() : localName === nLocalName;
      };
      NodeTest.NameTestPrefixAny = NodeTest.makeNodeTestType(NodeTest.NAMETESTPREFIXANY, {
        matches: function(n, xpc) {
          return NodeTest.isElementOrAttribute(n) && NodeTest.nameSpaceMatches(this.prefix, xpc, n);
        },
        toString: function() {
          return this.prefix + ":*";
        }
      }, function NameTestPrefixAny(prefix) {
        this.prefix = prefix;
      });
      NodeTest.NameTestQName = NodeTest.makeNodeTestType(NodeTest.NAMETESTQNAME, {
        matches: function(n, xpc) {
          return NodeTest.isNodeType([1, 2, XPathNamespace.XPATH_NAMESPACE_NODE])(n) && NodeTest.nameSpaceMatches(this.prefix, xpc, n) && NodeTest.localNameMatches(this.localName, xpc, n);
        },
        toString: function() {
          return this.name;
        }
      }, function NameTestQName(name2) {
        var nameParts = name2.split(":");
        this.name = name2;
        this.prefix = nameParts.length > 1 ? nameParts[0] : null;
        this.localName = nameParts[nameParts.length > 1 ? 1 : 0];
      });
      NodeTest.PITest = NodeTest.makeNodeTestType(NodeTest.PI, {
        matches: function(n, xpc) {
          return NodeTest.isNodeType([7])(n) && (n.target || n.nodeName) === this.name;
        },
        toString: function() {
          return wrap('processing-instruction("', '")', this.name);
        }
      }, function(name2) {
        this.name = name2;
      });
      NodeTest.nameTestAny = NodeTest.makeNodeTypeTest(NodeTest.NAMETESTANY, [1, 2, XPathNamespace.XPATH_NAMESPACE_NODE], "*");
      NodeTest.textTest = NodeTest.makeNodeTypeTest(NodeTest.TEXT, [3, 4], "text()");
      NodeTest.commentTest = NodeTest.makeNodeTypeTest(NodeTest.COMMENT, [8], "comment()");
      NodeTest.nodeTest = NodeTest.makeNodeTypeTest(NodeTest.NODE, [1, 2, 3, 4, 7, 8, 9], "node()");
      NodeTest.anyPiTest = NodeTest.makeNodeTypeTest(NodeTest.PI, [7], "processing-instruction()");
      VariableReference.prototype = new Expression();
      VariableReference.prototype.constructor = VariableReference;
      VariableReference.superclass = Expression.prototype;
      function VariableReference(v) {
        if (arguments.length > 0) {
          this.init(v);
        }
      }
      VariableReference.prototype.init = function(v) {
        this.variable = v;
      };
      VariableReference.prototype.toString = function() {
        return "$" + this.variable;
      };
      VariableReference.prototype.evaluate = function(c) {
        var parts = Utilities.resolveQName(this.variable, c.namespaceResolver, c.contextNode, false);
        if (parts[0] == null) {
          throw new Error("Cannot resolve QName " + fn);
        }
        var result = c.variableResolver.getVariable(parts[1], parts[0]);
        if (!result) {
          throw XPathException.fromMessage("Undeclared variable: " + this.toString());
        }
        return result;
      };
      FunctionCall.prototype = new Expression();
      FunctionCall.prototype.constructor = FunctionCall;
      FunctionCall.superclass = Expression.prototype;
      function FunctionCall(fn2, args) {
        if (arguments.length > 0) {
          this.init(fn2, args);
        }
      }
      FunctionCall.prototype.init = function(fn2, args) {
        this.functionName = fn2;
        this.arguments = args;
      };
      FunctionCall.prototype.toString = function() {
        var s = this.functionName + "(";
        for (var i = 0; i < this.arguments.length; i++) {
          if (i > 0) {
            s += ", ";
          }
          s += this.arguments[i].toString();
        }
        return s + ")";
      };
      FunctionCall.prototype.evaluate = function(c) {
        var f = FunctionResolver.getFunctionFromContext(this.functionName, c);
        if (!f) {
          throw new Error("Unknown function " + this.functionName);
        }
        var a = [c].concat(this.arguments);
        return f.apply(c.functionResolver.thisArg, a);
      };
      var Operators = new Object();
      Operators.equals = function(l, r) {
        return l.equals(r);
      };
      Operators.notequal = function(l, r) {
        return l.notequal(r);
      };
      Operators.lessthan = function(l, r) {
        return l.lessthan(r);
      };
      Operators.greaterthan = function(l, r) {
        return l.greaterthan(r);
      };
      Operators.lessthanorequal = function(l, r) {
        return l.lessthanorequal(r);
      };
      Operators.greaterthanorequal = function(l, r) {
        return l.greaterthanorequal(r);
      };
      XString.prototype = new Expression();
      XString.prototype.constructor = XString;
      XString.superclass = Expression.prototype;
      function XString(s) {
        if (arguments.length > 0) {
          this.init(s);
        }
      }
      XString.prototype.init = function(s) {
        this.str = String(s);
      };
      XString.prototype.toString = function() {
        return this.str;
      };
      XString.prototype.evaluate = function(c) {
        return this;
      };
      XString.prototype.string = function() {
        return this;
      };
      XString.prototype.number = function() {
        return new XNumber(this.str);
      };
      XString.prototype.bool = function() {
        return new XBoolean(this.str);
      };
      XString.prototype.nodeset = function() {
        throw new Error("Cannot convert string to nodeset");
      };
      XString.prototype.stringValue = function() {
        return this.str;
      };
      XString.prototype.numberValue = function() {
        return this.number().numberValue();
      };
      XString.prototype.booleanValue = function() {
        return this.bool().booleanValue();
      };
      XString.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().equals(r);
        }
        if (Utilities.instance_of(r, XNumber)) {
          return this.number().equals(r);
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithString(this, Operators.equals);
        }
        return new XBoolean(this.str == r.str);
      };
      XString.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().notequal(r);
        }
        if (Utilities.instance_of(r, XNumber)) {
          return this.number().notequal(r);
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithString(this, Operators.notequal);
        }
        return new XBoolean(this.str != r.str);
      };
      XString.prototype.lessthan = function(r) {
        return this.number().lessthan(r);
      };
      XString.prototype.greaterthan = function(r) {
        return this.number().greaterthan(r);
      };
      XString.prototype.lessthanorequal = function(r) {
        return this.number().lessthanorequal(r);
      };
      XString.prototype.greaterthanorequal = function(r) {
        return this.number().greaterthanorequal(r);
      };
      XNumber.prototype = new Expression();
      XNumber.prototype.constructor = XNumber;
      XNumber.superclass = Expression.prototype;
      function XNumber(n) {
        if (arguments.length > 0) {
          this.init(n);
        }
      }
      XNumber.prototype.init = function(n) {
        this.num = typeof n === "string" ? this.parse(n) : Number(n);
      };
      XNumber.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/;
      XNumber.prototype.parse = function(s) {
        return this.numberFormat.test(s) ? parseFloat(s) : Number.NaN;
      };
      function padSmallNumber(numberStr) {
        var parts = numberStr.split("e-");
        var base = parts[0].replace(".", "");
        var exponent = Number(parts[1]);
        for (var i = 0; i < exponent - 1; i += 1) {
          base = "0" + base;
        }
        return "0." + base;
      }
      function padLargeNumber(numberStr) {
        var parts = numberStr.split("e");
        var base = parts[0].replace(".", "");
        var exponent = Number(parts[1]);
        var zerosToAppend = exponent + 1 - base.length;
        for (var i = 0; i < zerosToAppend; i += 1) {
          base += "0";
        }
        return base;
      }
      XNumber.prototype.toString = function() {
        var strValue = this.num.toString();
        if (strValue.indexOf("e-") !== -1) {
          return padSmallNumber(strValue);
        }
        if (strValue.indexOf("e") !== -1) {
          return padLargeNumber(strValue);
        }
        return strValue;
      };
      XNumber.prototype.evaluate = function(c) {
        return this;
      };
      XNumber.prototype.string = function() {
        return new XString(this.toString());
      };
      XNumber.prototype.number = function() {
        return this;
      };
      XNumber.prototype.bool = function() {
        return new XBoolean(this.num);
      };
      XNumber.prototype.nodeset = function() {
        throw new Error("Cannot convert number to nodeset");
      };
      XNumber.prototype.stringValue = function() {
        return this.string().stringValue();
      };
      XNumber.prototype.numberValue = function() {
        return this.num;
      };
      XNumber.prototype.booleanValue = function() {
        return this.bool().booleanValue();
      };
      XNumber.prototype.negate = function() {
        return new XNumber(-this.num);
      };
      XNumber.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().equals(r);
        }
        if (Utilities.instance_of(r, XString)) {
          return this.equals(r.number());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.equals);
        }
        return new XBoolean(this.num == r.num);
      };
      XNumber.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XBoolean)) {
          return this.bool().notequal(r);
        }
        if (Utilities.instance_of(r, XString)) {
          return this.notequal(r.number());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.notequal);
        }
        return new XBoolean(this.num != r.num);
      };
      XNumber.prototype.lessthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.greaterthan);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.lessthan(r.number());
        }
        return new XBoolean(this.num < r.num);
      };
      XNumber.prototype.greaterthan = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.lessthan);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.greaterthan(r.number());
        }
        return new XBoolean(this.num > r.num);
      };
      XNumber.prototype.lessthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.greaterthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.lessthanorequal(r.number());
        }
        return new XBoolean(this.num <= r.num);
      };
      XNumber.prototype.greaterthanorequal = function(r) {
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithNumber(this, Operators.lessthanorequal);
        }
        if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
          return this.greaterthanorequal(r.number());
        }
        return new XBoolean(this.num >= r.num);
      };
      XNumber.prototype.plus = function(r) {
        return new XNumber(this.num + r.num);
      };
      XNumber.prototype.minus = function(r) {
        return new XNumber(this.num - r.num);
      };
      XNumber.prototype.multiply = function(r) {
        return new XNumber(this.num * r.num);
      };
      XNumber.prototype.div = function(r) {
        return new XNumber(this.num / r.num);
      };
      XNumber.prototype.mod = function(r) {
        return new XNumber(this.num % r.num);
      };
      XBoolean.prototype = new Expression();
      XBoolean.prototype.constructor = XBoolean;
      XBoolean.superclass = Expression.prototype;
      function XBoolean(b) {
        if (arguments.length > 0) {
          this.init(b);
        }
      }
      XBoolean.prototype.init = function(b) {
        this.b = Boolean(b);
      };
      XBoolean.prototype.toString = function() {
        return this.b.toString();
      };
      XBoolean.prototype.evaluate = function(c) {
        return this;
      };
      XBoolean.prototype.string = function() {
        return new XString(this.b);
      };
      XBoolean.prototype.number = function() {
        return new XNumber(this.b);
      };
      XBoolean.prototype.bool = function() {
        return this;
      };
      XBoolean.prototype.nodeset = function() {
        throw new Error("Cannot convert boolean to nodeset");
      };
      XBoolean.prototype.stringValue = function() {
        return this.string().stringValue();
      };
      XBoolean.prototype.numberValue = function() {
        return this.number().numberValue();
      };
      XBoolean.prototype.booleanValue = function() {
        return this.b;
      };
      XBoolean.prototype.not = function() {
        return new XBoolean(!this.b);
      };
      XBoolean.prototype.equals = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
          return this.equals(r.bool());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithBoolean(this, Operators.equals);
        }
        return new XBoolean(this.b == r.b);
      };
      XBoolean.prototype.notequal = function(r) {
        if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
          return this.notequal(r.bool());
        }
        if (Utilities.instance_of(r, XNodeSet)) {
          return r.compareWithBoolean(this, Operators.notequal);
        }
        return new XBoolean(this.b != r.b);
      };
      XBoolean.prototype.lessthan = function(r) {
        return this.number().lessthan(r);
      };
      XBoolean.prototype.greaterthan = function(r) {
        return this.number().greaterthan(r);
      };
      XBoolean.prototype.lessthanorequal = function(r) {
        return this.number().lessthanorequal(r);
      };
      XBoolean.prototype.greaterthanorequal = function(r) {
        return this.number().greaterthanorequal(r);
      };
      XBoolean.true_ = new XBoolean(true);
      XBoolean.false_ = new XBoolean(false);
      AVLTree.prototype = new Object();
      AVLTree.prototype.constructor = AVLTree;
      AVLTree.superclass = Object.prototype;
      function AVLTree(n) {
        this.init(n);
      }
      AVLTree.prototype.init = function(n) {
        this.left = null;
        this.right = null;
        this.node = n;
        this.depth = 1;
      };
      AVLTree.prototype.balance = function() {
        var ldepth = this.left == null ? 0 : this.left.depth;
        var rdepth = this.right == null ? 0 : this.right.depth;
        if (ldepth > rdepth + 1) {
          var lldepth = this.left.left == null ? 0 : this.left.left.depth;
          var lrdepth = this.left.right == null ? 0 : this.left.right.depth;
          if (lldepth < lrdepth) {
            this.left.rotateRR();
          }
          this.rotateLL();
        } else if (ldepth + 1 < rdepth) {
          var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
          var rldepth = this.right.left == null ? 0 : this.right.left.depth;
          if (rldepth > rrdepth) {
            this.right.rotateLL();
          }
          this.rotateRR();
        }
      };
      AVLTree.prototype.rotateLL = function() {
        var nodeBefore = this.node;
        var rightBefore = this.right;
        this.node = this.left.node;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.node = nodeBefore;
        this.right.updateInNewLocation();
        this.updateInNewLocation();
      };
      AVLTree.prototype.rotateRR = function() {
        var nodeBefore = this.node;
        var leftBefore = this.left;
        this.node = this.right.node;
        this.left = this.right;
        this.right = this.right.right;
        this.left.right = this.left.left;
        this.left.left = leftBefore;
        this.left.node = nodeBefore;
        this.left.updateInNewLocation();
        this.updateInNewLocation();
      };
      AVLTree.prototype.updateInNewLocation = function() {
        this.getDepthFromChildren();
      };
      AVLTree.prototype.getDepthFromChildren = function() {
        this.depth = this.node == null ? 0 : 1;
        if (this.left != null) {
          this.depth = this.left.depth + 1;
        }
        if (this.right != null && this.depth <= this.right.depth) {
          this.depth = this.right.depth + 1;
        }
      };
      function nodeOrder(n1, n2) {
        if (n1 === n2) {
          return 0;
        }
        if (n1.compareDocumentPosition) {
          var cpos = n1.compareDocumentPosition(n2);
          if (cpos & 1) {
            return 1;
          }
          if (cpos & 10) {
            return 1;
          }
          if (cpos & 20) {
            return -1;
          }
          return 0;
        }
        var d1 = 0, d2 = 0;
        for (var m1 = n1; m1 != null; m1 = m1.parentNode || m1.ownerElement) {
          d1++;
        }
        for (var m2 = n2; m2 != null; m2 = m2.parentNode || m2.ownerElement) {
          d2++;
        }
        if (d1 > d2) {
          while (d1 > d2) {
            n1 = n1.parentNode || n1.ownerElement;
            d1--;
          }
          if (n1 === n2) {
            return 1;
          }
        } else if (d2 > d1) {
          while (d2 > d1) {
            n2 = n2.parentNode || n2.ownerElement;
            d2--;
          }
          if (n1 === n2) {
            return -1;
          }
        }
        var n1Par = n1.parentNode || n1.ownerElement, n2Par = n2.parentNode || n2.ownerElement;
        while (n1Par !== n2Par) {
          n1 = n1Par;
          n2 = n2Par;
          n1Par = n1.parentNode || n1.ownerElement;
          n2Par = n2.parentNode || n2.ownerElement;
        }
        var n1isAttr = Utilities.isAttribute(n1);
        var n2isAttr = Utilities.isAttribute(n2);
        if (n1isAttr && !n2isAttr) {
          return -1;
        }
        if (!n1isAttr && n2isAttr) {
          return 1;
        }
        if (n1Par) {
          var cn = n1isAttr ? n1Par.attributes : n1Par.childNodes, len = cn.length;
          for (var i = 0; i < len; i += 1) {
            var n = cn[i];
            if (n === n1) {
              return -1;
            }
            if (n === n2) {
              return 1;
            }
          }
        }
        throw new Error("Unexpected: could not determine node order");
      }
      AVLTree.prototype.add = function(n) {
        if (n === this.node) {
          return false;
        }
        var o = nodeOrder(n, this.node);
        var ret = false;
        if (o == -1) {
          if (this.left == null) {
            this.left = new AVLTree(n);
            ret = true;
          } else {
            ret = this.left.add(n);
            if (ret) {
              this.balance();
            }
          }
        } else if (o == 1) {
          if (this.right == null) {
            this.right = new AVLTree(n);
            ret = true;
          } else {
            ret = this.right.add(n);
            if (ret) {
              this.balance();
            }
          }
        }
        if (ret) {
          this.getDepthFromChildren();
        }
        return ret;
      };
      XNodeSet.prototype = new Expression();
      XNodeSet.prototype.constructor = XNodeSet;
      XNodeSet.superclass = Expression.prototype;
      function XNodeSet() {
        this.init();
      }
      XNodeSet.prototype.init = function() {
        this.tree = null;
        this.nodes = [];
        this.size = 0;
      };
      XNodeSet.prototype.toString = function() {
        var p = this.first();
        if (p == null) {
          return "";
        }
        return this.stringForNode(p);
      };
      XNodeSet.prototype.evaluate = function(c) {
        return this;
      };
      XNodeSet.prototype.string = function() {
        return new XString(this.toString());
      };
      XNodeSet.prototype.stringValue = function() {
        return this.toString();
      };
      XNodeSet.prototype.number = function() {
        return new XNumber(this.string());
      };
      XNodeSet.prototype.numberValue = function() {
        return Number(this.string());
      };
      XNodeSet.prototype.bool = function() {
        return new XBoolean(this.booleanValue());
      };
      XNodeSet.prototype.booleanValue = function() {
        return !!this.size;
      };
      XNodeSet.prototype.nodeset = function() {
        return this;
      };
      XNodeSet.prototype.stringForNode = function(n) {
        if (n.nodeType == 9 || n.nodeType == 1 || n.nodeType === 11) {
          return this.stringForContainerNode(n);
        }
        if (n.nodeType === 2) {
          return n.value || n.nodeValue;
        }
        if (n.isNamespaceNode) {
          return n.namespace;
        }
        return n.nodeValue;
      };
      XNodeSet.prototype.stringForContainerNode = function(n) {
        var s = "";
        for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
          var nt = n2.nodeType;
          if (nt === 1 || nt === 3 || nt === 4 || nt === 9 || nt === 11) {
            s += this.stringForNode(n2);
          }
        }
        return s;
      };
      XNodeSet.prototype.buildTree = function() {
        if (!this.tree && this.nodes.length) {
          this.tree = new AVLTree(this.nodes[0]);
          for (var i = 1; i < this.nodes.length; i += 1) {
            this.tree.add(this.nodes[i]);
          }
        }
        return this.tree;
      };
      XNodeSet.prototype.first = function() {
        var p = this.buildTree();
        if (p == null) {
          return null;
        }
        while (p.left != null) {
          p = p.left;
        }
        return p.node;
      };
      XNodeSet.prototype.add = function(n) {
        for (var i = 0; i < this.nodes.length; i += 1) {
          if (n === this.nodes[i]) {
            return;
          }
        }
        this.tree = null;
        this.nodes.push(n);
        this.size += 1;
      };
      XNodeSet.prototype.addArray = function(ns) {
        var self = this;
        forEach(function(x) {
          self.add(x);
        }, ns);
      };
      XNodeSet.prototype.toArray = function() {
        var a = [];
        this.toArrayRec(this.buildTree(), a);
        return a;
      };
      XNodeSet.prototype.toArrayRec = function(t, a) {
        if (t != null) {
          this.toArrayRec(t.left, a);
          a.push(t.node);
          this.toArrayRec(t.right, a);
        }
      };
      XNodeSet.prototype.toUnsortedArray = function() {
        return this.nodes.slice();
      };
      XNodeSet.prototype.compareWithString = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
          var n = a[i];
          var l = new XString(this.stringForNode(n));
          var res = o(l, r);
          if (res.booleanValue()) {
            return res;
          }
        }
        return new XBoolean(false);
      };
      XNodeSet.prototype.compareWithNumber = function(r, o) {
        var a = this.toUnsortedArray();
        for (var i = 0; i < a.length; i++) {
          var n = a[i];
          var l = new XNumber(this.stringForNode(n));
          var res = o(l, r);
          if (res.booleanValue()) {
            return res;
          }
        }
        return new XBoolean(false);
      };
      XNodeSet.prototype.compareWithBoolean = function(r, o) {
        return o(this.bool(), r);
      };
      XNodeSet.prototype.compareWithNodeSet = function(r, o) {
        var arr = this.toUnsortedArray();
        var oInvert = function(lop, rop) {
          return o(rop, lop);
        };
        for (var i = 0; i < arr.length; i++) {
          var l = new XString(this.stringForNode(arr[i]));
          var res = r.compareWithString(l, oInvert);
          if (res.booleanValue()) {
            return res;
          }
        }
        return new XBoolean(false);
      };
      XNodeSet.compareWith = curry(function(o, r) {
        if (Utilities.instance_of(r, XString)) {
          return this.compareWithString(r, o);
        }
        if (Utilities.instance_of(r, XNumber)) {
          return this.compareWithNumber(r, o);
        }
        if (Utilities.instance_of(r, XBoolean)) {
          return this.compareWithBoolean(r, o);
        }
        return this.compareWithNodeSet(r, o);
      });
      XNodeSet.prototype.equals = XNodeSet.compareWith(Operators.equals);
      XNodeSet.prototype.notequal = XNodeSet.compareWith(Operators.notequal);
      XNodeSet.prototype.lessthan = XNodeSet.compareWith(Operators.lessthan);
      XNodeSet.prototype.greaterthan = XNodeSet.compareWith(Operators.greaterthan);
      XNodeSet.prototype.lessthanorequal = XNodeSet.compareWith(Operators.lessthanorequal);
      XNodeSet.prototype.greaterthanorequal = XNodeSet.compareWith(Operators.greaterthanorequal);
      XNodeSet.prototype.union = function(r) {
        var ns = new XNodeSet();
        ns.addArray(this.toUnsortedArray());
        ns.addArray(r.toUnsortedArray());
        return ns;
      };
      XPathNamespace.prototype = new Object();
      XPathNamespace.prototype.constructor = XPathNamespace;
      XPathNamespace.superclass = Object.prototype;
      function XPathNamespace(pre, ns, p) {
        this.isXPathNamespace = true;
        this.ownerDocument = p.ownerDocument;
        this.nodeName = "#namespace";
        this.prefix = pre;
        this.localName = pre;
        this.namespaceURI = ns;
        this.nodeValue = ns;
        this.ownerElement = p;
        this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE;
      }
      XPathNamespace.prototype.toString = function() {
        return '{ "' + this.prefix + '", "' + this.namespaceURI + '" }';
      };
      XPathContext.prototype = new Object();
      XPathContext.prototype.constructor = XPathContext;
      XPathContext.superclass = Object.prototype;
      function XPathContext(vr, nr, fr) {
        this.variableResolver = vr != null ? vr : new VariableResolver();
        this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
        this.functionResolver = fr != null ? fr : new FunctionResolver();
      }
      XPathContext.prototype.extend = function(newProps) {
        return assign(new XPathContext(), this, newProps);
      };
      VariableResolver.prototype = new Object();
      VariableResolver.prototype.constructor = VariableResolver;
      VariableResolver.superclass = Object.prototype;
      function VariableResolver() {
      }
      VariableResolver.prototype.getVariable = function(ln, ns) {
        return null;
      };
      FunctionResolver.prototype = new Object();
      FunctionResolver.prototype.constructor = FunctionResolver;
      FunctionResolver.superclass = Object.prototype;
      function FunctionResolver(thisArg) {
        this.thisArg = thisArg != null ? thisArg : Functions;
        this.functions = new Object();
        this.addStandardFunctions();
      }
      FunctionResolver.prototype.addStandardFunctions = function() {
        this.functions["{}last"] = Functions.last;
        this.functions["{}position"] = Functions.position;
        this.functions["{}count"] = Functions.count;
        this.functions["{}id"] = Functions.id;
        this.functions["{}local-name"] = Functions.localName;
        this.functions["{}namespace-uri"] = Functions.namespaceURI;
        this.functions["{}name"] = Functions.name;
        this.functions["{}string"] = Functions.string;
        this.functions["{}concat"] = Functions.concat;
        this.functions["{}starts-with"] = Functions.startsWith;
        this.functions["{}contains"] = Functions.contains;
        this.functions["{}substring-before"] = Functions.substringBefore;
        this.functions["{}substring-after"] = Functions.substringAfter;
        this.functions["{}substring"] = Functions.substring;
        this.functions["{}string-length"] = Functions.stringLength;
        this.functions["{}normalize-space"] = Functions.normalizeSpace;
        this.functions["{}translate"] = Functions.translate;
        this.functions["{}boolean"] = Functions.boolean_;
        this.functions["{}not"] = Functions.not;
        this.functions["{}true"] = Functions.true_;
        this.functions["{}false"] = Functions.false_;
        this.functions["{}lang"] = Functions.lang;
        this.functions["{}number"] = Functions.number;
        this.functions["{}sum"] = Functions.sum;
        this.functions["{}floor"] = Functions.floor;
        this.functions["{}ceiling"] = Functions.ceiling;
        this.functions["{}round"] = Functions.round;
      };
      FunctionResolver.prototype.addFunction = function(ns, ln, f) {
        this.functions["{" + ns + "}" + ln] = f;
      };
      FunctionResolver.getFunctionFromContext = function(qName, context) {
        var parts = Utilities.resolveQName(qName, context.namespaceResolver, context.contextNode, false);
        if (parts[0] === null) {
          throw new Error("Cannot resolve QName " + name);
        }
        return context.functionResolver.getFunction(parts[1], parts[0]);
      };
      FunctionResolver.prototype.getFunction = function(localName, namespace) {
        return this.functions["{" + namespace + "}" + localName];
      };
      NamespaceResolver.prototype = new Object();
      NamespaceResolver.prototype.constructor = NamespaceResolver;
      NamespaceResolver.superclass = Object.prototype;
      function NamespaceResolver() {
      }
      NamespaceResolver.prototype.getNamespace = function(prefix, n) {
        if (prefix == "xml") {
          return XPath2.XML_NAMESPACE_URI;
        } else if (prefix == "xmlns") {
          return XPath2.XMLNS_NAMESPACE_URI;
        }
        if (n.nodeType == 9) {
          n = n.documentElement;
        } else if (n.nodeType == 2) {
          n = PathExpr.getOwnerElement(n);
        } else if (n.nodeType != 1) {
          n = n.parentNode;
        }
        while (n != null && n.nodeType == 1) {
          var nnm = n.attributes;
          for (var i = 0; i < nnm.length; i++) {
            var a = nnm.item(i);
            var aname = a.name || a.nodeName;
            if (aname === "xmlns" && prefix === "" || aname === "xmlns:" + prefix) {
              return String(a.value || a.nodeValue);
            }
          }
          n = n.parentNode;
        }
        return null;
      };
      var Functions = new Object();
      Functions.last = function(c) {
        if (arguments.length != 1) {
          throw new Error("Function last expects ()");
        }
        return new XNumber(c.contextSize);
      };
      Functions.position = function(c) {
        if (arguments.length != 1) {
          throw new Error("Function position expects ()");
        }
        return new XNumber(c.contextPosition);
      };
      Functions.count = function() {
        var c = arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
          throw new Error("Function count expects (node-set)");
        }
        return new XNumber(ns.size);
      };
      Functions.id = function() {
        var c = arguments[0];
        var id;
        if (arguments.length != 2) {
          throw new Error("Function id expects (object)");
        }
        id = arguments[1].evaluate(c);
        if (Utilities.instance_of(id, XNodeSet)) {
          id = id.toArray().join(" ");
        } else {
          id = id.stringValue();
        }
        var ids = id.split(/[\x0d\x0a\x09\x20]+/);
        var count = 0;
        var ns = new XNodeSet();
        var doc = c.contextNode.nodeType == 9 ? c.contextNode : c.contextNode.ownerDocument;
        for (var i = 0; i < ids.length; i++) {
          var n;
          if (doc.getElementById) {
            n = doc.getElementById(ids[i]);
          } else {
            n = Utilities.getElementById(doc, ids[i]);
          }
          if (n != null) {
            ns.add(n);
            count++;
          }
        }
        return ns;
      };
      Functions.localName = function(c, eNode) {
        var n;
        if (arguments.length == 1) {
          n = c.contextNode;
        } else if (arguments.length == 2) {
          n = eNode.evaluate(c).first();
        } else {
          throw new Error("Function local-name expects (node-set?)");
        }
        if (n == null) {
          return new XString("");
        }
        return new XString(n.localName || n.baseName || n.target || n.nodeName || "");
      };
      Functions.namespaceURI = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) {
          n = c.contextNode;
        } else if (arguments.length == 2) {
          n = arguments[1].evaluate(c).first();
        } else {
          throw new Error("Function namespace-uri expects (node-set?)");
        }
        if (n == null) {
          return new XString("");
        }
        return new XString(n.namespaceURI);
      };
      Functions.name = function() {
        var c = arguments[0];
        var n;
        if (arguments.length == 1) {
          n = c.contextNode;
        } else if (arguments.length == 2) {
          n = arguments[1].evaluate(c).first();
        } else {
          throw new Error("Function name expects (node-set?)");
        }
        if (n == null) {
          return new XString("");
        }
        if (n.nodeType == 1) {
          return new XString(n.nodeName);
        } else if (n.nodeType == 2) {
          return new XString(n.name || n.nodeName);
        } else if (n.nodeType === 7) {
          return new XString(n.target || n.nodeName);
        } else if (n.localName == null) {
          return new XString("");
        } else {
          return new XString(n.localName);
        }
      };
      Functions.string = function() {
        var c = arguments[0];
        if (arguments.length == 1) {
          return new XString(XNodeSet.prototype.stringForNode(c.contextNode));
        } else if (arguments.length == 2) {
          return arguments[1].evaluate(c).string();
        }
        throw new Error("Function string expects (object?)");
      };
      Functions.concat = function(c) {
        if (arguments.length < 3) {
          throw new Error("Function concat expects (string, string[, string]*)");
        }
        var s = "";
        for (var i = 1; i < arguments.length; i++) {
          s += arguments[i].evaluate(c).stringValue();
        }
        return new XString(s);
      };
      Functions.startsWith = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function startsWith expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.substring(0, s2.length) == s2);
      };
      Functions.contains = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function contains expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XBoolean(s1.indexOf(s2) !== -1);
      };
      Functions.substringBefore = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function substring-before expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        return new XString(s1.substring(0, s1.indexOf(s2)));
      };
      Functions.substringAfter = function() {
        var c = arguments[0];
        if (arguments.length != 3) {
          throw new Error("Function substring-after expects (string, string)");
        }
        var s1 = arguments[1].evaluate(c).stringValue();
        var s2 = arguments[2].evaluate(c).stringValue();
        if (s2.length == 0) {
          return new XString(s1);
        }
        var i = s1.indexOf(s2);
        if (i == -1) {
          return new XString("");
        }
        return new XString(s1.substring(i + s2.length));
      };
      Functions.substring = function() {
        var c = arguments[0];
        if (!(arguments.length == 3 || arguments.length == 4)) {
          throw new Error("Function substring expects (string, number, number?)");
        }
        var s = arguments[1].evaluate(c).stringValue();
        var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
        var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : void 0;
        return new XString(s.substring(n1, n2));
      };
      Functions.stringLength = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) {
          s = XNodeSet.prototype.stringForNode(c.contextNode);
        } else if (arguments.length == 2) {
          s = arguments[1].evaluate(c).stringValue();
        } else {
          throw new Error("Function string-length expects (string?)");
        }
        return new XNumber(s.length);
      };
      Functions.normalizeSpace = function() {
        var c = arguments[0];
        var s;
        if (arguments.length == 1) {
          s = XNodeSet.prototype.stringForNode(c.contextNode);
        } else if (arguments.length == 2) {
          s = arguments[1].evaluate(c).stringValue();
        } else {
          throw new Error("Function normalize-space expects (string?)");
        }
        var i = 0;
        var j = s.length - 1;
        while (Utilities.isSpace(s.charCodeAt(j))) {
          j--;
        }
        var t = "";
        while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
          i++;
        }
        while (i <= j) {
          if (Utilities.isSpace(s.charCodeAt(i))) {
            t += " ";
            while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
              i++;
            }
          } else {
            t += s.charAt(i);
            i++;
          }
        }
        return new XString(t);
      };
      Functions.translate = function(c, eValue, eFrom, eTo) {
        if (arguments.length != 4) {
          throw new Error("Function translate expects (string, string, string)");
        }
        var value = eValue.evaluate(c).stringValue();
        var from = eFrom.evaluate(c).stringValue();
        var to = eTo.evaluate(c).stringValue();
        var cMap = reduce(function(acc, ch, i) {
          if (!(ch in acc)) {
            acc[ch] = i > to.length ? "" : to[i];
          }
          return acc;
        }, {}, from);
        var t = join("", map(function(ch) {
          return ch in cMap ? cMap[ch] : ch;
        }, value));
        return new XString(t);
      };
      Functions.boolean_ = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function boolean expects (object)");
        }
        return arguments[1].evaluate(c).bool();
      };
      Functions.not = function(c, eValue) {
        if (arguments.length != 2) {
          throw new Error("Function not expects (object)");
        }
        return eValue.evaluate(c).bool().not();
      };
      Functions.true_ = function() {
        if (arguments.length != 1) {
          throw new Error("Function true expects ()");
        }
        return XBoolean.true_;
      };
      Functions.false_ = function() {
        if (arguments.length != 1) {
          throw new Error("Function false expects ()");
        }
        return XBoolean.false_;
      };
      Functions.lang = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function lang expects (string)");
        }
        var lang;
        for (var n = c.contextNode; n != null && n.nodeType != 9; n = n.parentNode) {
          var a = n.getAttributeNS(XPath2.XML_NAMESPACE_URI, "lang");
          if (a != null) {
            lang = String(a);
            break;
          }
        }
        if (lang == null) {
          return XBoolean.false_;
        }
        var s = arguments[1].evaluate(c).stringValue();
        return new XBoolean(lang.substring(0, s.length) == s && (lang.length == s.length || lang.charAt(s.length) == "-"));
      };
      Functions.number = function() {
        var c = arguments[0];
        if (!(arguments.length == 1 || arguments.length == 2)) {
          throw new Error("Function number expects (object?)");
        }
        if (arguments.length == 1) {
          return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
        }
        return arguments[1].evaluate(c).number();
      };
      Functions.sum = function() {
        var c = arguments[0];
        var ns;
        if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
          throw new Error("Function sum expects (node-set)");
        }
        ns = ns.toUnsortedArray();
        var n = 0;
        for (var i = 0; i < ns.length; i++) {
          n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
        }
        return new XNumber(n);
      };
      Functions.floor = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function floor expects (number)");
        }
        return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
      };
      Functions.ceiling = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function ceiling expects (number)");
        }
        return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
      };
      Functions.round = function() {
        var c = arguments[0];
        if (arguments.length != 2) {
          throw new Error("Function round expects (number)");
        }
        return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
      };
      var Utilities = new Object();
      Utilities.isAttribute = function(val) {
        return val && (val.nodeType === 2 || val.ownerElement);
      };
      Utilities.splitQName = function(qn) {
        var i = qn.indexOf(":");
        if (i == -1) {
          return [null, qn];
        }
        return [qn.substring(0, i), qn.substring(i + 1)];
      };
      Utilities.resolveQName = function(qn, nr, n, useDefault) {
        var parts = Utilities.splitQName(qn);
        if (parts[0] != null) {
          parts[0] = nr.getNamespace(parts[0], n);
        } else {
          if (useDefault) {
            parts[0] = nr.getNamespace("", n);
            if (parts[0] == null) {
              parts[0] = "";
            }
          } else {
            parts[0] = "";
          }
        }
        return parts;
      };
      Utilities.isSpace = function(c) {
        return c == 9 || c == 13 || c == 10 || c == 32;
      };
      Utilities.isLetter = function(c) {
        return c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 255 || c >= 256 && c <= 305 || c >= 308 && c <= 318 || c >= 321 && c <= 328 || c >= 330 && c <= 382 || c >= 384 && c <= 451 || c >= 461 && c <= 496 || c >= 500 && c <= 501 || c >= 506 && c <= 535 || c >= 592 && c <= 680 || c >= 699 && c <= 705 || c == 902 || c >= 904 && c <= 906 || c == 908 || c >= 910 && c <= 929 || c >= 931 && c <= 974 || c >= 976 && c <= 982 || c == 986 || c == 988 || c == 990 || c == 992 || c >= 994 && c <= 1011 || c >= 1025 && c <= 1036 || c >= 1038 && c <= 1103 || c >= 1105 && c <= 1116 || c >= 1118 && c <= 1153 || c >= 1168 && c <= 1220 || c >= 1223 && c <= 1224 || c >= 1227 && c <= 1228 || c >= 1232 && c <= 1259 || c >= 1262 && c <= 1269 || c >= 1272 && c <= 1273 || c >= 1329 && c <= 1366 || c == 1369 || c >= 1377 && c <= 1414 || c >= 1488 && c <= 1514 || c >= 1520 && c <= 1522 || c >= 1569 && c <= 1594 || c >= 1601 && c <= 1610 || c >= 1649 && c <= 1719 || c >= 1722 && c <= 1726 || c >= 1728 && c <= 1742 || c >= 1744 && c <= 1747 || c == 1749 || c >= 1765 && c <= 1766 || c >= 2309 && c <= 2361 || c == 2365 || c >= 2392 && c <= 2401 || c >= 2437 && c <= 2444 || c >= 2447 && c <= 2448 || c >= 2451 && c <= 2472 || c >= 2474 && c <= 2480 || c == 2482 || c >= 2486 && c <= 2489 || c >= 2524 && c <= 2525 || c >= 2527 && c <= 2529 || c >= 2544 && c <= 2545 || c >= 2565 && c <= 2570 || c >= 2575 && c <= 2576 || c >= 2579 && c <= 2600 || c >= 2602 && c <= 2608 || c >= 2610 && c <= 2611 || c >= 2613 && c <= 2614 || c >= 2616 && c <= 2617 || c >= 2649 && c <= 2652 || c == 2654 || c >= 2674 && c <= 2676 || c >= 2693 && c <= 2699 || c == 2701 || c >= 2703 && c <= 2705 || c >= 2707 && c <= 2728 || c >= 2730 && c <= 2736 || c >= 2738 && c <= 2739 || c >= 2741 && c <= 2745 || c == 2749 || c == 2784 || c >= 2821 && c <= 2828 || c >= 2831 && c <= 2832 || c >= 2835 && c <= 2856 || c >= 2858 && c <= 2864 || c >= 2866 && c <= 2867 || c >= 2870 && c <= 2873 || c == 2877 || c >= 2908 && c <= 2909 || c >= 2911 && c <= 2913 || c >= 2949 && c <= 2954 || c >= 2958 && c <= 2960 || c >= 2962 && c <= 2965 || c >= 2969 && c <= 2970 || c == 2972 || c >= 2974 && c <= 2975 || c >= 2979 && c <= 2980 || c >= 2984 && c <= 2986 || c >= 2990 && c <= 2997 || c >= 2999 && c <= 3001 || c >= 3077 && c <= 3084 || c >= 3086 && c <= 3088 || c >= 3090 && c <= 3112 || c >= 3114 && c <= 3123 || c >= 3125 && c <= 3129 || c >= 3168 && c <= 3169 || c >= 3205 && c <= 3212 || c >= 3214 && c <= 3216 || c >= 3218 && c <= 3240 || c >= 3242 && c <= 3251 || c >= 3253 && c <= 3257 || c == 3294 || c >= 3296 && c <= 3297 || c >= 3333 && c <= 3340 || c >= 3342 && c <= 3344 || c >= 3346 && c <= 3368 || c >= 3370 && c <= 3385 || c >= 3424 && c <= 3425 || c >= 3585 && c <= 3630 || c == 3632 || c >= 3634 && c <= 3635 || c >= 3648 && c <= 3653 || c >= 3713 && c <= 3714 || c == 3716 || c >= 3719 && c <= 3720 || c == 3722 || c == 3725 || c >= 3732 && c <= 3735 || c >= 3737 && c <= 3743 || c >= 3745 && c <= 3747 || c == 3749 || c == 3751 || c >= 3754 && c <= 3755 || c >= 3757 && c <= 3758 || c == 3760 || c >= 3762 && c <= 3763 || c == 3773 || c >= 3776 && c <= 3780 || c >= 3904 && c <= 3911 || c >= 3913 && c <= 3945 || c >= 4256 && c <= 4293 || c >= 4304 && c <= 4342 || c == 4352 || c >= 4354 && c <= 4355 || c >= 4357 && c <= 4359 || c == 4361 || c >= 4363 && c <= 4364 || c >= 4366 && c <= 4370 || c == 4412 || c == 4414 || c == 4416 || c == 4428 || c == 4430 || c == 4432 || c >= 4436 && c <= 4437 || c == 4441 || c >= 4447 && c <= 4449 || c == 4451 || c == 4453 || c == 4455 || c == 4457 || c >= 4461 && c <= 4462 || c >= 4466 && c <= 4467 || c == 4469 || c == 4510 || c == 4520 || c == 4523 || c >= 4526 && c <= 4527 || c >= 4535 && c <= 4536 || c == 4538 || c >= 4540 && c <= 4546 || c == 4587 || c == 4592 || c == 4601 || c >= 7680 && c <= 7835 || c >= 7840 && c <= 7929 || c >= 7936 && c <= 7957 || c >= 7960 && c <= 7965 || c >= 7968 && c <= 8005 || c >= 8008 && c <= 8013 || c >= 8016 && c <= 8023 || c == 8025 || c == 8027 || c == 8029 || c >= 8031 && c <= 8061 || c >= 8064 && c <= 8116 || c >= 8118 && c <= 8124 || c == 8126 || c >= 8130 && c <= 8132 || c >= 8134 && c <= 8140 || c >= 8144 && c <= 8147 || c >= 8150 && c <= 8155 || c >= 8160 && c <= 8172 || c >= 8178 && c <= 8180 || c >= 8182 && c <= 8188 || c == 8486 || c >= 8490 && c <= 8491 || c == 8494 || c >= 8576 && c <= 8578 || c >= 12353 && c <= 12436 || c >= 12449 && c <= 12538 || c >= 12549 && c <= 12588 || c >= 44032 && c <= 55203 || c >= 19968 && c <= 40869 || c == 12295 || c >= 12321 && c <= 12329;
      };
      Utilities.isNCNameChar = function(c) {
        return c >= 48 && c <= 57 || c >= 1632 && c <= 1641 || c >= 1776 && c <= 1785 || c >= 2406 && c <= 2415 || c >= 2534 && c <= 2543 || c >= 2662 && c <= 2671 || c >= 2790 && c <= 2799 || c >= 2918 && c <= 2927 || c >= 3047 && c <= 3055 || c >= 3174 && c <= 3183 || c >= 3302 && c <= 3311 || c >= 3430 && c <= 3439 || c >= 3664 && c <= 3673 || c >= 3792 && c <= 3801 || c >= 3872 && c <= 3881 || c == 46 || c == 45 || c == 95 || Utilities.isLetter(c) || c >= 768 && c <= 837 || c >= 864 && c <= 865 || c >= 1155 && c <= 1158 || c >= 1425 && c <= 1441 || c >= 1443 && c <= 1465 || c >= 1467 && c <= 1469 || c == 1471 || c >= 1473 && c <= 1474 || c == 1476 || c >= 1611 && c <= 1618 || c == 1648 || c >= 1750 && c <= 1756 || c >= 1757 && c <= 1759 || c >= 1760 && c <= 1764 || c >= 1767 && c <= 1768 || c >= 1770 && c <= 1773 || c >= 2305 && c <= 2307 || c == 2364 || c >= 2366 && c <= 2380 || c == 2381 || c >= 2385 && c <= 2388 || c >= 2402 && c <= 2403 || c >= 2433 && c <= 2435 || c == 2492 || c == 2494 || c == 2495 || c >= 2496 && c <= 2500 || c >= 2503 && c <= 2504 || c >= 2507 && c <= 2509 || c == 2519 || c >= 2530 && c <= 2531 || c == 2562 || c == 2620 || c == 2622 || c == 2623 || c >= 2624 && c <= 2626 || c >= 2631 && c <= 2632 || c >= 2635 && c <= 2637 || c >= 2672 && c <= 2673 || c >= 2689 && c <= 2691 || c == 2748 || c >= 2750 && c <= 2757 || c >= 2759 && c <= 2761 || c >= 2763 && c <= 2765 || c >= 2817 && c <= 2819 || c == 2876 || c >= 2878 && c <= 2883 || c >= 2887 && c <= 2888 || c >= 2891 && c <= 2893 || c >= 2902 && c <= 2903 || c >= 2946 && c <= 2947 || c >= 3006 && c <= 3010 || c >= 3014 && c <= 3016 || c >= 3018 && c <= 3021 || c == 3031 || c >= 3073 && c <= 3075 || c >= 3134 && c <= 3140 || c >= 3142 && c <= 3144 || c >= 3146 && c <= 3149 || c >= 3157 && c <= 3158 || c >= 3202 && c <= 3203 || c >= 3262 && c <= 3268 || c >= 3270 && c <= 3272 || c >= 3274 && c <= 3277 || c >= 3285 && c <= 3286 || c >= 3330 && c <= 3331 || c >= 3390 && c <= 3395 || c >= 3398 && c <= 3400 || c >= 3402 && c <= 3405 || c == 3415 || c == 3633 || c >= 3636 && c <= 3642 || c >= 3655 && c <= 3662 || c == 3761 || c >= 3764 && c <= 3769 || c >= 3771 && c <= 3772 || c >= 3784 && c <= 3789 || c >= 3864 && c <= 3865 || c == 3893 || c == 3895 || c == 3897 || c == 3902 || c == 3903 || c >= 3953 && c <= 3972 || c >= 3974 && c <= 3979 || c >= 3984 && c <= 3989 || c == 3991 || c >= 3993 && c <= 4013 || c >= 4017 && c <= 4023 || c == 4025 || c >= 8400 && c <= 8412 || c == 8417 || c >= 12330 && c <= 12335 || c == 12441 || c == 12442 || c == 183 || c == 720 || c == 721 || c == 903 || c == 1600 || c == 3654 || c == 3782 || c == 12293 || c >= 12337 && c <= 12341 || c >= 12445 && c <= 12446 || c >= 12540 && c <= 12542;
      };
      Utilities.coalesceText = function(n) {
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
          if (m.nodeType == 3 || m.nodeType == 4) {
            var s = m.nodeValue;
            var first = m;
            m = m.nextSibling;
            while (m != null && (m.nodeType == 3 || m.nodeType == 4)) {
              s += m.nodeValue;
              var del = m;
              m = m.nextSibling;
              del.parentNode.removeChild(del);
            }
            if (first.nodeType == 4) {
              var p = first.parentNode;
              if (first.nextSibling == null) {
                p.removeChild(first);
                p.appendChild(p.ownerDocument.createTextNode(s));
              } else {
                var next = first.nextSibling;
                p.removeChild(first);
                p.insertBefore(p.ownerDocument.createTextNode(s), next);
              }
            } else {
              first.nodeValue = s;
            }
            if (m == null) {
              break;
            }
          } else if (m.nodeType == 1) {
            Utilities.coalesceText(m);
          }
        }
      };
      Utilities.instance_of = function(o, c) {
        while (o != null) {
          if (o.constructor === c) {
            return true;
          }
          if (o === Object) {
            return false;
          }
          o = o.constructor.superclass;
        }
        return false;
      };
      Utilities.getElementById = function(n, id) {
        if (n.nodeType == 1) {
          if (n.getAttribute("id") == id || n.getAttributeNS(null, "id") == id) {
            return n;
          }
        }
        for (var m = n.firstChild; m != null; m = m.nextSibling) {
          var res = Utilities.getElementById(m, id);
          if (res != null) {
            return res;
          }
        }
        return null;
      };
      var XPathException = function() {
        function getMessage(code, exception) {
          var msg = exception ? ": " + exception.toString() : "";
          switch (code) {
            case XPathException2.INVALID_EXPRESSION_ERR:
              return "Invalid expression" + msg;
            case XPathException2.TYPE_ERR:
              return "Type error" + msg;
          }
          return null;
        }
        function XPathException2(code, error, message) {
          var err = Error.call(this, getMessage(code, error) || message);
          err.code = code;
          err.exception = error;
          return err;
        }
        XPathException2.prototype = Object.create(Error.prototype);
        XPathException2.prototype.constructor = XPathException2;
        XPathException2.superclass = Error;
        XPathException2.prototype.toString = function() {
          return this.message;
        };
        XPathException2.fromMessage = function(message, error) {
          return new XPathException2(null, error, message);
        };
        XPathException2.INVALID_EXPRESSION_ERR = 51;
        XPathException2.TYPE_ERR = 52;
        return XPathException2;
      }();
      XPathExpression.prototype = {};
      XPathExpression.prototype.constructor = XPathExpression;
      XPathExpression.superclass = Object.prototype;
      function XPathExpression(e, r, p) {
        this.xpath = p.parse(e);
        this.context = new XPathContext();
        this.context.namespaceResolver = new XPathNSResolverWrapper(r);
      }
      XPathExpression.getOwnerDocument = function(n) {
        return n.nodeType === 9 ? n : n.ownerDocument;
      };
      XPathExpression.detectHtmlDom = function(n) {
        if (!n) {
          return false;
        }
        var doc = XPathExpression.getOwnerDocument(n);
        try {
          return doc.implementation.hasFeature("HTML", "2.0");
        } catch (e) {
          return true;
        }
      };
      XPathExpression.prototype.evaluate = function(n, t, res) {
        this.context.expressionContextNode = n;
        this.context.caseInsensitive = XPathExpression.detectHtmlDom(n);
        var result = this.xpath.evaluate(this.context);
        return new XPathResult(result, t);
      };
      XPathNSResolverWrapper.prototype = {};
      XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
      XPathNSResolverWrapper.superclass = Object.prototype;
      function XPathNSResolverWrapper(r) {
        this.xpathNSResolver = r;
      }
      XPathNSResolverWrapper.prototype.getNamespace = function(prefix, n) {
        if (this.xpathNSResolver == null) {
          return null;
        }
        return this.xpathNSResolver.lookupNamespaceURI(prefix);
      };
      NodeXPathNSResolver.prototype = {};
      NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
      NodeXPathNSResolver.superclass = Object.prototype;
      function NodeXPathNSResolver(n) {
        this.node = n;
        this.namespaceResolver = new NamespaceResolver();
      }
      NodeXPathNSResolver.prototype.lookupNamespaceURI = function(prefix) {
        return this.namespaceResolver.getNamespace(prefix, this.node);
      };
      XPathResult.prototype = {};
      XPathResult.prototype.constructor = XPathResult;
      XPathResult.superclass = Object.prototype;
      function XPathResult(v, t) {
        if (t == XPathResult.ANY_TYPE) {
          if (v.constructor === XString) {
            t = XPathResult.STRING_TYPE;
          } else if (v.constructor === XNumber) {
            t = XPathResult.NUMBER_TYPE;
          } else if (v.constructor === XBoolean) {
            t = XPathResult.BOOLEAN_TYPE;
          } else if (v.constructor === XNodeSet) {
            t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
          }
        }
        this.resultType = t;
        switch (t) {
          case XPathResult.NUMBER_TYPE:
            this.numberValue = v.numberValue();
            return;
          case XPathResult.STRING_TYPE:
            this.stringValue = v.stringValue();
            return;
          case XPathResult.BOOLEAN_TYPE:
            this.booleanValue = v.booleanValue();
            return;
          case XPathResult.ANY_UNORDERED_NODE_TYPE:
          case XPathResult.FIRST_ORDERED_NODE_TYPE:
            if (v.constructor === XNodeSet) {
              this.singleNodeValue = v.first();
              return;
            }
            break;
          case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
          case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
            if (v.constructor === XNodeSet) {
              this.invalidIteratorState = false;
              this.nodes = v.toArray();
              this.iteratorIndex = 0;
              return;
            }
            break;
          case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
          case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
            if (v.constructor === XNodeSet) {
              this.nodes = v.toArray();
              this.snapshotLength = this.nodes.length;
              return;
            }
            break;
        }
        throw new XPathException(XPathException.TYPE_ERR);
      }
      ;
      XPathResult.prototype.iterateNext = function() {
        if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE && this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
          throw new XPathException(XPathException.TYPE_ERR);
        }
        return this.nodes[this.iteratorIndex++];
      };
      XPathResult.prototype.snapshotItem = function(i) {
        if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE && this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
          throw new XPathException(XPathException.TYPE_ERR);
        }
        return this.nodes[i];
      };
      XPathResult.ANY_TYPE = 0;
      XPathResult.NUMBER_TYPE = 1;
      XPathResult.STRING_TYPE = 2;
      XPathResult.BOOLEAN_TYPE = 3;
      XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
      XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
      XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
      XPathResult.FIRST_ORDERED_NODE_TYPE = 9;
      function installDOM3XPathSupport(doc, p) {
        doc.createExpression = function(e, r) {
          try {
            return new XPathExpression(e, r, p);
          } catch (e2) {
            throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e2);
          }
        };
        doc.createNSResolver = function(n) {
          return new NodeXPathNSResolver(n);
        };
        doc.evaluate = function(e, cn, r, t, res) {
          if (t < 0 || t > 9) {
            throw { code: 0, toString: function() {
              return "Request type not supported";
            } };
          }
          return doc.createExpression(e, r, p).evaluate(cn, t, res);
        };
      }
      ;
      try {
        var shouldInstall = true;
        try {
          if (document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XPath", null)) {
            shouldInstall = false;
          }
        } catch (e) {
        }
        if (shouldInstall) {
          installDOM3XPathSupport(document, new XPathParser());
        }
      } catch (e) {
      }
      installDOM3XPathSupport(exports2, new XPathParser());
      (function() {
        var parser = new XPathParser();
        var defaultNSResolver = new NamespaceResolver();
        var defaultFunctionResolver = new FunctionResolver();
        var defaultVariableResolver = new VariableResolver();
        function makeNSResolverFromFunction(func) {
          return {
            getNamespace: function(prefix, node) {
              var ns = func(prefix, node);
              return ns || defaultNSResolver.getNamespace(prefix, node);
            }
          };
        }
        function makeNSResolverFromObject(obj) {
          return makeNSResolverFromFunction(obj.getNamespace.bind(obj));
        }
        function makeNSResolverFromMap(map2) {
          return makeNSResolverFromFunction(function(prefix) {
            return map2[prefix];
          });
        }
        function makeNSResolver(resolver) {
          if (resolver && typeof resolver.getNamespace === "function") {
            return makeNSResolverFromObject(resolver);
          }
          if (typeof resolver === "function") {
            return makeNSResolverFromFunction(resolver);
          }
          if (typeof resolver === "object") {
            return makeNSResolverFromMap(resolver);
          }
          return defaultNSResolver;
        }
        function convertValue(value) {
          if (value === null || typeof value === "undefined" || value instanceof XString || value instanceof XBoolean || value instanceof XNumber || value instanceof XNodeSet) {
            return value;
          }
          switch (typeof value) {
            case "string":
              return new XString(value);
            case "boolean":
              return new XBoolean(value);
            case "number":
              return new XNumber(value);
          }
          var ns = new XNodeSet();
          ns.addArray([].concat(value));
          return ns;
        }
        function makeEvaluator(func) {
          return function(context) {
            var args = Array.prototype.slice.call(arguments, 1).map(function(arg) {
              return arg.evaluate(context);
            });
            var result = func.apply(this, [].concat(context, args));
            return convertValue(result);
          };
        }
        function makeFunctionResolverFromFunction(func) {
          return {
            getFunction: function(name2, namespace) {
              var found = func(name2, namespace);
              if (found) {
                return makeEvaluator(found);
              }
              return defaultFunctionResolver.getFunction(name2, namespace);
            }
          };
        }
        function makeFunctionResolverFromObject(obj) {
          return makeFunctionResolverFromFunction(obj.getFunction.bind(obj));
        }
        function makeFunctionResolverFromMap(map2) {
          return makeFunctionResolverFromFunction(function(name2) {
            return map2[name2];
          });
        }
        function makeFunctionResolver(resolver) {
          if (resolver && typeof resolver.getFunction === "function") {
            return makeFunctionResolverFromObject(resolver);
          }
          if (typeof resolver === "function") {
            return makeFunctionResolverFromFunction(resolver);
          }
          if (typeof resolver === "object") {
            return makeFunctionResolverFromMap(resolver);
          }
          return defaultFunctionResolver;
        }
        function makeVariableResolverFromFunction(func) {
          return {
            getVariable: function(name2, namespace) {
              var value = func(name2, namespace);
              return convertValue(value);
            }
          };
        }
        function makeVariableResolver(resolver) {
          if (resolver) {
            if (typeof resolver.getVariable === "function") {
              return makeVariableResolverFromFunction(resolver.getVariable.bind(resolver));
            }
            if (typeof resolver === "function") {
              return makeVariableResolverFromFunction(resolver);
            }
            if (typeof resolver === "object") {
              return makeVariableResolverFromFunction(function(name2) {
                return resolver[name2];
              });
            }
          }
          return defaultVariableResolver;
        }
        function copyIfPresent(prop, dest, source) {
          if (prop in source) {
            dest[prop] = source[prop];
          }
        }
        function makeContext(options) {
          var context = new XPathContext();
          if (options) {
            context.namespaceResolver = makeNSResolver(options.namespaces);
            context.functionResolver = makeFunctionResolver(options.functions);
            context.variableResolver = makeVariableResolver(options.variables);
            context.expressionContextNode = options.node;
            copyIfPresent("allowAnyNamespaceForNoPrefix", context, options);
            copyIfPresent("isHtml", context, options);
          } else {
            context.namespaceResolver = defaultNSResolver;
          }
          return context;
        }
        function evaluate(parsedExpression, options) {
          var context = makeContext(options);
          return parsedExpression.evaluate(context);
        }
        var evaluatorPrototype = {
          evaluate: function(options) {
            return evaluate(this.expression, options);
          },
          evaluateNumber: function(options) {
            return this.evaluate(options).numberValue();
          },
          evaluateString: function(options) {
            return this.evaluate(options).stringValue();
          },
          evaluateBoolean: function(options) {
            return this.evaluate(options).booleanValue();
          },
          evaluateNodeSet: function(options) {
            return this.evaluate(options).nodeset();
          },
          select: function(options) {
            return this.evaluateNodeSet(options).toArray();
          },
          select1: function(options) {
            return this.select(options)[0];
          }
        };
        function parse2(xpath2) {
          var parsed = parser.parse(xpath2);
          return Object.create(evaluatorPrototype, {
            expression: {
              value: parsed
            }
          });
        }
        exports2.parse = parse2;
      })();
      assign(exports2, {
        XPath: XPath2,
        XPathParser,
        XPathResult,
        Step,
        PathExpr,
        NodeTest,
        LocationPath,
        OrOperation,
        AndOperation,
        BarOperation,
        EqualsOperation,
        NotEqualOperation,
        LessThanOperation,
        GreaterThanOperation,
        LessThanOrEqualOperation,
        GreaterThanOrEqualOperation,
        PlusOperation,
        MinusOperation,
        MultiplyOperation,
        DivOperation,
        ModOperation,
        UnaryMinusOperation,
        FunctionCall,
        VariableReference,
        XPathContext,
        XNodeSet,
        XBoolean,
        XString,
        XNumber,
        NamespaceResolver,
        FunctionResolver,
        VariableResolver,
        Utilities
      });
      exports2.select = function(e, doc, single) {
        return exports2.selectWithResolver(e, doc, null, single);
      };
      exports2.useNamespaces = function(mappings) {
        var resolver = {
          mappings: mappings || {},
          lookupNamespaceURI: function(prefix) {
            return this.mappings[prefix];
          }
        };
        return function(e, doc, single) {
          return exports2.selectWithResolver(e, doc, resolver, single);
        };
      };
      exports2.selectWithResolver = function(e, doc, resolver, single) {
        var expression = new XPathExpression(e, resolver, new XPathParser());
        var type = XPathResult.ANY_TYPE;
        var result = expression.evaluate(doc, type, null);
        if (result.resultType == XPathResult.STRING_TYPE) {
          result = result.stringValue;
        } else if (result.resultType == XPathResult.NUMBER_TYPE) {
          result = result.numberValue;
        } else if (result.resultType == XPathResult.BOOLEAN_TYPE) {
          result = result.booleanValue;
        } else {
          result = result.nodes;
          if (single) {
            result = result[0];
          }
        }
        return result;
      };
      exports2.select1 = function(e, doc) {
        return exports2.select(e, doc, true);
      };
    })(xpath);
  }
});

// src/web/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
var import_vscode3 = require("vscode");

// src/web/editor.ts
var import_vscode = require("vscode");

// src/web/util.ts
var import_xmldom = __toESM(require_lib());
var XPath = __toESM(require_xpath());
function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function parseHtml(text) {
  return new import_xmldom.DOMParser().parseFromString(text, "text/html");
}
function select1(xpath, node, options = { isHtml: true }) {
  return XPath.parse(xpath).select1(__spreadValues({
    node
  }, options));
}

// src/web/editor.ts
var SSI_REGEX = /<!--[ ]*#(include|echo)([ ]+(file|virtual|var)="(.+?)")*[ ]*-->/g;
var _TailwindEditor = class {
  constructor(context) {
    this.context = context;
    var _a, _b;
    this.rootPath = ((_b = (_a = import_vscode.workspace.workspaceFolders) == null ? void 0 : _a[0]) == null ? void 0 : _b.uri) || import_vscode.Uri.file("/");
  }
  static register(context) {
    const provider = new _TailwindEditor(context);
    const providerRegistration = import_vscode.window.registerCustomEditorProvider(_TailwindEditor.viewType, provider, {
      supportsMultipleEditorsPerDocument: true,
      webviewOptions: {
        enableFindWidget: true,
        retainContextWhenHidden: true
      }
    });
    return providerRegistration;
  }
  resolveCustomTextEditor(document2, webviewPanel, _token) {
    return __async(this, null, function* () {
      const webview = webviewPanel.webview;
      webview.options = {
        enableScripts: true,
        enableCommandUris: true
      };
      const content = yield this.getContent(document2);
      webview.html = this.getHtmlForWebview(webview, content);
      const saveDocumentSubscription = import_vscode.workspace.onDidSaveTextDocument((savedDocument) => {
        if (savedDocument.uri.toString() === document2.uri.toString()) {
          this.updateWebview(webview, document2);
        }
      });
      webviewPanel.onDidDispose(() => {
        saveDocumentSubscription.dispose();
      });
      webview.onDidReceiveMessage(({ type, payload }) => {
        switch (type) {
          case "mutations":
            this.applyMutations(document2, payload);
            break;
        }
      });
    });
  }
  getHtmlForWebview(webview, body) {
    const rootPath = this.rootPath;
    const baseUri = webview.asWebviewUri(rootPath);
    const extensionUri = this.context.extensionUri;
    const scriptUri = webview.asWebviewUri(import_vscode.Uri.joinPath(extensionUri, "media", "editor.mjs"));
    const configUri = webview.asWebviewUri(import_vscode.Uri.joinPath(rootPath, "examples", "tailwind.config.js"));
    const nonce = getNonce();
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <!-- Use the base Uri of the webview from workspace's root path. -->
        <base href="${baseUri}/" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script src="https://cdn.tailwindcss.com"><\/script>
        <script src="${configUri}"><\/script>
        <style type="text/tailwindcss">
          @layer utilities {
            .content-auto {
              content-visibility: auto;
            }
          }
        </style>

        <title>Tailwind Editor</title>
      </head>

      <body is="tailwind-editor">
        ${body}
        <script crossorigin src="https://unpkg.com/get-xpath"><\/script>
        <script crossorigin src="https://bundle.run/nanomorph@5.4.3"><\/script>
        <script type="module" src="${scriptUri}"><\/script>
      </body>
      </html>`;
  }
  getContent(document2) {
    return __async(this, null, function* () {
      const html = document2.getText();
      let content = html;
      if (html.indexOf("<body") > -1) {
        content = html.substring(html.indexOf("<body"), html.indexOf("</body>"));
        content = content.substring(content.indexOf(">") + 1);
      }
      const uri = document2.uri;
      const extname = "." + uri.path.substring(uri.path.lastIndexOf(".") + 1);
      const ssiSettings = import_vscode.workspace.getConfiguration("tailwind.editor").get("serverSideIncludes", [".shtml"]);
      if (ssiSettings.indexOf(extname) === -1) {
        return content;
      }
      const promises = [];
      content.replace(SSI_REGEX, (match, directive, _, param, value) => {
        if (directive !== "include" /* include */)
          return match;
        const includeUri = import_vscode.Uri.joinPath(uri, "..", value);
        const thenable = import_vscode.workspace.openTextDocument(includeUri).then((includedDocument) => this.getContent(includedDocument)).then((html2) => {
          const args = [
            includeUri
          ];
          const commandUri = import_vscode.Uri.parse(`command:tailwind.editor.open?${encodeURIComponent(JSON.stringify(args))}`);
          return html2.replace(/<([a-z-]+) /, `<$1 is="portal-$1" src="${commandUri}" `);
        });
        promises.push(Promise.resolve(thenable));
        return match;
      });
      const includes = yield Promise.all(promises);
      return content.replace(SSI_REGEX, () => includes.shift() || "");
    });
  }
  updateWebview(webview, document2) {
    return __async(this, null, function* () {
      const content = yield this.getContent(document2);
      return webview.postMessage({
        type: "update",
        content
      });
    });
  }
  applyMutations(document2, mutations) {
    let html = document2.getText();
    const doc = parseHtml(html);
    const edit = new import_vscode.WorkspaceEdit();
    mutations.forEach((mutation) => {
      const {
        type,
        attributeName,
        oldValue = "",
        newValue = "",
        xpath
      } = mutation;
      if (xpath === "/html/body")
        return;
      const target = select1(xpath.replace("/html/body/", "//"), doc);
      if (!target)
        return;
      target.namespaceURI = null;
      const startPosition = new import_vscode.Position(target.lineNumber - 1, target.columnNumber - 1);
      const startOffset = document2.offsetAt(startPosition);
      let targetHtml = html.substring(startOffset);
      const endOffset = startOffset + targetHtml.indexOf(">") + 1;
      const endPosition = document2.positionAt(endOffset);
      if (newValue) {
        target.setAttribute(attributeName, newValue);
      } else {
        target.removeAttribute(attributeName);
      }
      targetHtml = target.toString();
      edit.replace(document2.uri, new import_vscode.Range(startPosition, endPosition), targetHtml.substring(0, targetHtml.indexOf(">") + 1));
    });
    import_vscode.workspace.applyEdit(edit);
  }
};
var TailwindEditor = _TailwindEditor;
TailwindEditor.viewType = "tailwind.editor";

// src/web/styleEditor.ts
var import_vscode2 = require("vscode");
var _TailwindStylesEditor = class {
  constructor(context) {
    this.context = context;
  }
  static register(context) {
    const provider = new _TailwindStylesEditor(context);
    const providerRegistration = import_vscode2.window.registerCustomEditorProvider(_TailwindStylesEditor.viewType, provider, {
      supportsMultipleEditorsPerDocument: true,
      webviewOptions: {
        enableFindWidget: true,
        retainContextWhenHidden: true
      }
    });
    return providerRegistration;
  }
  resolveCustomTextEditor(document2, webviewPanel, _token) {
    return __async(this, null, function* () {
      const webview = webviewPanel.webview;
      webview.options = {
        enableScripts: true,
        enableCommandUris: true
      };
      const selection = {
        className: ``
      };
      const content = yield this.getContent(selection);
      webview.html = this.getHtmlForWebview(webview, content);
      let selectionChange;
      const changeDocumentSubscription = import_vscode2.workspace.onDidChangeTextDocument((event) => {
        const { document: changedDocument, contentChanges } = event;
        if (!contentChanges.length)
          return;
        if (changedDocument.uri.toString() === document2.uri.toString()) {
          selectionChange = contentChanges.find((change) => change.text.indexOf('contenteditable="true"'));
          if (!selectionChange)
            return;
          const text = selectionChange.text;
          const [_, className = ""] = text.match(/class="([^"]+)"/) || [];
          selection.className = className;
          this.updateWebview(webview, selection);
        }
      });
      webviewPanel.onDidDispose(() => {
        changeDocumentSubscription.dispose();
      });
      webview.onDidReceiveMessage((data) => {
      });
    });
  }
  getHtmlForWebview(webview, body) {
    const toolkitUri = webview.asWebviewUri(import_vscode2.Uri.joinPath(this.context.extensionUri, "node_modules", "@vscode", "webview-ui-toolkit", "dist", "toolkit.js"));
    const codiconsUri = webview.asWebviewUri(import_vscode2.Uri.joinPath(this.context.extensionUri, "node_modules", "@vscode/codicons", "dist", "codicon.css"));
    const nonce = getNonce();
    return `
      <!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'unsafe-eval' 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="${codiconsUri}" rel="stylesheet" />

        <script nonce="${nonce}" src="//unpkg.com/alpinejs" defer=""><\/script>
        <script nonce="${nonce}" type="module" src="${toolkitUri}"><\/script>
        <script nonce="${nonce}" src="https://cdn.tailwindcss.com"><\/script>

				<title>Tailwind Editor View</title>
			</head>
			<body>
        ${body}

        <script nonce="${nonce}">
          console.log(Object.assign({}, tailwind))
        <\/script>
			</body>
			</html>`;
  }
  getContent(selection) {
    return __async(this, null, function* () {
      const classList = selection.className.split(" ").filter((c) => c);
      return `<main x-data="tailwind">
      ${this.getPanel("Layout", `
        <vscode-radio-group class="flex flex-row">
          <label slot="label" class="mr-4">Display</label>
          <vscode-radio>Block</vscode-radio>
          <vscode-radio>Flex</vscode-radio>
          <vscode-radio>Grid</vscode-radio>
          <vscode-radio>Inline Block</vscode-radio>
          <vscode-radio>Inline</vscode-radio>
          <vscode-radio>None</vscode-radio>
        </vscode-radio-group>
      `)}

      ${this.getPanel("Spacing", `
        <div class="grid border border-dashed">
          <label class="col-start-1 col-end-6 row-start-1 row-end-2 flex flex-col justify-center items-center p-2 bg-[color:var(--vscode-foreground)]">
            <input size="1" value="0" class="text-center" />
          </label>
          <label class="col-start-5 col-end-6 row-start-1 row-end-6 flex flex-col justify-center items-center p-2 bg-[color:var(--vscode-foreground)]">
            <input size="1" value="0" class="text-center" />
          </label>
          <label class="col-start-1 col-end-6 row-start-5 row-end-6 flex flex-col justify-center items-center p-2 bg-[color:var(--vscode-foreground)]">
            <input size="1" value="0" class="text-center" />
          </label>
          <label class="col-start-1 col-end-2 row-start-1 row-end-6 flex flex-col justify-center items-center p-2 bg-[color:var(--vscode-foreground)]">
            <input size="1" value="0" class="text-center" />
          </label>

          <label class="col-start-2 col-end-5 row-start-2 row-end-3 flex flex-col justify-center items-center p-2">
            <input size="1" value="0" class="text-center" />
          </label>
          <label class="col-start-4 col-end-5 row-start-2 row-end-5 flex flex-col justify-center items-center p-2">
            <input size="1" value="0" class="text-center" />
          </label>
          <label class="col-start-2 col-end-5 row-start-4 row-end-5 flex flex-col justify-center items-center p-2">
            <input size="1" value="0" class="text-center" />
          </label>
          <label class="col-start-2 col-end-3 row-start-2 row-end-5 flex flex-col justify-center items-center p-2">
            <input size="1" value="0" class="text-center" />
          </label>

          <div class="col-start-3 col-end-4 row-start-3 row-end-4 flex flex-col justify-center items-center p-2 border-2">

          </div>
        </div>
      `)}

      ${this.getPanel("Sizing", `
        <vscode-text-field type="text">Width</vscode-text-field>
        <vscode-text-field type="text">Height</vscode-text-field>
        <vscode-text-field type="text">Min W</vscode-text-field>
        <vscode-text-field type="text">Min H</vscode-text-field>
        <vscode-text-field type="text">Max W</vscode-text-field>
        <vscode-text-field type="text">Max H</vscode-text-field>
      `)}

      ${this.getPanel("Position", `
        <vscode-dropdown>
          <vscode-option>Static</vscode-option>
          <vscode-option>Relative</vscode-option>
          <vscode-option>Absolute</vscode-option>
          <vscode-option>Fixed</vscode-option>
          <vscode-option>Sticky</vscode-option>
        </vscode-dropdown>

        <vscode-radio-group>
          <label slot="label">Float</label>
          <vscode-radio>None</vscode-radio>
          <vscode-radio>Left</vscode-radio>
          <vscode-radio>Right</vscode-radio>
        </vscode-radio-group>

        <vscode-radio-group>
          <label slot="label">Clear</label>
          <vscode-radio>None</vscode-radio>
          <vscode-radio>Left</vscode-radio>
          <vscode-radio>Right</vscode-radio>
          <vscode-radio>Both</vscode-radio>
        </vscode-radio-group>
      `)}

      ${this.getPanel("Typography", `
        <div class="grid grid-cols-2 gap-4">
          <label class="col-span-2 flex items-center">
            <span class="w-[7ch]">Font</span>
            <vscode-dropdown class="flex-1">
              <template x-for="family in Object.entries(defaultConfig.theme.fontFamily)">
                <vscode-option x-text="family[1].join(', ')" x-bind:value="'font-' + family[0]"></vscode-option>
              </template>
            </vscode-dropdown>
          </label>

          <label class="col-span-2 flex items-center">
            <span class="w-[7ch]">Weight</span>
            <vscode-dropdown class="flex-1">
              <template x-for="weight in Object.entries(defaultConfig.theme.fontWeight)">
                <vscode-option x-text="weight.reverse().join(' - ')" x-bind:value="'font-' + weight[1]"></vscode-option>
              </template>
            </vscode-dropdown>
          </label>

          <label class="flex items-center">
            <span class="w-[7ch]">Size</span>
            <vscode-text-field type="text" class="flex-1"></vscode-text-field>
          </label>

          <label class="flex items-center">
            <span class="w-[7ch]">Height</span>
            <vscode-text-field type="text" class="flex-1"></vscode-text-field>
          </label>

          <label class="col-span-2 flex items-center">
            <span class="w-[7ch]">Color</span>
            <vscode-dropdown class="flex-1">
              <template x-for="color in Object.entries(colors)">
                <vscode-option x-text="color"></vscode-option>
              </template>
            </vscode-dropdown>

            <vscode-text-field type="color" list="tailwind-colors" class="flex-1"></vscode-text-field>
            <datalist id="tailwind-colors">
              <template x-for="color in Object.entries(colors)">
                <option x-text="color"></option>
              </template>
            </datalist>
          </label>
        </div>
      `)}

      ${this.getPanel("Backgrounds", ``)}

      ${this.getPanel("Borders", ``)}

      ${this.getPanel("Effects", ``)}

      ${this.getPanel("Filters", ``)}
    </main>`;
    });
  }
  getPanel(title, content) {
    return `<details open="" class="group open:mb-4">
      <summary
        class="
          flex items-center
          -mx-5 p-1
          font-bold uppercase

          border-t border-t-[color:var(--vscode-sideBarSectionHeader-border)]
          group-first-of-type:border-t-transparent

          cursor-pointer
          marker:content-none

          group-open:mb-2
        "
      >
        <i
          class="
            codicon codicon-chevron-right
            transition
            group-open:rotate-90
          "
        ></i> ${title}
      </summary>

      ${content}
    </details>`;
  }
  updateWebview(webview, selection) {
    return __async(this, null, function* () {
      const content = yield this.getContent(selection);
      return webview.postMessage({
        type: "update",
        content
      });
    });
  }
};
var TailwindStylesEditor = _TailwindStylesEditor;
TailwindStylesEditor.viewType = "tailwind.styles.editor";

// src/web/extension.ts
function activate(context) {
  const workspaceFolders = import_vscode3.workspace.workspaceFolders;
  if (!workspaceFolders) {
    import_vscode3.window.showErrorMessage("Opening files with Tailwind Editor currently requires opening a workspace");
    return;
  }
  context.subscriptions.push(TailwindEditor.register(context));
  context.subscriptions.push(TailwindStylesEditor.register(context));
  import_vscode3.commands.registerCommand("tailwind.editor.open", (resource) => {
    var _a;
    if (!resource) {
      resource = (_a = import_vscode3.window.activeTextEditor) == null ? void 0 : _a.document.uri;
    }
    import_vscode3.commands.executeCommand("vscode.openWith", resource, TailwindEditor.viewType);
  });
  import_vscode3.commands.registerCommand("tailwind.editor.style", (resource) => {
    var _a;
    if (!resource) {
      resource = (_a = import_vscode3.window.activeTextEditor) == null ? void 0 : _a.document.uri;
    }
    import_vscode3.commands.executeCommand("vscode.openWith", resource, TailwindStylesEditor.viewType, {
      viewColumn: import_vscode3.ViewColumn.Beside
    });
  });
}
function deactivate() {
}
module.exports = __toCommonJS(extension_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
