import { Animated, Dimensions } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'

const { width } = Dimensions.get('window')

export default ({ navigation }) => {
  const translate = new Animated.ValueXY({ x: 0, y: 0 })
  const translateX = translate.x.interpolate({
    inputRange: [-(width / 2), width / 2],
    outputRange: [-(width / 2), width / 2],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  const [currentX, setCurrentX] = useState(0)

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translate.setValue({ x: e.translationX + currentX, y: 0 })
    })
    .onEnd((e) => {
      setCurrentX(e.translationX + currentX)
    })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style='auto' />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          height={width / 1.5}
          width={width}
          style={{ position: 'absolute', zIndex: 1, transform: [{ translateX }], backgroundColor: '#000' }}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  )
}
