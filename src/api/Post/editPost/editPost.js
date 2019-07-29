import {
  prisma
} from "../../../../generated/prisma-client";
import {
  checkUser
} from "../../../middlewares";
const EDIT = "EDIT";
const DELETE = "DELETE";
// edit means "edit" or "delete"

export default {
  Mutation: {
    editPost: async (_, args, {
      request
    }) => {
      checkUser(request);
      const {
        user
      } = request;
      const {
        id,
        location,
        caption,
        action
      } = args;

      //내가 쓴 Post이면 수정가능
      const post = await prisma.$exists.post({
        id,
        user: {
          id: user.id
        }
      });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: {
              location,
              caption
            },
            where: {
              id
            }
          });
        } else if (action === DELETE) {
          // deletepost
          // need to cascading
          return prisma.deletePost({
            id
          });
        }
      } else {
        throw Error("you can't edit it");
      }

    }
  }
}