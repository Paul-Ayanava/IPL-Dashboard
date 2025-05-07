export type NotificationType = 'wicket' | 'six';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}

export type ConnectionStatus = 
  | 'connecting' 
  | 'connected' 
  | 'disconnected' 
  | 'reconnecting' 
  | 'error';