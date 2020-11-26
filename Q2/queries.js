const config = require('./config/connections.json')
const Pool = require('pg').Pool
const pool = new Pool(config.cmsConnection)

const getMovies = (request, response) => {
  pool.query('select * from movie order by 1', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getMovie = (request, response) => {
  let movieId = request.params.movieId
  pool.query('select * from movie where id= '+movieId+'order by 1', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addMovie = (request, response) => {
  let rawBody = JSON.parse(request.rawBody)
  let title = rawBody.title
  let category = rawBody.category
  let star = rawBody.star
  pool.query(
    "INSERT INTO movie (title, category, star) VALUES($1, $2, $3)",
    [title, category, star],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(JSON.parse('{"message":"ok"}'))
    }
  )
}
const updateMovie = (request, response) => {
  let movieId = request.params.movieId
  let rawBody = JSON.parse(request.rawBody)
  let title = rawBody.title
  let category = rawBody.category
  let star = rawBody.star
  pool.query(
    "UPDATE movie SET title=$1, category=$2, star=$3 WHERE id=$4",
    [title, category, star, movieId],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(JSON.parse('{"message":"ok"}'))
    }
  )
}
const deleteMovie = (request, response) => {
  let movieId = request.params.movieId
  pool.query(
    "UPDATE movie SET is_delete=true WHERE id=$1",
    [movieId],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(JSON.parse('{"message":"ok"}'))
    }
  )
}

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie
}
