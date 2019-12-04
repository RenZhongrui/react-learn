/**
 * create: Ren Zhongrui
 * date: 2019-12-03
 * description:
 */
function diff(oldTree, newTree) {
    let patches = {};
    let index = 0; // 记录树的节点编号
    // 递归树，比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches;
}

function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    for (let key in oldAttrs) {
        // 比较新旧属性是否相同
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]; // 新属性删除了，旧属性就没了，所以有可能是undefined
        }
    }
    // 处理新增的属性
    for (let key in newAttrs) {
        // 如果旧属性没有新属性的key
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
let Index = 0;
function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, index) => {
        // 使用全局Index，每次调用walk都是固定+1，否则oldChildren的遍历会改变index的值
        walk(child, newChildren[index], ++Index, patches);
    })
}
function isString(node) {
    return Object.prototype.toString.call(node) === "[object String]";
}
function walk(oldNode, newNode, index, patches) {
    let currentPatch = [];
    if (!newNode) { // 删除旧节点
        currentPatch.push({type: REMOVE, index});
    } else if (isString(oldNode) && isString(newNode)) { // 判断两个节点都是文本节点
        if (oldNode !== newNode) { // 不相等的情况下，表示文本改变了
            currentPatch.push({type: TEXT, text: newNode});
        }
    } else if (oldNode.type === newNode.type) { // 节点类型相同，比较属性
        // 比较新旧节点类型是否一致，如果类型一致则比较属性，返回一个变化的对象
        let attrs = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs});
        }
        // 如果有儿子节点，遍历子节点
        diffChildren(oldNode.children, newNode.children, patches);
    } else { // 节点类型被替换了 li -> div
        currentPatch.push({type: REPLACE, newNode});
    }
    if (currentPatch.length > 0) {
        // index是树的层级
        patches[index] = currentPatch;
        //console.log("最终的补丁包：" + JSON.stringify(patches));
    }
}

export default diff;