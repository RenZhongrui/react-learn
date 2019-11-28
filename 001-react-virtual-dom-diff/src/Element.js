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

// render方法将虚拟DOM转化为真实DOM
function render(virtualDom) {
    
}

export {createElement, render};