/**
 * Created by hushicai on 17/9/27.
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

const count = 100;
const rows = [];

for (let i = 0; i < count; i++) {
  rows.push({
    key: i,
    time: Date.now(),
    type: i === 2 ? 'special' : 'normal'
  });
}

function getTime() {
  return Date.now();
}

function pad(s) {
  return ("0" + s).substr(-2);
}

function millisecondToDate(ms) {
  let hours = Math.floor(ms / (60 * 60 * 1000));
  let minutes = Math.floor((ms - hours * 60 * 60 * 1000) / (60 * 1000));
  let seconds = Math.floor((ms - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000);

  return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function calculateCountDownTime(item) {
  // 24 hours count down
  const DURATION = 24 * 60 * 60 * 1000;
  let managerTime = new Date(item.time).getTime();
  let nowTime = getTime();
  let determineTime = managerTime + DURATION;
  let countDownTime = determineTime - nowTime;

  if (countDownTime <= 0) {
    countDownTime = '00:00:00';
  } else {
    countDownTime = millisecondToDate(countDownTime);
  }

  return countDownTime;
}

class Item extends React.Component {
  shouldComponentUpdate() {
    // not optimized for now
    return true;
  }
  render() {
    const {item} = this.props;
    return (
      <View style={styles.item}>
        {
          item.type === 'special'
            ? <Text>{calculateCountDownTime(item)}</Text>
            : <Text>{item.key}</Text>
        }
      </View>
    );
  }
}


class App extends React.Component {
  _timer = null;

  state = {
    timestamp: Date.now()
  };

  _tick = () => {
    this.setState({
      timestamp: Date.now()
    });
    // this.forceUpdate();
  };
  componentDidMount() {
    this._timer = setInterval(this._tick, 1000);
  }
  componentWillUnmount() {
    if(this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
  render() {
    return (
      <FlatList
        style={styles.list}
        data={rows}
        extraData={this.state.timestamp}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        getItemLayout={this._getItemLayout}
      />
    );
  }
  _renderItem = ({item}) => {
    return (
      <Item item={item}/>
    );
  };

  _keyExtractor = (item) => {
    return 'item_key_' + item.key;
  };

  _getItemLayout = (data, index) => {
    return {
      length: 31,
      offset: 31 * index,
      index
    };
  };
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  item: {
    height: 30,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center'
  }
});

export default App;
