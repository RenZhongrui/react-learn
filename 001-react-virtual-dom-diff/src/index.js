/**
 * create: Ren Zhongrui
 * date: 2019-11-29
 * description: npm install -g create-react-app
 */
import {createElement, render} from "./Element";
let virtualDom = createElement("ul",{class:'list'},[
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item'},['a']),
    createElement("li",{class:'item'},['a'])
]);
let el = render(virtualDom);
console.log(el);
console.log(virtualDom);