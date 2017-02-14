import * as types from '../mutation-types';
import settings from 'electron-settings';


const state = {
  user:  settings.get('user') || {}
}

const mutations = {
  [types.AUTH_LOGIN](state, { user }) {
    settings.set('user', user).then(() => {      
      console.log(user);
      state.user = user;
    });
  },

  [types.AUTH_SIGN_IN](state) {
    console.log('注册成功');
  },

  [types.AUTH_LOGOUT](state) {
    settings.delete('user').then(() => {
      state.user = {}
    });
  }
}

export default {
  state,
  mutations
}

