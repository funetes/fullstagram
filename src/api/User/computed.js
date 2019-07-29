import {
  prisma
} from "../../../generated/prisma-client";

// find server , not db  (this is computed field)
/* 
  how to use 

  {
    me{
      user(this is parent of fullname){
        fullname
      }
    }
  }
*/

// using parent 
/**
 * call that parent resolver (in this case , user (25line))
 * 48line user = 25line user(returned)
 */

export default {
  User: {
    fullname: parent => {
      return `${parent.firstname} ${parent.lastname}`
    },
    isFollowing: (parent, _, {
      request
    }) => {
      const {
        id: parentId
      } = parent;
      const {
        user
      } = request;
      return prisma.$exists.user({
        AND: [{
          id: user.id
        }, {
          following_some: {
            id: parentId
          }
        }]
      });
    },
    isSelf: (parent, _, {
      request
    }) => {
      const {
        id: parentId
      } = parent;
      const {
        user
      } = request;
      return parentId === user.id;

    }

  }
}