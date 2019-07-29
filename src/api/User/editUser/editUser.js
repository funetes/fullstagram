import { checkUser } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation : {
    editUser : async (_,args,{request}) => {
      checkUser(request);
      const {username,email,firstname,lastname,bio} = args;
      const { user } = request;
      const editUser = await prisma.updateUser({
        where:
        {
          id:user.id
        }, 
        data:
        {
          username,
          email,
          firstname,
          lastname,
          bio
        }
      });
      return editUser;
    }
  }
}