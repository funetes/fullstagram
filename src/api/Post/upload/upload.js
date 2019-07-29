import {
  prisma
} from "../../../../generated/prisma-client";
import {
  checkUser
} from "../../../middlewares";
export default {
  Mutation: {
    upload: async (_, args, {
      request
    }) => {
      checkUser(request);
      const {
        caption,
        files,
        location,
        isLiked = false
      } = args;
      const {
        user
      } = request;
      const post = await prisma.createPost({
        location,
        caption,
        isLiked,
        user: {
          connect: {
            id: user.id
          }
        },
        // files:{
        //   connect:{

        //   }
        // }
        // file을 만들지 않고 post를 만든 상태에서 file table과 connect
      });
      files.forEach(async file => {
        await prisma.createFile({
          url: file,
          post: {
            connect: {
              id: post.id
            }
          }
        })
      });
      return post;
    }
  }
}