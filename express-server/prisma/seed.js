const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const categoriesData = [
    {
      name: '技术分享',
      desc: '各类编程技术、框架、工具的分享',
      content: '深入探讨最新的技术趋势和最佳实践。',
    },
    {
      name: '生活随笔',
      desc: '记录生活点滴，分享感悟',
      content: '一些关于日常生活的思考和记录。',
      // img is optional, can be null or omitted
    },
    {
      name: '项目展示',
      desc: '展示个人或团队完成的项目',
      content: '这里是我们引以为傲的项目成果。',
    },
    {
      name: '学习笔记',
      desc: '记录学习过程中的笔记和总结',
      // content is optional
    },
    {
      name: '行业资讯',
      desc: '关注行业动态，分享最新资讯',
      content: '保持对行业前沿信息的关注。',
    },
    {
      name: '资源推荐',
      desc: '推荐有用的工具、网站或书籍',
      content: '分享那些提升效率和知识的宝藏资源。',
      // img is optional
    },
  ];

  // 使用 createMany 插入数据
  const createdCategories = await prisma.articleCategory.createMany({
    data: categoriesData,
    skipDuplicates: true, // 如果你想避免因唯一约束（例如 name）而失败，可以加上这个，但 ArticleCategory 目前没有唯一约束（除了id）
  });

  console.log(`Created ${createdCategories.count} categories.`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });