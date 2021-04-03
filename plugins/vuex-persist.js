import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    restoreState: (key, storage) => {
      const vuex = storage?.getItem(key) || '{}'
      return JSON.parse(vuex)
    },
  }).plugin(store)
}
