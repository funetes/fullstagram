export const checkUser = (request) => {
  if(!request.user){
    throw Error('invalid user');
  }
  return;
}