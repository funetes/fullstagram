import {
  prisma
} from '../../../../generated/prisma-client'
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        username,
        email,
        firstname = "",
        lastname = "",
        bio = "",
        avatar
      } = args;
      const user = await prisma.createUser({
        username,
        email,
        firstname,
        lastname,
        bio,
        avatar
      });
      return user;
    }
  }
}