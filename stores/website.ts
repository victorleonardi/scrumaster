export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    usersReady: {} as Record<string, boolean>
  }),
  actions: {
    newReady(userToken: string) {
      this.usersReady[userToken] = true
    },

    waitAMinute(userToken: string) {
      this.usersReady[userToken] = false
    }
    // addOrUpdateSection(sectionId: string, userToken: string, voteValue: number) {
    //   this.sections[sectionId] ??= {}; // check if the section exists, if not create it
    //   this.sections[sectionId][userToken] = voteValue;
    // },
    // removeSection(sectionId: string) {
    //   delete this.sections[sectionId]
    // }
  }
})
