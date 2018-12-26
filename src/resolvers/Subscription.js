const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(i => i.id === postId && i.published);
      if (!post) {
        throw new Error('No post found');
      }
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post');
    }
  }
};

export default Subscription;
