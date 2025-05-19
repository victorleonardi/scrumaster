export enum SocketEvent {
  isReady = 'isReady',
  allReady = 'allReady',

  repeatVoting = 'repeatVoting',
  nextVotingSection = 'nextVotingSection',
  startNewVoting = 'startNewVoting',

  joinProject = 'joinProject',
  leaveProject = 'leaveProject',

  newUser = 'newUser',
  userLeft = 'userLeft',
  updateUsersInRoom = 'updateUsersInRoom',
  updateUserState = 'updateUserState',

  getCurrentVotingSection = 'getCurrentVotingSection',
  vote = 'vote',
}