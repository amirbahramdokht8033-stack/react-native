import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useFetch } from '@/services/useFetch'
import { fetchMoviesD } from '@/services/api'
import { icons } from '@/constants/icons'

interface MovieInfoProps {
    label: string
    value?: string | number | null
}

const Movies = () => {
    const MovieInfo = ({ label, value }: MovieInfoProps) => (
        <View className='flex-col items-start justify-center mt-5 '>
            <Text className='text-white font-bold text-xl'> {label}  </Text>
            <Text className='text-gray-500 font-bold text-sm mt-2'>{value || 'N/A'}  </Text>
        </View>
    )


    const { id } = useLocalSearchParams()


    const { data: movie, loading } = useFetch(() => fetchMoviesD(id as string))

    return (

        <View className=' flex-1 bg-black'>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
                        className='w-full h-[550px]'
                        resizeMode='stretch'
                    />
                </View>
                <View className=' flex-col items-start justify-center mt-5 px-5'>
                    <Text className='text-white font-bold text-xl'> {movie?.title} </Text>
                    <View className='text-white flex-row items-center gap-x-1 mt-2'>

                        <Text className='text-blue-300 text-sm '>({movie?.release_date})</Text>
                       

                        <Text className='text-blue-400 text-sm '>
                            {movie?.runtime}m</Text>

                    </View>

                    <View className='flex-row items-center bg-gray-900 px-2 py-1 rounded-md gap-x-1 mt-2' >
                        <Image source={icons.star} className='size-4' />
                        <Text className='font-bold text-white text-xs'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
                        <Text className='font-bold text-white text-xs'>  ( {movie?.vote_average}) votess</Text>
                    </View>
                    <MovieInfo label='overview' value={movie?.overview} />
                    <MovieInfo label='Genres' value={movie?.genres?.map((g) =>g.name).join('-') ||'N/A' } />
                   
                   <View className='flex- flex-row justify-between  w-1/2 '>
                   <MovieInfo label='Budget' value= {`$ ${movie?.budget / 1_000_000} million`} />
                

                   </View>
                    <MovieInfo label='production_companies' value={movie?.production_companies.map((c) =>c.name ) .join('-') || 'N/A'} />
                </View>

            </ScrollView>
            <TouchableOpacity onPress={router.back}  className=' absolute bottom-5 left-0 right-0 mx-5 bg-purple-700 rounded-lg py-4 flex  flex-row items-center justify-center z-50'>
                <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor={"#fff"}  />
                <Text className='text-white font-bold text-base'>Go back</Text>
            </TouchableOpacity>

            

        </View>
    )
}

export default Movies