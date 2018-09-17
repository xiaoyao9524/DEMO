# window.history

### 语法：
  window.history.pushState(data, url, path);

---

- 获取data:
  1、window.history.state
  2、popstate中的事件对象的'state'字段
- 可以触发'popstate'的情况
  window.history.back();
  window.history.go(-1);
  注意：window.history.pushState和window.history.replaceState **不会** 触发!!!
- 获取上一页的地址:
  document.referrer
- 可以获取的情况:
    window.location.href = 'xxx'
    点击a标签
- 不能获取的情况:
    直接在浏览器地址栏输入并回车

### 以上并不是全部特性，以后会慢慢补充。