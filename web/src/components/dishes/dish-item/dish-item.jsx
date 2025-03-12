import React from 'react'
import { Link } from 'react-router-dom'

function DishItem({ dish }) {
  const { id, name, image } = dish
  return (
    <>
      <Link to={`/dishes/${id}`} className="group">
        <img src={image} alt={name} className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
        <h3 className="mt-4 text-md text-gray-700 font-bold">{name}</h3>
      </Link>
    </>
  )
}

export default DishItem