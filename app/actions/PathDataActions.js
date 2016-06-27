import { checkIsFav, getFavList } from '../actions/FavoriteActions';
import { fetchFromServer } from '../utils/serverFetch';
import pathListData from '../json/data';
export const UPDATE_PATH_LIST = 'UPDATE_PATH_LIST';

function updatePathList(data) {
  return {
    type: UPDATE_PATH_LIST,
    data,
  };
}

export async function requestPathData() {
  const fetchData = await fetchFromServer('get', 'content');
  console.log('fetchData=>', fetchData);
  let listData = pathListData;

  if (pathListData !== fetchData.list) {
    listData = fetchData.list;
    console.log('update content');
  }

  const favoriteList = await getFavList();
  const amount = favoriteList.length;
  let count = 0;
  for (const item of listData) {
    if (favoriteList.indexOf(item.id) >= 0) {
      item.isFav = true;
      count += 1;
    } else {
      item.isFav = false;
    }
    if (count >= amount) {
      break;
    }
  }
  return (dispatch) => {
    dispatch(updatePathList(listData));
  };
}
