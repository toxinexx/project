type EventMap = Record<string, (...args: any[]) => void>;

export class EventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Set<T[keyof T]>>();

  on<K extends keyof T>(event: K, callback: T[K]): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event)?.add(callback);
    
    return () => this.off(event, callback);
  }

  off<K extends keyof T>(event: K, callback: T[K]): void {
    this.listeners.get(event)?.delete(callback);
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
    this.listeners.get(event)?.forEach(callback => {
      callback(...args);
    });
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}