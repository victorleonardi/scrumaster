export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    sections: {}
  }),
  actions: {
    addOrUpdateSection(sectionId: string, userToken: string, voteValue: number) {
      this.sections[section.id][userToken] = voteValue,
    },
    removeSection(sectionId: string) {
      delete this.sections[sectionId]
    }
  }
})
