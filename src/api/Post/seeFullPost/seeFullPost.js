import {
  prisma
} from "../../../../generated/prisma-client";
import {
  POST_FRAGMENT
} from "../../../fragments";

export default {
  Query: {
    seeFullPost: (_, args) => {
      //postId
      const {
        id
      } = args;
      return prisma.post({
        id
      }).$fragment(POST_FRAGMENT);
    }
  }
}
// fullpost 는 이미 upload를 끝낸 다음에 실행되는 쿼리이므로 user, files를 post에서 찾을 수 있음.