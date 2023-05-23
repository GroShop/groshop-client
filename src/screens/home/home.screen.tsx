import { View, Text } from 'react-native'
import React from 'react'
import { Assets, Container, ImageComponent } from 'utils/imports.utils'

const Home = () => {
  return (
    <Container>
    <View>
      <Text>Home</Text>
      <ImageComponent src={Assets.googleIcon} svg height={20} width={20}/>
    </View>
    </Container>
  )
}

export default Home