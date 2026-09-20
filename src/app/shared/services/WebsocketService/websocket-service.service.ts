import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketServiceService {
  private ws!: WebSocket;
  public messages$ = new Subject<any>();

  connect() {
    const url = `wss://api.styx.classicfashion.com/api/websocket`;
    this.ws = new WebSocket(url);

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      this.messages$.next(data);
    };
  }
  connectRelax() {
    const url = `ws://localhost:3017/api/fr`;
    this.ws = new WebSocket(url);

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      this.messages$.next(data);
    };
  }
}
