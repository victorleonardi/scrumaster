export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    sections: {} as Record<string, Record<string, number>>
  }),
  actions: {
    addOrUpdateSection(sectionId: string, userToken: string, voteValue: number) {
      this.sections[sectionId] ??= {}; // check if the section exists, if not create it
      this.sections[sectionId][userToken] = voteValue;
    },
    removeSection(sectionId: string) {
      delete this.sections[sectionId]
    }
  }
})
