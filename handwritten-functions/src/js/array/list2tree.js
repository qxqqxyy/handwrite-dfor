// 1. 递归
const convert = (list, parentId = 0) => {
    const tree = [];
    for (const item of list) {
        if (item.parentId === parentId) {
            const children = convert(list, item.id);
            if (children.length) {
                item.children = children;
            }
            tree.push(item);
        }
    }
    return tree;
}
// 2. 借助map
function listToTree(list, rootParentId = null) {
    const tree = []; // 最终树形结果
    const nodeMap = new Map();

    list.forEach(node => {
        nodeMap.set(node.id, { ...node, children: [] });
    });

    // 第二步：遍历节点，挂载到对应父节点的 children 中
    list.forEach(node => {
        const currentNode = nodeMap.get(node.id);
        if (node.parentId === rootParentId) {
            // 根节点直接加入树
            tree.push(currentNode);
        } else {
            // 找到父节点，将当前节点加入父节点的 children
            const parentNode = nodeMap.get(node.parentId);
            if (parentNode) { // 防止 parentId 无效（容错）
                parentNode.children.push(currentNode);
            }
        }
    });

    return tree;
}