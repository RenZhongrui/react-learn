/**
 * create: Ren Zhongrui
 * date: 2019-12-04
 * description:
 */
import {render, setAttr, Element} from "./Element";

const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
let allPatches;
let index = 0; // 默认给那个node打补丁
function patch(node, patches) { // node是真实dom元素
    allPatches = patches;
    walk(node);
}
// 遍历打补丁
function walk(node) {
    let currentPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => walk(child)); // 树的深度先序遍历，遍历到最后一个儿子节点为止
    if (currentPatch) {
        doPatch(node, currentPatch); // 打补丁的顺序是从后往前的
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case ATTRS:
                for(let key in patch.attrs) {
                    let value = patch.attrs[key];
                    if (value) {
                        setAttr(node, key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case TEXT:
                node.textContent = patch.text;
                break;
            case REMOVE:
                node.parentNode.removeChild(node); // 删除自己
                break;
            case REPLACE:
                // 取的是虚拟dom, 如果是元素就渲染，如果是文本，就创建文本节点
                let newNode = (patch.newNode instanceof Element)? render(patch.newNode):document.createTextNode(patch.newNode);
                // 使用父节点替换当前节点
                node.parentNode.replaceChild(newNode,node);
                break;
            default:
                break;
        }
    });
}
export default patch;