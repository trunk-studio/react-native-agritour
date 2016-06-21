import React, {
  Component,
  ScrollView,
  Image,
  View,
  Text,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestPathData } from '../actions/PathDataActions';
import { checkIsFav, requestRemoveFavorite } from '../actions/FavoriteActions';
import SwipeOut from 'react-native-swipeout';
import ListItem from '../components/PostList/ListItem';
import Share from 'react-native-share';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const StyleSheet = require('../utils/F8StyleSheet');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  picContainer: {
    paddingTop: 100,
    flex: 0.8,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textNoFavItem: {
    marginTop: 50,
    color: '#666',
  },
});


export default class MyFavorite extends Component {

  componentWillMount() {
    this.props.requestPathData();
  }

  onListItemPress = (rowData) => {
    const pageTitle = rowData.title;
    const newDate = {
      ...rowData,
      title: pageTitle,
      postTitle: rowData.title,
    };
    Actions.favPostDetail(newDate);
  }

  render() {
    const ListItemArray = [];
    const favoriteList = [];
    for (const item of this.props.pathList) {
      if (item.isFav) {
        favoriteList.push(item);
      }
    }
    let rowIndex = 0;
    for (const rowData of favoriteList) {
      let bakColor = {};
      if (rowIndex % 2 === 0) {
        bakColor = { backgroundColor: 'rgb(255, 255, 255)' };
      } else {
        bakColor = { backgroundColor: 'rgb(246, 246, 246)' };
      }
      rowIndex += 1;

      let tagColor;
      switch (rowData.status) {
        case '全線封閉':
          tagColor = 'rgba(213, 64, 64, .8)';
          break;
        case '部分封閉':
          tagColor = 'rgb(221, 105, 49)';
          break;
        case '注意':
          tagColor = '#D9CE3E';
          break;
        default:
          tagColor = 'rgba(0,0,0,0)';
          break;
      }

      const swipeoutBtns = [
        {
          text: '取消收藏',
          backgroundColor: 'rgba(213, 64, 64, .8)',
          onPress: this.props.requestRemoveFavorite.bind(this, rowData.id),
        },
        {
          text: '分享',
          backgroundColor: 'rgba(79, 164, 89, .8)',
          onPress: () => {
            let downloadUrl;
            if (Platform.OS === 'ios') {
              downloadUrl = 'https://appsto.re/tw/F5Xwcb.i';
            } else {
              downloadUrl = 'https://play.google.com/store/apps/details?id=com.trunksys.agritour';
            }
            Share.open({
              share_text: `嘿！我發現 ${rowData.title} 感覺不錯，週末我們一起去看看吧！`,
              share_URL: downloadUrl,
              title: '採果小旅行',
            }, (e) => {
              console.log(e);
            });
          },
        },
      ];

      ListItemArray.push(
        <SwipeOut right={swipeoutBtns} autoClose key={rowData.id}>
          <ListItem
            id={rowData.id}
            index={rowData.index}
            title={rowData.title}
            img={rowData.cover}
            place={rowData.place}
            status={rowData.status}
            tagColor={tagColor}
            level={rowData.level}
            detail_02={rowData.detail_02}
            onItemPress={this.onListItemPress.bind(this, rowData)}
            bakColor={bakColor}
            rightText={''}
          />
        </SwipeOut>
      );
    }

    render = () => {
      let view = [];
      if (ListItemArray.length > 0) {
        view = (
        <ScrollView style={styles.content}>
          { ListItemArray }
        </ScrollView>);
      } else if ( this.props.pathList !== 'null' ) {
        view = (
        <ScrollView style={styles.content}>
          <View style={styles.picContainer}>
            <FontAwesomeIcon
              name="gratipay"
              size={70}
              color={'#666'}
            />
          <Text allowFontScaling={false} style={styles.textNoFavItem}>
            目前您沒有收藏任何地點 :p
          </Text>
          </View>
        </ScrollView>);
      } else {
        view = <View />;
      }
      return view;
    }
    return (
      render()
    );
  }
}

MyFavorite.propTypes = {
  requestRemoveFavorite: React.PropTypes.func,
  onListItemPress: React.PropTypes.func,
  requestPathData: React.PropTypes.func,
  pathList: React.PropTypes.array,
};

MyFavorite.defaultProps = {
  pathList: 'null',
};

function _injectPropsFromStore(state) {
  return {
    pathList: state.pathList,
  };
}

const _injectPropsFormActions = {
  checkIsFav,
  requestRemoveFavorite,
  requestPathData,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(MyFavorite);
