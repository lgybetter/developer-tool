import * as types from '../mutation-types';
import auth from '../api/auth';
import Promsie from 'Promise';
import resourceService from '../resource-service';

const state = {
  user:  {}
}

const getters = {
  user: state => state.user
}

const actions = {
  login({ commit }, body) { 
    return auth.login(body).then((user) => {
      commit(types.AUTH_LOGIN, { user });
      return Promise.resolve(user);
    }).catch(err => {
      console.log(err);
    })
  },
  signIn({ commit }, body) {
    return auth.signIn(body).then((user) => {
      console.log(user);
      commit(types.AUTH_SIGN_IN);
      return Promise.resolve(user);
    }).catch(err => {
      console.log(err);
    })
  },
}

const mutations = {
  [types.AUTH_LOGIN](state, { user }) {
    // settings.set('user', user).then(() => {      
    //   console.log(user);
    //   state.user = user;
    // });
  },

  [types.AUTH_SIGN_IN](state) {
    console.log('注册成功');
  },

  [types.AUTH_LOGOUT](state) {
    // settings.delete('user').then(() => {
    //   state.user = {}
    // });
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

