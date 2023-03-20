import Image from 'next/image'
import { SyntheticEvent, useState } from 'react'

import { InteractionType, MovieCategory } from '~/types/Movie'

import Button from '~/components/common/button'

interface MovieProps {
  title: string
  category: MovieCategory
  poster: string
  likes: number
  deleteHandler: () => void
  likeHandler: (interaction: InteractionType) => void
  dislikeHandler: (interaction: InteractionType) => void
}
const Movie: React.FC<MovieProps> = ({
  title,
  category,
  poster,
  likes,
  deleteHandler,
  likeHandler,
  dislikeHandler,
}) => {
  const [isLiked, setIsLiked] = useState(false)

  const deleteMovie = async (e: SyntheticEvent) => {
    e.preventDefault()
    deleteHandler()
  }

  const likeMovie = async (e: SyntheticEvent, interaction: InteractionType) => {
    e.preventDefault()
    setIsLiked(true)
    likeHandler(interaction)
  }

  const dislikeMovie = async (
    e: SyntheticEvent,
    interaction: InteractionType,
  ) => {
    e.preventDefault()
    setIsLiked(false)
    dislikeHandler(interaction)
  }

  return (
    <div className="flex flex-col">
      <div className=" relative inline-block h-80 w-60 bg-gradient-to-b from-green-700">
        <Image
          src={poster}
          className="h-full "
          alt={`poster for the '${title}' movie`}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-x-0 top-0 bottom-3/4 bg-gradient-to-b from-slate-700" />
        <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-slate-800 px-2 pt-20 pb-8  text-center text-white">
          <h4 className="font-bold capitalize">{title}</h4>
          <p className="font-medium">{category}</p>
        </div>
      </div>
      <div className="flex justify-between ">
        <Button
          className="basis-full"
          theme="primary"
          text={isLiked ? `${likes} Dislike` : `${likes} Like`}
          onClick={
            isLiked
              ? (e) => dislikeMovie(e, InteractionType.Dislike)
              : (e) => likeMovie(e, InteractionType.Like)
          }
        />
        <Button
          className="basis-full"
          onClick={deleteMovie}
          theme="secondary"
          text="delete"
        />
      </div>
    </div>
  )
}

export default Movie
