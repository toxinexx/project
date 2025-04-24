import { EventEmitter } from '../utils/EventEmitter';

interface TwilioConnectionEvents {
  accept: () => void;
  disconnect: () => void;
  error: (error: Error) => void;
  reject: () => void;
}

export class TwilioConnection extends EventEmitter<TwilioConnectionEvents> {
  private isDevelopment = import.meta.env.DEV;
  private status: 'pending' | 'connected' | 'disconnected' = 'pending';
  private direction: 'incoming' | 'outgoing' = 'incoming';

  accept(): void {
    if (this.isDevelopment) {
      console.log('Development mode: Accepting call');
      this.status = 'connected';
      this.emit('accept');
      return;
    }

    // In production, this would accept the actual call
  }

  reject(): void {
    if (this.isDevelopment) {
      console.log('Development mode: Rejecting call');
      this.status = 'disconnected';
      this.emit('reject');
      return;
    }

    // In production, this would reject the actual call
  }

  disconnect(): void {
    if (this.isDevelopment) {
      console.log('Development mode: Disconnecting call');
      this.status = 'disconnected';
      this.emit('disconnect');
      return;
    }

    // In production, this would disconnect the actual call
  }

  getStatus(): string {
    return this.status;
  }

  getDirection(): string {
    return this.direction;
  }
}