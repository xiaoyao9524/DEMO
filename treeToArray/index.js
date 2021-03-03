const data = [
  {
    id: 1,
    title: '课程1',
    children: [
      { id: 4, title: '课程1-1' },
      {
        id: 8,
        title: '课程1-2',
        children: [
          { id: 6, title: '课程1-2-1' },
          { id: 7, title: '课程1-2-2' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '课程2',
  },
  {
    id: 3,
    title: '课程3',
  },
];

function treeToArray (tree) {
  let arr = [];

  for (let item of tree) {
    const {children} = item;
    delete item.children;
    arr.push(item);
    if (children) {
      arr = [...arr, ...treeToArray(children)];
    }
  }

  return arr;
}

const arr = treeToArray(data);
console.log('arr: ', arr);

