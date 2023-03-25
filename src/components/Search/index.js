import {Component} from 'react'
import Cookies from 'js-cookie'
import Loading from '../Loading'

import Header from '../Header'
import MovieDetailsLink from '../MovieDetailsLink'
import FailureView from '../FailureView'

import './index.css'

const searchRoute = true

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class Search extends Component {
  state = {
    searchResultsList: [],
    renderStatus: renderConstraints.initial,
    searchValue: '',
  }

  getSearchMoviesData = async searchValue => {
    this.setState({renderStatus: renderConstraints.loading})
    const jwtToken = Cookies.get('jwt_token')
    const searchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(searchApi, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedSearchMoviesData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        searchResultsList: fetchedSearchMoviesData,
        renderStatus: renderConstraints.success,
        searchValue,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  renderSuccessView = () => {
    const {searchResultsList} = this.state
    return searchResultsList.length > 0 ? (
      <ul className="search-items">
        {searchResultsList.map(eachMovie => (
          <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderNoResultsView = () => {
    const {searchValue} = this.state

    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderLoaderView = () => <Loading />

  tryAgainSearchData = () => {
    this.getSearchMoviesData()
  }

  renderFailureView = () => <FailureView tryAgain={this.tryAgainSearchData} />

  renderSwitchView = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.loading:
        return this.renderLoaderView()
      case renderConstraints.success:
        return this.renderSuccessView()
      case renderConstraints.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-color">
        <Header
          getSearchMoviesData={this.getSearchMoviesData}
          searchRoute={searchRoute}
        />
        <div className="search-container">{this.renderSwitchView()}</div>
      </div>
    )
  }
}
export default Search
