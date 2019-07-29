import { prisma } from "../../../../generated/prisma-client";

export default {
  Query:{
    searchUser: async(_,args) => {
      const searchUsers = await prisma.users({
        where:{
          OR:
          [
            {
              username_contains: args.term
            },
            {
              firstname_contains: args.term
            },
            {
              lastname_contains: args.term
            }
          ]
        }
      })
      return searchUsers;
    }
  }
}