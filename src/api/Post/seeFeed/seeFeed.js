import {
  checkUser
} from "../../../middlewares";
import {
  prisma
} from "../../../../generated/prisma-client";

checkUser
export default {
  Query: {
    seeFeed: async (_, __, {
      request
    }) => {
      checkUser(request);
      const {
        user
      } = request;
      const followings = await prisma.user({
        id: user.id
      }).following();
      return prisma.posts({
        where: {
          user: {
            id_in: [...followings.map(user => user.id), user.id]
          }
        },
        orderBy: 'caption_DESC'
      });
    }
  }
}