import {
  checkUser
} from "../../../middlewares";
import {
  prisma
} from "../../../../generated/prisma-client";
import {
  ROOM_FRAGMENT
} from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, {
      request
    }) => {
      checkUser(request);
      const {
        roomId
      } = args;
      const {
        user
      } = request;
      const canSee = await prisma.$exists.room({
        participants_some: {
          id: user.id
        }
      });
      if (canSee) {
        return prisma.room({
          id: roomId
        }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("can't see Room");
      }
    }
  }
}