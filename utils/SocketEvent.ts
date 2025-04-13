export enum SocketEvent {
  isReady = 'isReady',
  allReady = 'allReady',

  joinProject = 'joinProject',
  leaveProject = 'leaveProject',

  newUser = 'newUser',
  updateUsersInRoom = 'updateUsersInRoom',

  vote = 'vote',
}