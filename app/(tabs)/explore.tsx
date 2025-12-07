import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import Movies from '../movies/[id]'
import Moviecard from '../components/Moviecard'
import { useFetch } from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import Searchbar from '../components/searchbar'


const Explore = () => {

  const [searchquery, setsearchquery] = useState('')

  const { data: movies, loading: moviesloading, error: movieserror, refetch, reset } = useFetch(() =>
    fetchMovies({ query: searchquery }), false

  )
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchquery.trim()) {
        await refetch();
      } else {
        reset()
      }
    }, 500
    )
    return () => clearTimeout(timeoutId)
  }, [searchquery])
  return (
    <View className='bg-black flex-1'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />

      <FlatList data={movies} renderItem={({ item }) => <Moviecard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5  '
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,

        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center items-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5'>
              <Searchbar placeholder='search for the movie'
                value={searchquery}
                onChangeText={(text) => setsearchquery(text)} />
            </View>
            {
              moviesloading && (
                <ActivityIndicator size={"large"} color={"#0000ff"} className='my-3' />
              )
            }
            {
              movieserror && (
                <Text className='text-red-600 px-5 my-3 '>
                  Error: {movieserror.message}
                </Text>
              )
            }
            {
              !moviesloading && !movieserror &&
              searchquery.trim() && movies?.length > 0
              && (
                <Text className='text-white text-xl font-bold'>
                  Search resulet for  {''}
                  <Text className='text-purple-900 '>{searchquery} </Text>
                </Text>
              )
            }
          </>
        }
        ListEmptyComponent={
          !moviesloading && !movieserror ? (


            <View className='mt-10 px-5 '>
              <Text className='text-center text-gray-500'> {searchquery.trim() ? 'No movies found' : "Search for the movie"} </Text>
            </View>

          ) : null
        }
      />


    </View>
  )
}

export default Explore