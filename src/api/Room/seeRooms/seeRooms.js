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
    seeRooms: (_, __, {
      request
    }) => {
      checkUser(request);
      const {
        user
      } = request;
      return prisma.rooms({
        where: {
          participants_some: {
            id: user.id
          }
        }
      }).$fragment(ROOM_FRAGMENT);
    }
  }
}