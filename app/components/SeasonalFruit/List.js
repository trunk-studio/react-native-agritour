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
  const { title, listData, onItemPress } = props;
  return (
    <View style={styles.content}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.list}>
        {
          listData.map((item, i) => {
            const block = (
              <ListItem
                key={i}
                title={item.title}
                data={item.data}
                img={item.img}
                onItemPress={onItemPress}
              />
            );
            return block;
          })
        }
      </View>
    </View>
  );
}

SeasonalFruit.propTypes = {
  title: PropTypes.string,
  listData: PropTypes.array,
  onItemPress: PropTypes.func,
};

SeasonalFruit.defaultProps = {
  listData: [],
  onItemPress: () => {},
};
