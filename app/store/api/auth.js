import Vue from 'vue';
import Promise from 'bluebird';
import config from '../config';
import request from 'request';
const commonUrl = `${config.bbcloudUrl}/api`;

export default {
  login(body) {
    let option = {
      url: `${commonUrl}/developer/auth/login`,
      body: body,
      json: true
    }
    return new Promise((resolve, reject) => {
      request.post(option, (err, res, body) => {
        if(err) {
          return reject(err);
        }
        return resolve(body);
      });
    });
  },
  signIn(body) {
    let option = {
      url: `${commonUrl}/developer/auth/signIn`,
      body: body,
      json: true
    }
    return new Promise((resolve, reject) => {
      request.post(option, (err, res, body) => {
        if(err) {
          return reject(err);
        }
        return resolve(body);
      });
    });
  }
}