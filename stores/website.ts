import type { User } from "@prisma/client"

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    currentVotingSection: 0 as Number,
    users: [] as string[],
    usersReady: {} as Record<string, boolean>
  }),
  actions: {
    setCurrentVotingSection(votingSectionId: Number) {
      this.currentVotingSection = votingSectionId
    },

    newReady(userToken: string) {
      this.usersReady[userToken] = true
    },

    waitAMinute(userToken: string) {
      this.usersReady[userToken] = false
    },

    addUser(userToken: string) {
      if (this.users.includes(userToken)) return
      this.users.push(userToken)
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
