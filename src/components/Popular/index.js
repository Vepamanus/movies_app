import {Component} from 'react'
import Cookies from 'js-cookie'

import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import FailureView from '../FailureView'
import Loading from '../Loading'
import Header from '../Header'
import Footer from '../Footer'
import MovieDetailsLink from '../MovieDetailsLink'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularMovieList: [],
    currentPage: 1,
    totalData: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  handlePrevClick() {
    const {currentPage} = this.state

    if (currentPage > 1) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage - 1,
        }),
        () => {
          this.getPopularMovies()
        },
      )
    }
  }

  handleNextClick() {
    const {currentPage, totalData} = this.state
    const totalPages = Math.ceil(totalData.length / 10)
    if (currentPage < totalPages) {
      this.setState(
        prevState => ({
          currentPage: prevState.currentPage + 1,
        }),
        () => {
          this.getPopularMovies()
        },
      )
    }
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {currentPage} = this.state

    const startIndex = (currentPage - 1) * 10
    const endIndex = startIndex + 10

    const jwtToken = Cookies.get('jwt_token')
    const popularMovieApi = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(popularMovieApi, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))

      const sliceData = updatedData.slice(startIndex, endIndex)

      this.setState({
        popularMovieList: sliceData,
        totalData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularMovieList} = this.state

    return (
      <>
        <ul className="popular-list">
          {popularMovieList.map(eachMovie => (
            <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickRetry = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => <FailureView tryAgain={this.onClickRetry} />

  renderLoadingView = () => <Loading />

  renderPopularPageView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {currentPage, totalData} = this.state

    const totalPages = Math.ceil(totalData.length / 10)
    return (
      <div className="popular-container">
        <Header />
        {this.renderPopularPageView()}
        <div className="pagination">
          <button type="button" onClick={() => this.handlePrevClick()}>
            <GrFormPrevious />
          </button>
          <p>
            <span style={{color: 'white'}}>
              {currentPage} of {totalPages} pages
            </span>
          </p>
          <button type="button" onClick={() => this.handleNextClick()}>
            <GrFormNext />
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Popular
