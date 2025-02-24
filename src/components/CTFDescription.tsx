import React from 'react'
import AnimatedText from './text'

interface CTFDescriptionProps {
  description: string
  points: number
  author: string
  tags: string[]
}

const CTFDescription = ({
  description,
  points,
  author,
  tags
}: CTFDescriptionProps) => {
  return (
    <div className="flex w-[40%] flex-col">
      <span className="w-full text-ellipsis border border-white p-8 text-left font-neuebit text-3xl uppercase">
        {description ||
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat ratione nemo ipsum iure amet mollitia dolores eveniet assumenda ab? Quidem earum, esse nam nemo quis labore doloremque beatae eaque veniam.'}
      </span>
      <div className="flex w-full flex-row justify-between border border-white px-8 py-4 text-3xl">
        <span className="text-3xl">
          <span className="pr-2 text-enigma-green">{points || 0}</span>
          <AnimatedText text={'POINTS'} />
        </span>
        <span className="uppercase text-enigma-yellow">
          {author || 'Author'}
        </span>
      </div>
      <div className="flex w-full flex-row flex-wrap justify-end">
        {tags.map((tag) => (
          <span
            key={tag}
            className="w-fit text-ellipsis border border-white px-8 py-4 text-right font-neuebit text-3xl uppercase text-enigma-yellow"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default CTFDescription
