export enum SocketEvent {
  isReady = 'isReady',
  newVote = 'newVote',
  joinProject = 'joinProject', // would be the same as joinRoom. Later, create an event to leaveRoom
  leaveProject = 'leaveProject',
  updateUsers = 'updateUsers',
}