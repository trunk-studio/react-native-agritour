import React, {
  Component,
  Dimensions,
  View,
  Linking,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
import Filter from '../components/Filter/FilterContainer';
import activityData from '../src/activity.json';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestNews, requestFilterArea, requestFilterType } from '../actions/SearchActions';
import { requestToday } from '../actions/DateActions';
import { requestWeather } from '../actions/WeatherActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { requestSetLocation } from '../actions/GeoActions';

const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 50,
    ios: {
      // marginTop: 21,
    },
  },
  container: {
    backgroundColor: '#fff',
    position: 'relative',
    top: 0,
    marginTop: -50,
    height: 150,
    android: {
      marginBottom: 15,
    },
  },
  searchIcon: {
    color: '#fff',
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    lineHeight: 15,
    fontSize: 20,
  },
  searchContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  searchBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#F08F74',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    paddingTop: 180,
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    ios: {
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowColor: 'black',
      shadowOpacity: 1.0,
    },
  },
  coverBottom: {
    width: windowSize.width,
    height: 60,
    position: 'relative',
    top: -30,
  },
  versionBlock: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    padding: 2,
  },
  imgSrcText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#555',
    fontStyle: 'italic',
    ios: {
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: 'black',
      shadowOpacity: 1.0,
    },
  },
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaId: 0,
      typeId: 0,
    };
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    const { countryName, locationName } = nextProps;
    if (locationName !== undefined && locationName !== this.props.locationName) {
      this.props.requestWeather({ name: locationName, country: countryName });
    }
  }
  areaOnChange = (id) => {
    // this.props.requestFilterArea(id);
    this.setState({
      areaId: id,
    });
  };
  typeOnChange = (id) => {
    // this.props.requestFilterType(id);
    this.setState({
      typeId: id,
    });
  };
  onSearchHandle = () => {
    this.props.requestFilterArea(this.state.areaId);
    this.props.requestFilterType(this.state.typeId);
    Actions.tabList();
  };
  render() {
    function onListItemPress(detail) {
      const url = activityData.list[detail.index].url;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    }
    let activityListData = [];
    for (const item of activityData.list) {
      activityListData.push({
        title: item.title,
        content: item.description,
      });
    }
    const area = [
      { title: '全部區域' },
      { title: '北部' },
      { title: '中部' },
      { title: '南部' },
      { title: '東部' },
    ];
    const type = [
      { title: '全部種類' },
      { title: '採　果' },
      { title: '用　餐' }, // 不要加 width 避免 large font 被強迫換行
      { title: '遊　玩' },
    ];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Filter
          title={'類型'}
          dataList={type}
          active={this.state.typeId}
          onChange={this.typeOnChange}
          activeColor={'#F08F74'}
        />
        <Filter
          title={'區域'}
          dataList={area}
          active={this.state.areaId}
          onChange={this.areaOnChange}
          activeColor={'#FDB76F'}
        />
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={this.onSearchHandle}>
            <Icon allowFontScaling={false} name={'search'} style={ styles.searchIcon } />
            <Text allowFontScaling={false} style={styles.searchText}>選 擇 主 題</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Dashboard.propTypes = {
  onListItemPress: React.PropTypes.func,
  requestNews: React.PropTypes.func,
  requestSearchPost: React.PropTypes.func,
  requestToday: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
  requestWeather: React.PropTypes.func,
  uri: React.PropTypes.string,
  month: React.PropTypes.number,
  date: React.PropTypes.number,
  weekday: React.PropTypes.string,
  desc: React.PropTypes.string,
  iconId: React.PropTypes.string,
  listData: React.PropTypes.array,
  temp: React.PropTypes.number,
  countryName: React.PropTypes.string,
  locationName: React.PropTypes.string,
  requestFilterType: React.PropTypes.func,
  requestFilterArea: React.PropTypes.func,
  typeIndex: React.PropTypes.number,
  areaIndex: React.PropTypes.number,
};

Dashboard.defaultProps = {
  onListItemPress: null,
  requestNews: null,
  requestSearchPost: null,
  requestToday: null,
  requestSetLocation: null,
  requestWeather: null,
  month: 1,
  date: 1,
  requestFilterType: null,
  requestFilterArea: null,
};

function _injectPropsFromStore(state) {
  return {
    listData: state.search.newsList,
    month: state.getToday.month,
    date: state.getToday.date,
    weekday: state.getToday.weekday,
    desc: state.weather.desc,
    iconId: state.weather.iconId,
    countryName: state.geo.countryName,
    locationName: state.geo.locationName,
    temp: state.weather.temp,
    typeIndex: state.search.typeIndex,
    areaIndex: state.search.areaIndex,
  };
}

const _injectPropsFormActions = {
  requestNews,
  requestToday,
  requestSetLocation,
  requestWeather,
  requestFilterArea,
  requestFilterType,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Dashboard);
