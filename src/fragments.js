export const USER_FRAGMENT = `
    id
    username
    avatar
`;
export const FILE_FRAGMENT = `
    id
    url
`;
export const COMMENT_FRAGMENT = `
    id
    text
    user{
      ${USER_FRAGMENT}
    }
`;
export const MESSAGE_FRAGMENT = `
  id
  text
  to{
    ${USER_FRAGMENT}
  }
  from{
    ${USER_FRAGMENT}
  }
`;
export const POST_FRAGMENT = `
  fragment PostParts on Post{
    id
    location
    caption
    user{
      ${USER_FRAGMENT}
    }
    files{
      ${FILE_FRAGMENT}
    }
    comments{
      ${COMMENT_FRAGMENT}
    }
  }
`;
export const ROOM_FRAGMENT = `
  fragment RoomParts on Room{
    id
    participants{
      id
      ${USER_FRAGMENT}
    }
    messages{
      ${MESSAGE_FRAGMENT}
    }
  }
`;