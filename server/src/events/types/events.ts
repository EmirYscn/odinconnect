import { Post } from '@prisma/client';

export interface ServerToClientEvents {
  'message:received': (data: any) => void;
  'post:created': (data: Post) => void;
}

export interface ClientToServerEvents {
  'message:send': (data: any) => void;
}
