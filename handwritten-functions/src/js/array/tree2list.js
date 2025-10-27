const tree = [
    {
        id: 1,
        name: "根节点1",
        parentId: null,
        children: [
            { id: 2, name: "子节点1-1", parentId: 1, children: [] },
            { id: 3, name: "子节点1-2", parentId: 1, children: [{ id: 4, name: "孙节点1-2-1", parentId: 3 }] }
        ]
    }
];
const convert = (tree, result = []) => {
    for (const node of tree) {
        const { children, ...rest } = node;
        result.push(rest);
        if (children?.length) {
            convert(children, result);
        }
    }
    return result;
};
console.log(convert(tree, []));