import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {contactsData} from '../Data';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const FlatListAnimation = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contactsData}
        renderItem={({item}) => (
          <AnimatedListItem
            item={item}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const AnimatedListItem = ({item, selectedItems, setSelectedItems}) => {
  const isSelected = selectedItems.includes(item.id);
  const progress = useSharedValue(isSelected ? 1 : 0);

  const handleItemPress = () => {
    setSelectedItems(prev =>
      isSelected ? prev.filter(id => id !== item.id) : [...prev, item.id],
    );

    progress.value = withTiming(isSelected ? 0 : 1, {
      duration: 1000, // You can adjust the duration as needed
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = isSelected
      ? `rgba(255, 127, 80, ${progress.value})`
      : '#2EB225';

    return {
      backgroundColor,
    };
  });

  return (
    <AnimatedButton
      style={[styles.listView, animatedStyle]}
      onPress={handleItemPress}>
      <Text style={styles.itemView}>{item.name}</Text>
      <Text style={styles.itemView}>{item.email}</Text>
      <Text style={styles.itemView}>{item.gender}</Text>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  listView: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    paddingLeft: 20,
  },
  itemView: {color: 'white', marginBottom: 5, fontSize: 16, fontWeight: '400'},
});

export default FlatListAnimation;
