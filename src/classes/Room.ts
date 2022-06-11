export default class Room {
  id: number;
  roomTitle: string;
  privateRoom: boolean;
  history: any[];
  namespace?: string;
  constructor(
    roomId: number,
    roomTitle: string,
    privateRoom = false,
    namespace?: string
  ) {
    this.id = roomId;
    this.roomTitle = roomTitle;
    this.privateRoom = privateRoom;
    this.history = [];
    this.namespace = namespace;
  }
  addMessage(message: any) {
    this.history.push(message);
  }
  clearHistory() {
    this.history = [];
  }
}
