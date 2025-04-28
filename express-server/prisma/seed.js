const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // --- Seed Article Categories (Keep the previous logic or ensure categories exist) ---
  // const categoriesData = [
  //   {
  //     name: '技术分享',
  //     desc: '各类编程技术、框架、工具的分享',
  //     content: '深入探讨最新的技术趋势和最佳实践。',
  //   },
  //   {
  //     name: '生活随笔',
  //     desc: '记录生活点滴，分享感悟',
  //     content: '一些关于日常生活的思考和记录。',
  //     // img is optional, can be null or omitted
  //   },
  //   {
  //     name: '项目展示',
  //     desc: '展示个人或团队完成的项目',
  //     content: '这里是我们引以为傲的项目成果。',
  //   },
  //   {
  //     name: '学习笔记',
  //     desc: '记录学习过程中的笔记和总结',
  //     // content is optional
  //   },
  //   {
  //     name: '行业资讯',
  //     desc: '关注行业动态，分享最新资讯',
  //     content: '保持对行业前沿信息的关注。',
  //   },
  //   {
  //     name: '资源推荐',
  //     desc: '推荐有用的工具、网站或书籍',
  //     content: '分享那些提升效率和知识的宝藏资源。',
  //     // img is optional
  //   },
  // ];

  // // 使用 createMany 插入数据
  // const createdCategories = await prisma.articleCategory.createMany({
  //   data: categoriesData,
  //   skipDuplicates: true, // 如果你想避免因唯一约束（例如 name）而失败，可以加上这个，但 ArticleCategory 目前没有唯一约束（除了id）
  // });

  // console.log(`Created ${createdCategories.count} categories.`);

  // console.log(`Seeding finished.`);
 

  // --- Seed Articles ---
  console.log('Seeding articles...');

  // 1. 获取已存在的文章分类 ID
  const existingCategories = await prisma.articleCategory.findMany({
    select: { id: true }, // 只选择 ID 字段
  });

  if (existingCategories.length === 0) {
    console.warn('Warning: No article categories found. Skipping article seeding. Please seed categories first.');
  } else {
    const categoryIds = existingCategories.map(cat => cat.id);
    const articlesData = [];
    const numberOfArticles = 23; // 要生成的文章数量

    for (let i = 1; i <= numberOfArticles; i++) {
      // 随机选择一个分类 ID
      const randomCategoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];

      articlesData.push({
        title: `文章标题 ${i}`,
        desc: `这是文章 ${i} 的简短描述。`,
        content: `这是文章 ${i} 的详细内容。\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        coverImage: `/images/article_cover_${i % 5 + 1}.jpg`, // 示例封面图片路径
        views: Math.floor(Math.random() * 1000), // 随机浏览次数
        link: `/articles/article-${i}`, // 示例链接
        articleCategoryId: randomCategoryId, // 关联到随机选择的分类
      });
    }

    // 2. 使用 createMany 插入文章数据
    try {
      const createdArticles = await prisma.article.createMany({
        data: articlesData,
        skipDuplicates: true, // 如果标题等有唯一约束，可以加上
      });
      console.log(`Created ${createdArticles.count} articles.`);
    } catch (error) {
      console.error("Error seeding articles:", error);
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error('Error in main seeding function:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });