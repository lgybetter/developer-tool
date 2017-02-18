import * as types from '../mutation-types';
import auth from '../api/auth';
import Promsie from 'Promise';
import electron from 'electron';
const ipcRenderer = electron.ipcRenderer;

const state = {
  user:  {}
}

const getters = {
  user: state => state.user
}

const actions = {
  login({ commit }, body) { 
    return auth.login(body).then((user) => {
      console.log(user);
      ipcRenderer.send('find-user');
      commit(types.AUTH_LOGIN, { user });
      return Promise.resolve(user);
    }).catch(err => {
      console.log(err);
    })
  },
  signIn({ commit }, body) {
    return auth.signIn(body).then((user) => {
      console.log(user);
      ipcRenderer.send('find-user');
      commit(types.AUTH_SIGN_IN);
      return Promise.resolve(user);
    }).catch(err => {
      console.log(err);
    })
  },
}

const mutations = {
  [types.AUTH_LOGIN](state, { user }) {
    state.user = user;
  },

  [types.AUTH_SIGN_IN](state) {
    console.log('注册成功');
  },

  [types.AUTH_LOGOUT](state) {
    state.user = {};
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

