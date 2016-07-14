import React, {
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
  function onItemPress() {
    console.log('ListItem onItemPress & props.data=>', props.data);
    props.onItemPress(props.data);
  }
  return (
    <TouchableOpacity
      style={styles.commentContent}
      onPress={onItemPress}
    >
      <Image source={{ uri: props.img }} style={ styles.pic } />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  title: React.PropTypes.string,
  img: React.PropTypes.string,
  data: React.PropTypes.any,
  onItemPress: React.PropTypes.func,
};

ListItem.defaultProps = {
  title: '',
  img: 'https://unsplash.it/200/300/?random',
  onItemPress: () => {},
};
