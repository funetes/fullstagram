import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    userById: (_, args) => {
      console.log(_,args);
      const { id } = args;
      return prisma.user({ id });
    }
  }
}