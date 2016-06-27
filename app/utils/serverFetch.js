import { NetInfo } from 'react-native';
import config from '../config/';

export async function fetchFromServer(method = 'get', type = null, data = null) {
  const isConnected = await NetInfo.isConnected.fetch();
  if (!isConnected) {
    return () => {};
  }
  const url = `http://${config.server}/rest/app/${config.appId}/${type}`;
  const requestOption = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  };
  let responseJson = null;
  try {
    const response = await fetch(url, requestOption);
    responseJson = await response.json();
    console.log(' ===== Request Sucessed =====>', responseJson);
    if (!responseJson.result) {
      if (config.envMode !== 'production') {
        console.log(' ===== Request Failed =====>', responseJson);
      }
      throw new Error(JSON.stringify(responseJson));
    }
    return responseJson.result;
  } catch (e) {
    console.log('error=>', e);
    throw e;
  }
}
