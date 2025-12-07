import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const Saved = () => {
  return (
    <View className='flex-1 bg-black '>
         <View className='flex-1 flex-col gap-5 justify-center items-center'>
           <Image source={icons.save} className='size-10' tintColor={"#ffff"} />
           <Text className='text-gray-500 text-base'> nothing  save </Text>
         </View>
   
       </View>
  )
}

export default Saved