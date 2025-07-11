export type MediaType = "IMAGE" | "VIDEO" | "AUDIO";

export interface Media {
  readonly id: string;
  url: string;
  type: MediaType;

  readonly createdAt: string;
  readonly updatedAt: string;

  readonly postId: string;
  post: Post;

  readonly userId: string;
  user: User;
}

export interface Like {
  readonly id: string;
  readonly createdAt: string;

  userId: string;
  user: User;

  postId?: string | null;
  post?: Post | null;

  commentId?: string | null;
  comment?: Comment | null;
}

export interface Comment {
  readonly id: string;
  content: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  postId: string;
  post: Post;

  authorId: string;
  author: User;

  parentId?: string | null;
  parent?: Comment | null;

  replies: Comment[];
  likes: Like[];
}

export interface Post {
  readonly id: string;
  content: string;

  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;

  published: boolean;
  readonly userId: string;

  user: User;
  medias: Media[];
  comments: Comment[];
  likes: Like[];
}

export interface UserSettings {
  readonly id: string;
  notifications: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly userId: string;
}

export interface Profile {
  readonly id: string;
  bio: string; // User's bio
  location: string; // User's location
  website: string; // User's personal website or blog

  readonly createdAt: string;
  readonly updatedAt: string;

  user: User;
}

export interface User {
  readonly id: string;
  email: string;
  displayName?: string | null; // User's display name
  username: string;
  password?: string | null;
  avatar?: string | null;

  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
  readonly resetPasswordToken?: string | null;
  readonly resetPasswordExpires?: string | null;

  posts: Post[];
  likes: Like[];
  comments: Comment[];
  medias: Media[];
  profile?: Profile | null;
  following: UserFollowing[];
  followers: UserFollowing[];
  blockedUsers: UserBlocked[];
  blockedBy: UserBlocked[];
  userSettings?: UserSettings | null;

  _count?: {
    posts?: number;
    following?: number;
    followers?: number;
  };
}

export interface UserFollowing {
  readonly id: string;
  followerId: string;
  followingId: string;

  readonly createdAt: string;
  readonly updatedAt: string;

  follower: User;
  following: User;
}

export interface UserBlocked {
  readonly id: string;
  userId: string;
  blockedUserId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  user: User;
  blockedUser: User;
}

export interface ServerToClientEvents {
  "message:received": (data: any) => void;
  "post:created": (data: Post) => void;
}

export interface ClientToServerEvents {
  "message:send": (data: any) => void;
}
