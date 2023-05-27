import Image from 'next/image'
import { SyntheticEvent, useState } from 'react'

import { InteractionType, MovieCategory } from '~/types/Movie'

import Button from '~/components/common/button'

interface MovieProps {
  title: string
  category: MovieCategory
  poster: string
  likes: number
  dislikes: number
  isLikedByUser: boolean
  isDislikedByUser: boolean
  isInteractionButtonsLoading: boolean
  deleteHandler: () => void
  likeHandler: (interaction: InteractionType) => void
  dislikeHandler: (interaction: InteractionType) => void
}
const Movie: React.FC<MovieProps> = ({
  title,
  category,
  poster,
  likes,
  dislikes,
  isLikedByUser,
  isDislikedByUser,
  isInteractionButtonsLoading,
  deleteHandler,
  likeHandler,
  dislikeHandler,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser)
  const [isDisliked, setIsDisliked] = useState(isDislikedByUser)

  const deleteMovie = async (e: SyntheticEvent) => {
    e.preventDefault()
    deleteHandler()
  }

  const likeMovie = async (e: SyntheticEvent, interaction: InteractionType) => {
    e.preventDefault()
    if (isLiked) {
      // remove liked
      setIsLiked(false)
      likeHandler(interaction)
    } else {
      // add like and remove dislike if it has one
      setIsLiked(true)
      likeHandler(interaction)
    }
  }

  const dislikeMovie = async (
    e: SyntheticEvent,
    interaction: InteractionType,
  ) => {
    e.preventDefault()
    if (isDisliked) {
      setIsDisliked(false)
      dislikeHandler(interaction)
    } else {
      setIsDisliked(true)
      dislikeHandler(interaction)
    }
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
          disabled={isInteractionButtonsLoading}
          className="mr-2 basis-full"
          theme="primary"
          text={`${likes} Likes`}
          onClick={(e) => likeMovie(e, InteractionType.Like)}
        />
        <Button
          disabled={isInteractionButtonsLoading}
          className="basis-full"
          theme="primary"
          text={`${dislikes} Dislikes`}
          onClick={(e) => dislikeMovie(e, InteractionType.Dislike)}
        />
      </div>
      <Button
        onClick={deleteMovie}
        theme="secondary"
        text="delete"
      />
    </div>
  )
}

export default Movie
