# UBloop
二手书信息收集发布-微信小程序-基础与云开发

### 效果-视频

[B站](https://www.bilibili.com/video/BV1nu4y1v79s/)

### ISBN api

ISBN 识别 api 来源于 [ISBN书号查询 - 聚美智数](https://www.jumdata.com/product/code/isbn_query)，实名认证会有50次的免费调用
使用时请修改 miniprogram/pages/bookinfo/bookinfo.js 中的 getBookFromApi 方法

### 项目中使用的资源

***项目中以及演示视频中的出现的图像或其他资源仅供演示使用***  
***尊重版权，如需采用请联系原作者***  

- logo 与图标
  - [阿里巴巴矢量图标库](https://www.iconfont.cn/)，大多数的图标源  
  - [YEELOGO](https://www.qingnian8.com/)，logo设计  
- 图像  
  - [https://www.pexels.com/](https://www.pexels.com/)  
  - [https://unsplash.com/](https://unsplash.com/)  
  - [https://pixabay.com/](https://pixabay.com/)  
  - [https://www.photock.jp/](https://www.photock.jp/)  
  - 上述网站并非都有采用，参考时有便加入进来  
  - 还有可能部分内容来源于网络  

### 技术参考

- 主要技术文档  
  - [微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)，微信小程序技术文档  
  - [MDN Web Doc](https://developer.mozilla.org/zh-CN/)，网页技术文档  
- 学习视频，该部分内容是[新视觉实训 B站](https://space.bilibili.com/505082994) 关于微信小程序开发部分的视频内容  
  - [微信小程序基础](https://www.bilibili.com/video/BV1WQ4y1T7D8)  
  - [微信小程序云开发](https://www.bilibili.com/video/BV12z4y1R77r)  
  - [微信小程序组件库](https://www.bilibili.com/video/BV18V411C7VV)，前期有参考，后期组件不合意放弃使用  
  - [微信小程序CMS内容管理](https://www.bilibili.com/video/BV1HA411N7eG)，该部分项目中没有使用  
- 其他参考  
  - [HTML+CSS+JS快速入门](https://blog.csdn.net/weixin_45953673/article/details/120040896)  
  - [色彩参考](https://blog.csdn.net/weixin_39417767/article/details/85003192)，考虑页面和元素配色  
  - [图片取色器/拾色器|菜鸟工具](https://c.runoob.com/front-end/6214/#90a4ae)

### 关于项目开发内容的说明

**这是一个没有完成的作品**  

#### 原始计划

**内容有地区划分，仅展现同一地区的发布内容（不区分用户，用户可以在多地区发布内容）**

1. 用户发布二手书籍信息（出售或者求购）（书籍信息统一化，使用ISBN识别接口，避免个人编辑的不明确性，提供后期数据分析的高效性）
2. 用户可以预定他人发布的内容，用于用户交易的确认（该功能配合 项目3 内容）
3. 线下交易的活动发起，可以由地区用户投票（提出类似于跳蚤市场的方式促进集中交易，改变零散的交易方式）
4. 线下活动的反馈，用于提供一种交易参考（让用户对 其他计划参与活动的出售用户 是否参加线下活动，以及交易的诚信进行评分，并展示在用户主页供参考）

#### 功能计划

- 首页热门  
  - 轮播热门内容  
  - 热门排行榜  
- 内容发布页
  - 
