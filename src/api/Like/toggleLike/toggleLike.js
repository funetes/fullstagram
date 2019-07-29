import { prisma } from "../../../../generated/prisma-client";
import { checkUser } from '../../../middlewares';

export default {
  Mutation : {
    toggleLike : async (_,args,{request}) => {
      checkUser(request);
      const {user} = request;
      const {postId} = args;
      const filterOptions = {
        AND:[
          {
            user:{
              id:user.id
            }
          },
          {
            post:{
              id:postId
            }
          }
        ]
      }
      try{
        const isLike = await prisma.$exists.like(filterOptions);
        if(isLike){
          await prisma.deleteManyLikes(filterOptions);
        }else{
          await prisma.createLike(
            {
              user:{
                connect:{
                  id:user.id
                }
              },
              post:{
                connect:{
                  id:postId
                }
              }
            }
          );
        }
        return true;
      }catch{
        return false;
      }
    }
  }
}