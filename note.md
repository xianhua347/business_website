## business_website总结

### 1.技术栈

- 原生HTML5 + CSS + JavaScript 

- font Awesome 字体库

  http://www.fontawesome.com.cn/

- anime.js 动画插件
https://www.animejs.cn/

- glide.js 轮播组件插件
https://glidejs.com/

- smooth-scroll.js 平滑滚动插件

- scrollreveal.js 页面滑动显示插件
  https://scrollrevealjs.org/api/reveal.html

- isotope.js 筛选图片插件
  https://isotope.metafizzy.co/
- 

### 2.案例特点

使用Grid为主和Flex布局为辅，加以媒体查询实现响应式布局（适配各种设备）

使用JavaScript插件实现网页交互效果

### 3.布局介绍

网页分为四部分

头部 header

轮播图 Carousel

内容 content-wrapper

底部 footer

## 4.重点与难点

### 重点

1.使用Glide.js实现轮播图

2.使用Grid布局快速搭建网页

3.font Awesome 定义图标

4.使用Css :root{}和 var() 实现css定义常量颜色

5.JavaScript ES6 新语法的应用

6.anime.js 动画库的使用

### 难点
#### 1.使用isotope进行筛选显示

```html
<div class="filter-btns">
        <button class="filter-btn active" data-filter="*">全部</button>
        <button class="filter-btn" data-filter=".web">WEB</button>
        <button class="filter-btn" data-filter=".mobile">移动</button>
        <button class="filter-btn" data-filter=".science">科研</button>
    <!--  data-filter = "筛选项"-->
      </div>
      <!-- 筛选图片 -->
      <div class="cases">
        <div class="case-item web science">
          <img src="images/gray-laptop-computer-showing-html-codes-in-shallow-focus-160107.jpg" alt="">
        </div>
        <div class="case-item web">
          <img src="images/photo-of-imac-near-macbook-1029757.jpg" alt="">
        </div>
        <div class="case-item mobile science">
          <img src="images/apple-laptop-notebook-office-39284.jpg" alt="">
        </div>
        <div class="case-item web mobile">
          <img src="images/apple-apple-device-design-desk-285814.jpg" alt="">
        </div>
        <div class="case-item mobile science">
          <img src="images/person-using-black-and-white-smartphone-and-holding-blue-230544.jpg" alt="">
        </div>
        <div class="case-item web science">
          <img src="images/blur-close-up-code-computer-546819.jpg" alt="">
        </div>
        <div class="case-item science web mobile">
          <img src="images/person-holding-a-smartphone-892757.jpg" alt="">
        </div>
        <div class="case-item mobile science">
          <img src="images/bokeh-photography-of-person-holding-turned-on-iphone-1440727.jpg" alt="">
        </div>   
      </div>
```

```js
//实现分类
//初始化项目
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  //横向布局
  itemSelector: ".case-item",
});
const filterBtns = document.querySelector(".filter-btns");
//选择所有的筛选按钮
filterBtns.addEventListener("click", (e) => {
    ////运用代理事件绑定点击事件
  let { target } = e;
  //把被点击的button用解构变量传给target
  const filterOption = target.getAttribute("data-filter");
  //选出button.data-filter 属性
  if (filterOption) {
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");
     //实现切换active样式
      
    isotope.arrange({ filter: filterOption });
    //启动筛选器 筛选规则是 filterOption这个变量
    console.log(filterOption);
  }
});
```

##### 注意点

1.在html结构里面 ，筛选按钮 一定要设置data-filter = ".目标值" ，而且要注意在筛选目标里面添加相对应的类名

```html
<button> class="filter-btn active" data-filter="*">全部</button>

<div class="cases">
        <div class="case-item web science">
          <img src="images/gray-laptop-computer-showing-html-codes-in-shallow-focus-160107.jpg" alt="">
        </div>
```

2.在js里面要先去new Isotope这个对象然后再去配置 最后会启动 isotope

```js
//初始化
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  //横向布局
  itemSelector: ".case-item",
});
isotope.arrange({ filter: "筛选规则" });
//启动筛选器
```



