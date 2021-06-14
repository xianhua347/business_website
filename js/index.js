const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
  //获取头部区域的高度
  let height = headerEl.getBoundingClientRect().height;

  if (window.pageYOffset - height > 800) {
    //判断页面是否到了offset>800 如果真就添加sticky类名
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    //如果不大于偏移值 800 就remove sticky 类名
    headerEl.classList.remove("sticky");
  }
  // 显示scrollToTop模块
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

const glide = new Glide(".glide");
const captionEle = document.querySelectorAll(".slide-caption");
// const explore_btn = document.querySelector(".explore-btn");

//glide插件事件 "mount.after = 挂起  run.after = 页面运行后
glide.on(["mount.after", "run.after"], () => {
  // 获取下标值
  const caption = captionEle[glide.index];
  //实现开场文字淡入的动画
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  });
});
//Whenever the animation starts, the transparency will be reset to 0 so that a loop animation can be realized
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption >*").forEach((el) => {
    el.style.opacity = 0;
  });
});
glide.mount();
//启动轮播图

//实现分类
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  //横向布局
  itemSelector: ".case-item",
});
const filterBtns = document.querySelector(".filter-btns");
//运用代理事件把子元素的所所有的筛选按钮选出来
filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  //把被点击的button用解构变量传给target
  const filterOption = target.getAttribute("data-filter");
  //选出button.data-filter 属性
  if (filterOption) {
    //如果filterOption不等于空就把被点击的button的calssname改成active
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");
    isotope.arrange({ filter: filterOption });
    //启动筛选器 筛选规则是 filterOption这个变量
    console.log(filterOption);
  }
});

//ScrollReveal定义文件
const staggeringOption = {
  delay: 300,
  //延迟
  distance: "50px",
  //移动距离
  duration: 500,
  //持续时间
  easing: "ease-in-out",
  //动画曲线
  origin: "button",
  //从哪个方向出来
};
//ScrollReveal().reveal("目标值",{配置文件或者是动画属性})
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 250 });

//数据增加模块
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    //当.data-section出现之前
    anime({
      targets: ".data-price .num",
      innerHTML: (el) => {
        return [1, el.innerHTML];
        //0 - 文本值
      },
      duration: 1000,
      round: 1,
      //整数显示
      easing: "easeInOutExpo",
    });
    //视差效果
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      dataSectionEl.getBoundingClientRect().bottom / 5
    }px)`;
  },
});
//data section 视差效果
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;

  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      bottom / 5
    }px)`;
  }
});

//平滑滚动模块
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  header: "header",
  //是否又头部
  offset: 80,
  //到达位置继续向下偏移
  speed: 700,
});

//点击更多按钮跳转到关于我们
const exlopreBtnEls = document.querySelectorAll(".explore-btn");
//每个元素都绑定点击事件
exlopreBtnEls.forEach((exlopreBtnEl) => {
  exlopreBtnEl.addEventListener("click", () => {
    //跳转到关于我们
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

//折叠按钮事件
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});

document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});
