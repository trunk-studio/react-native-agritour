import React, {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import NewsItem from './NewsItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultTxt: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  boardBar: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: '#359ac0',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default function NewsBoard(props) {
  const { listData, itemCount } = props;
  const listContainer = [];
  if (listData.length > 0) {
    listData.forEach((news, i) => {
      if (itemCount === 0 || i < itemCount) {
        listContainer.push(
          <NewsItem
            key={i}
            index={i}
            title={news.title}
            content={news.content}
            onItemPress={props.onItemPress}
          />
        );
      }
    });
  }
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={styles.boardBar}>{props.boardTitle}</Text>
      <ScrollView
        keyscrollEventThrottle={200}
        style={styles.container}
      >
        {listContainer.length > 0 ? listContainer : <Text style={styles.defaultTxt}>沒有資料囉！</Text>}
      </ScrollView>
    </View>
  );
}

NewsBoard.propTypes = {
  itemCount: React.PropTypes.number,
  listData: React.PropTypes.array,
  onItemPress: React.PropTypes.func,
  boardTitle: React.PropTypes.string,
};

NewsBoard.defaultProps = {
  listData: [],
  itemCount: 0,
  boardTitle: '',
};