import {
  checkUser
} from "../../../middlewares";
import {
  prisma
} from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, {
      request
    }) => {
      checkUser(request);
      const {
        user
      } = request;
      const posts = await prisma.user({
        id: user.id
      }).posts;
      const userPro = await prisma.user({
        id: user.id
      });
      return {
        posts,
        user: userPro
      };
    }
  },
  Post: {
    isLiked: (parent, _, {
      request
    }) => {
      const {
        id
      } = parent;
      const {
        user
      } = request;
      return prisma.$exists.like({
        AND: [{
          user: {
            id: user.id
          }
        }, {
          post: {
            id
          }
        }]
      })
    }
  }
}