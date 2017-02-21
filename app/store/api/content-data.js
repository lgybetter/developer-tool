import Vue from 'vue';
import Promise from 'bluebird';
import config from '../config';
import request from 'request';
const authUrl = `${config.bbcloudUrl}/api/auth`;
const commonUrl = `${config.bbcloudUrl}/api`;

export default {
  getContentsData(token, urlType) {
    let option = {
      url: `${authUrl}/${urlType}`,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      json: true
    }
    return new Promise((resolve, reject) => {
      request.get(option, (err, res, body) => {
        if(err) {
          return reject(err);
        }
        return resolve(body);
      });
    });
  }
}