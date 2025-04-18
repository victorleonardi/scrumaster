export enum SocketEvent {
  isReady = 'isReady',
  allReady = 'allReady',

  joinProject = 'joinProject',
  leaveProject = 'leaveProject',

  newUser = 'newUser',
  userLeft = 'userLeft',
  updateUsersInRoom = 'updateUsersInRoom',

  vote = 'vote',
}