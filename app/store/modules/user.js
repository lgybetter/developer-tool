import * as types from '../mutation-types';
import auth from '../api/auth';
import Promsie from 'bluebird';
import resourceService from '../resource-service'

const state = {
  user:  {}
}

const getters = {
  user: state => state.user
}

const actions = {
  login({ commit }, body) { 
    return auth.login(body).then(user => {
      Object.assign(user, body);
      commit(types.AUTH_LOGIN, user);
      return resourceService.post('user', user)
    }).catch(err => {
      console.log(err);
    })
  },
  logout({ commit }) {
    commit(types.AUTH_LOGOUT);
    return resourceService.remove('user', {}, { multi: true })
  },
  signIn({ commit }, body) {
    return auth.signIn(body).then(user => {
      commit(types.AUTH_SIGN_IN);
      return Promise.resolve(user);
    }).catch(err => {
      console.log(err);
    })
  },
  getUser({ commit }) {
    return Promise.resolve().then(() => {
      return resourceService.get('user', {}).then(users => {
        commit(types.GET_USER, users[0]);
        return Promise.resolve(users[0]);
      });
    }).catch(err => {
      console.log(err);
    })
  }
}

const mutations = {
  [types.AUTH_LOGIN](state, user) {
    state.user = user;
  },

  [types.AUTH_SIGN_IN](state) {
    console.log('注册成功');
  },

  [types.AUTH_LOGOUT](state) {
    state.user = {};
  },

  [types.GET_USER](state, user) {
    state.user = user;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

