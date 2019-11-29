/**
 * create: Ren Zhongrui
 * date: 2019-11-29
 * description:
 * npm install -g create-react-app
 * create-react-app appName
 */
import {createElement, render, renderDom} from "./Element";
// 创建虚拟DOM, 虚拟dom是描述DOM信息的对象
let virtualDom = createElement("ul",{class:'list'},[
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item'},['a'])
]);
// 虚拟DOM转化成了真实DOM
let el = render(virtualDom);
// 将DOM渲染到页面
renderDom(el,window.root);
console.log(el);
console.log(virtualDom);