export type MediaType = "IMAGE" | "VIDEO" | "AUDIO";

export interface Media {
  readonly id: string;
  url: string;
  type: MediaType;

  readonly createdAt: string;
  readonly updatedAt: string;

  readonly postId: string;
  post: Post;
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
}

export interface UserSettings {
  readonly id: string;
  notifications: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly userId: string;
}

export interface User {
  readonly id: string;
  email: string;
  username: string;
  password?: string | null;
  avatar?: string | null;

  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
  readonly resetPasswordToken?: string | null;
  readonly resetPasswordExpires?: string | null;

  posts: Post[];
  following: UserFollowing[];
  followers: UserFollowing[];
  blockedUsers: UserBlocked[];
  blockedBy: UserBlocked[];
  userSettings?: UserSettings | null;
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
