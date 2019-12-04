/**
 * create: Ren Zhongrui
 * date: 2019-11-29
 * description:
 * npm install -g create-react-app
 * create-react-app appName
 */
import {createElement, render, renderDom} from "./Element";
import diff from './diff';
import patch from "./patch";

// 1、创建虚拟DOM, 虚拟dom是描述DOM信息的对象
let virtualDom = createElement("ul",{class:'list'},[
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item'},['a'])
]);
console.log(virtualDom);
let virtualDomNew = createElement("ul",{class:'list-group'},[
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item5'},['a'])
]);
// 2、虚拟DOM转化成了真实DOM
let el = render(virtualDom);
console.log(el);
// 3、将DOM渲染到页面
renderDom(el,window.root);
// 4.比较计算差量包
// DOM diif 比较的是两个虚拟DOM的区别
let patches = diff(virtualDom, virtualDomNew);
console.log(JSON.stringify(patches))
// 5、给元素打补丁，更新视图
// DOM diff作用是根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom
patch(el, patches);