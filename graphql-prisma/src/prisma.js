import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

// prisma.query.users(null, '{ id name posts { id title } }').then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.query.comments(null, '{ id text author { id name }}').then(comments => {
//   console.log(JSON.stringify(comments, undefined, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'GraphQL 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'cjq61a48d00210a48zrze4una'
//           }
//         }
//       }
//     },
//     '{ id title body published }'
//   )
//   .then(post => {
//     console.log(post);
//     prisma.query.users(null, '{ id name posts { id title } }').then(data => {
//       console.log(JSON.stringify(data, undefined, 2));
//     });
//   });

// cjq62veyo003f0a480s4rr7ts

prisma.mutation
  .updatePost(
    {
      where: {
        id: 'cjq62veyo003f0a480s4rr7ts'
      },
      data: {
        body: 'Rimma',
        published: true
      }
    },
    '{ id }'
  )
  .then(data => {
    console.log(JSON.stringify(data, undefined, 2));
    prisma.query.posts(null, '{ id title body published }').then(data => {
      console.log(JSON.stringify(data, undefined, 2));
    });
  });
