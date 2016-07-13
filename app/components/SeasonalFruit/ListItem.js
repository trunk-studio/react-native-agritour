import React, {
  PixelRatio,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
const StyleSheet = require('../../utils/F8StyleSheet');
const styles = StyleSheet.create({
  commentContent: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  pic: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    color: '#F08F74',
  },
});
export default function ListItem(props) {
  function onItemPress() {}
  return (
    <View style={styles.commentContent}>
      <Image source={{ uri: props.img }} style={ styles.pic } />
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}

ListItem.propTypes = {
  title: React.PropTypes.string,
  img: React.PropTypes.string,
  onItemPress: React.PropTypes.func,
};

ListItem.defaultProps = {
  title: '',
  img: 'https://unsplash.it/200/300/?random',
  onItemPress: () => {},
};
