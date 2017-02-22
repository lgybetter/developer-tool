import * as types from '../mutation-types';
import contentData from '../api/content-data'
import Promise from 'bluebird';

const state = {
  models: [],
  professionTags: [],
  contentTags: [],
  appAndContentCategory: [],
  ageCategory: [],
  tagCategory: [],
  abilityTags: []
}

const getters = {
  models: state => state.models,
  professionTags: state => state.professionTags,
  contentTags: state => state.contentTags,
  appAndContentCategory: state => state.appAndContentCategory,
  ageCategory: state => state.ageCategory,
  tagCategory: state => state.tagCategory,
  abilityTags: state => state.abilityTags
}

const actions = {
  getContentData({ commit }, args) {
    return contentData.getContentsData(args.token, args.urlType).then(datas => {
      commit(types.GET_CONTENT_DATA, { datas: datas, dataType: args.dataType })
      return Promise.resolve(datas)
    }).catch(err => {
      console.log(err);
    })
  }
}

const mutations = {
  [types.GET_CONTENT_DATA](state, args) {
    state[args.dataType] = args.datas;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}