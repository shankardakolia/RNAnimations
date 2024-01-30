import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const StepperProgress = ({steps}) => {
  const step = useSharedValue(0);
  const progress = useSharedValue(0);
  const stepWidth = 100 / (steps - 1);
  const translationX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translationX.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      const currentStep = Math.round(translationX.value / stepWidth);
      const targetX = currentStep * stepWidth;
      translationX.value = withSpring(targetX, {damping: 2, stiffness: 80});
      step.value = withTiming(currentStep, {
        duration: 200,
        easing: Easing.ease,
      });
      progress.value = withTiming((currentStep / (steps - 1)) * 100, {
        duration: 200,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translationX.value}],
  }));

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Step: {step.value}</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{flex: 1, height: 2, backgroundColor: 'gray'}} />
        <Animated.View
          style={[
            {
              height: 10,
              width: '100%',
              backgroundColor: 'blue',
              position: 'absolute',
              top: -4,
            },
            animatedStyle,
          ]}
        />
        <View style={{flex: 1, height: 2, backgroundColor: 'gray'}} />
      </View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: 'red',
            position: 'absolute',
            top: -15,
          }}
        />
      </PanGestureHandler>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        {Array.from({length: steps}).map((_, index) => (
          <View
            key={index}
            style={{
              width: stepWidth + '%',
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{index}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StepperProgress;
