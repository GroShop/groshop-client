import { View, Text } from 'react-native'
import React from 'react'
import { Assets, Container, ImageComponent } from 'utils/imports.utils'

const HomeScreen = () => {
  return (
    <Container>
    <View>
      <Text>HomeScreen</Text>
      <ImageComponent src={Assets.googleIcon} svg height={20} width={20}/>
    </View>
    </Container>
  )
}

export default HomeScreen