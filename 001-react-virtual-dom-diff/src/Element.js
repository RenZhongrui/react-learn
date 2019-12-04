/**
 * create: Ren Zhongrui
 * date: 2019-11-29
 * description: 虚拟DOM元素
 */
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

function createElement(type, props, children) {
    return new Element(type, props, children);
}

function setAttr(node, key, value) {
    switch (key) {
        case "value": // input 或者 textarea
            if (node.tagName.toUpperCase() === "INPUT" || node.tagName.toUpperCase() === "TEXTAREA") {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case "style":
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}
// render方法将虚拟DOM转化为真实DOM
function render(virtualDom) {
    // 创建真实dom元素
    let el = document.createElement(virtualDom.type);
    // 解析dom元素的属性
    for (let key in virtualDom.props) {
        setAttr(el,key,virtualDom.props[key]);
    }
    virtualDom.children.forEach(child => {
        // 判断子元素是不是虚拟dom，如果是就接着渲染，如果不是就是文本节点
        child = (child instanceof Element)? render(child): document.createTextNode(child);
        el.appendChild(child);
    });
    return el;
}

function renderDom(el, target) {
    target.appendChild(el);
}

export {createElement, render, renderDom, Element,setAttr};