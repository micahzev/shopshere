import * as types from '../constants/ActionTypes';
import fakeShopsAPI from '~/src/tests/fakeShopsAPI';
import { apiClient } from '../services/ApiClient.js';
import request from 'superagent';
import config from '../config';

//action creators:
export function addShop(data) {

  //const request = superagent;
  request.post('https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/shop/')
    .set('Access-Control-Allow-Header', '*')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', '*')
    .set('Access-Control-Allow-Credentials', true)
    .set('Content-Type', 'text/plain')
    .send(data.name)
    .end(function(err, res){
     if (err || !res.ok) {
       alert('Oh no! error');
     } else {
       alert('yay got ' + JSON.stringify(res.body));
     }
   })

  return {
    type: types.ADD_SHOP,
    name: data.name,
  }
};

export function fetchShops(options) {
  return {
    type: types.FETCH_SHOPS,
    payload: {
      promise: fakeShopsAPI()
    }
  }
};


function settingsSet(dataName) {
  return {    
  "async": true,
  "crossDomain": true,
  "url": "https://mt59tak7h6.execute-api.us-east-1.amazonaws.com/dev/shop/",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache"
  },
  "processData": false,
  "data": "{ \"name\" : \"dataName\" }"
  }
}

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return config.apiProtocol + '://' + config.apiHost + ':' + config.apiPort + '/v1' + adjustedPath;
}