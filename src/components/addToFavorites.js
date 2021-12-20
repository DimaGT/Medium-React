import classNames from 'classnames'
import useFetch from 'hooks/useFetch'
import React from 'react'

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
  const apiUrl = `/articles/${articleSlug}/favorite`
  const [{response}, doFetch] = useFetch(apiUrl)
  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount
  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited
  const handleLike = (e) => {
    e.preventDefault()
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post'
    })
  }

  const buttonClasses = classNames ({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse
  })
  return (
    <button onClick={handleLike} className={buttonClasses}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  )
}

export default AddToFavorites
