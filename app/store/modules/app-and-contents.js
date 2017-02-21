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
  getContentData({ commit }, token, dataType, urlType) {
    return contentData.getContentsData(token, urlType).then(datas => {
      commit(types.GET_CONTENT_DATA, datas, dataType)
      return Promise.resolve(datas)
    }).catch(err => {
      console.log(err);
    })
  }
}

const mutations = {
  [types.GET_CONTENT_DATA](state, datas, dataType) {
    state[dataType] = datas;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}