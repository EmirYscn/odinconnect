import { Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './types/events';
import { SocketAuthMiddleware } from 'src/auth/middlewares/ws.middleware';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedSocket } from './types/socket';
import {
  handleUserSocketMappingOnConnnect,
  handleUserSocketMappingOnDisconnect,
  userSocketMap,
} from './utils/UserSocketsMapping';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
@UseGuards(WsJwtGuard)
export class EventsGateway implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  @WebSocketServer()
  private server: Server<ClientToServerEvents, ServerToClientEvents>;

  afterInit(server: Server) {
    server.use(SocketAuthMiddleware(this.jwtService, this.usersService));
    Logger.log('WebSocket server initialized');
  }

  onModuleInit() {
    this.server.on('connection', (socket: AuthenticatedSocket) => {
      // handle user socket mapping
      handleUserSocketMappingOnConnnect(socket, socket.user);

      socket.on('disconnect', () => {
        handleUserSocketMappingOnDisconnect(socket, socket.user);
      });
    });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: string) {
    console.log(payload);
    this.server.emit('message:received', `Message: ${payload} received`);
  }

  sendMessage(message: string) {
    this.server.emit('message:received', message);
  }

  broadcastToAll<E extends keyof ServerToClientEvents>(
    event: E,
    ...args: Parameters<ServerToClientEvents[E]>
  ) {
    this.server.emit(event, ...args);
  }

  broadcastToRoom<E extends keyof ServerToClientEvents>(
    room: string,
    event: E,
    ...args: Parameters<ServerToClientEvents[E]>
  ) {
    this.server.to(room).emit(event, ...args);
  }

  broadcastToUser<E extends keyof ServerToClientEvents>(
    userId: string,
    event: E,
    ...args: Parameters<ServerToClientEvents[E]>
  ) {
    const socketIds = userSocketMap.get(userId);
    if (!socketIds) return;
    for (const socketId of socketIds) {
      this.server.to(socketId).emit(event, ...args);
    }
  }
}
