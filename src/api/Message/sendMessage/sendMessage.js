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
  Mutation: {
    sendMessage: async (_, args, {
      request
    }) => {
      checkUser(request);
      const {
        user
      } = request;
      const {
        roomId,
        message,
        toId
      } = args;
      let room;
      if (roomId === undefined) {
        //createRoom
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [{
                id: toId
              }, {
                id: user.id
              }]
            }
          }).$fragment(ROOM_FRAGMENT);
        }
      } else {
        // room already exist
        room = await prisma.room({
          id: roomId
        }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("room not found");
      }
      const getTo = room.participants.filter(participant =>
        participant.id !== user.id)[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            // roomId 가 있는 경우는 toId가 없고 toId가 있는경우는 roomId가 없다.
            id: toId ? toId : getTo.id
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      })
    }
  }
}