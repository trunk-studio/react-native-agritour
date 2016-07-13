import React, { View, PropTypes, Text } from 'react-native';
import ListItem from './ListItem';
const StyleSheet = require('../../utils/F8StyleSheet');
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    position: 'relative',
    top: 0,
    marginTop: -50,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    android: {
      height: 180,
    }
  },
  list: {
    flexDirection: 'row',
    android: {
      marginBottom: 15,
    },
  },
  text: {
    color: '#F08F74',
  },
});

export default function SeasonalFruit(props) {
  const { listData } = props;
  return (
    <View style={styles.content}>
      <Text style={styles.text}>當季盛產水果</Text>
      <View style={styles.list}>
        {
          listData.map(function(item, i) {
            return (
              <ListItem
                key={i}
                title={item.title}
                img={item.img}
              />
            );
          })
        }
      </View>
    </View>
  );
}

SeasonalFruit.propTypes = {
  listData: PropTypes.array,
  onItemPress: PropTypes.func,
};

SeasonalFruit.defaultProps = {
  listData: [],
  onItemPress: () => {},
};
