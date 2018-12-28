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

prisma.exists
  .Comment({
    id: 'cjq61fyd7002e0a482mehdrw9'
  })
  .then(exists => console.log(exists));

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({ id: authorId });

  if (!userExists) {
    throw new Error('User not found');
  }

  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    '{ author { id name email posts { id title published } } }'
  );
  return post.author;
};

const updatePostForUser = async (postId, data) => {
  const postExists = prisma.exists.Post({ id: postId });
  if (!postExists) throw new Error('No Post Exists');
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data
    },
    '{ author { id name email posts { id title published } } }'
  );
  return post.author;
};

updatePostForUser('cjq7gfedm00590a48yl4r4otx', { published: false })
  .then(user => console.log(JSON.stringify(user, undefined, 2)))
  .catch(err => console.log(err));

// createPostForUser('cjq60jjbj000y0a48s8ga9sah', {
//   title: 'Great books to read',
//   body: 'The war of art',
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch(err => console.log(err));
