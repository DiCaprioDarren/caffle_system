Waffle抽奖系统 - Vue3 + TypeScript
https://via.placeholder.com/800x400?text=Waffle+%E6%8A%BD%E5%A5%96%E7%B3%BB%E7%BB%9F+%E7%95%8C%E9%9D%A2%E6%88%AA%E5%9B%BE

Waffle抽奖系统是一个基于现代Web技术构建的轻量级、高性能抽奖解决方案。系统支持导入参与者名单，随机抽取获奖者，并提供精美的用户界面和动画效果。

功能亮点

🎯 名单导入：支持TXT/CSV格式文件导入，自动解析参与者名单
🎲 随机抽取：公平公正的随机算法，确保抽奖结果真实可靠
🏆 获奖展示：炫酷的获奖者展示动画和特效
📊 数据统计：实时统计参与者、抽奖次数和获奖者数据
📜 历史记录：完整保存每次抽奖结果，方便回溯
✨ 特效体验：抽取动画和彩色纸屑庆祝效果
📱 响应式设计：完美适配各种设备尺寸
技术栈

前端框架: Vue 3 (Composition API)
编程语言: TypeScript
构建工具: Vite
样式: CSS3 (Flexbox/Grid布局)
图标: Font Awesome 6
运行时: Node.js 24.0
包管理: npm 10.0
快速开始

安装依赖

bash
npm install
开发模式

bash
npm run dev
生产构建

bash
npm run build
预览生产版本

bash
npm run preview
项目结构

text
waffle-lottery-system/
├── src/
│   ├── components/
│   │   └── WaffleSystem.vue     # 抽奖系统主组件
│   ├── assets/                  # 静态资源
│   ├── App.vue                  # 应用根组件
│   └── main.ts                  # 应用入口文件
├── public/                      # 公共资源
├── index.html                   # 主HTML文件
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript配置
├── vite.config.ts               # Vite配置
└── README.md                    # 项目文档
使用指南

1. 导入参与者名单

点击"导入参与者名单"区域
选择包含参与者名单的TXT或CSV文件
文件格式要求：每行一个名字
2. 设置抽奖参数

设置需要抽取的获奖人数
选择是否排除已获奖者
确认参与者名单已正确加载
3. 开始抽奖

点击"开始抽奖"按钮启动抽奖过程
观看抽奖动画效果
查看最终获奖者名单
4. 管理抽奖历史

查看所有历史抽奖记录
使用"重置系统"按钮清除所有数据
导出抽奖结果（待实现）
自定义配置

系统支持以下自定义配置：

修改主题颜色：
在WaffleSystem.vue文件的<style>部分修改以下变量：
css
--primary-color: #6a11cb;
--secondary-color: #2575fc;
--accent-color: #ff416c;
调整动画速度：
修改抽奖动画持续时间：
ts
// 在drawWinners函数中
const maxIterations = 30; // 动画迭代次数
const interval = 100; // 动画间隔(毫秒)
修改默认名单：
在onMounted生命周期钩子中修改默认参与者名单：
ts
participants.value = [
  '默认名字1',
  '默认名字2',
  // ...
];
未来计划

导出抽奖结果功能
自定义抽奖动画效果
多语言支持
用户管理系统
抽奖规则自定义
实时多人参与功能
贡献指南

欢迎贡献代码！请遵循以下步骤：

Fork 项目仓库
创建新分支 (git checkout -b feature/your-feature)
提交更改 (git commit -am 'Add some feature')
推送分支 (git push origin feature/your-feature)
创建 Pull Request
常见问题

Q: 系统支持多大的名单文件？
A: 系统基于前端实现，建议名单不超过10,000人，以获得最佳性能。

Q: 如何保证抽奖的公平性？
A: 系统使用JavaScript的Math.random()结合Fisher-Yates洗牌算法，确保每个参与者有均等的机会。

Q: 抽奖结果会保存多久？
A: 结果保存在浏览器内存中，刷新页面后数据会丢失。您可以在抽奖后手动记录结果。

Q: 系统支持哪些浏览器？
A: 支持所有现代浏览器（Chrome, Firefox, Safari, Edge的最新版本）。

许可证

本项目采用 MIT 许可证。

联系方式

如有任何问题或建议，请联系：

邮箱：1136455707@qq.com
GitHub: https://github.com/yourusername/caffle-system
caffle抽奖系统 © 2025 - 让每次抽奖都充满惊喜！ 🎉e