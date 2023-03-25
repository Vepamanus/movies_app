import {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {fullMenu: false, searchValue: ''}

  menuShow = () => {
    this.setState({fullMenu: true})
  }

  menuHide = () => {
    this.setState({fullMenu: false})
  }

  getSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onSearch = () => {
    const {getSearchMoviesData} = this.props
    const {searchValue} = this.state
    if (searchValue !== '') {
      getSearchMoviesData(searchValue)
    }
  }

  render() {
    const {location} = this.props
    const {fullMenu, searchValue} = this.state
    const {searchRoute, isHome, isPopular, isAccount} = this.props
    const searchContainer = searchRoute
      ? 'search-input-route-container search-input-container'
      : 'search-input-container'
    const searchBtn = searchRoute
      ? 'search-route-btn search-button'
      : 'search-button'
    const searchIcon = searchRoute ? 'icons search-route-icon' : 'icons'

    const homeRoute = isHome ? 'menu-items highlight' : 'menu-items'
    const popularRoute = isPopular ? 'menu-items highlight' : 'menu-items'
    const accountRoute = isAccount ? 'menu-items highlight' : 'menu-items'

    return (
      <nav className="nav-bar">
        <div className="header">
          <div className="movie-home">
            <NavLink to="/" className="img-link">
              <img
                className="header-web-site"
                alt="website logo"
                src="https://res.cloudinary.com/dsiyffj0o/image/upload/v1670493842/Group_7399_f2jz6k.png"
              />
            </NavLink>
            <ul className="show-menu show1">
              <NavLink
                to="/"
                className={homeRoute}
                isActive={() => location.pathname === '/'}
                activeClassName="active"
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to="/popular"
                className={popularRoute}
                isActive={() => location.pathname === '/popular'}
                activeClassName="active"
              >
                <li>Popular</li>
              </NavLink>

              <NavLink
                to="/tv-shows"
                isActive={() => location.pathname === '/tv-shows'}
                className={popularRoute}
                activeClassName="active"
              >
                <li>TV Shows</li>
              </NavLink>
            </ul>
          </div>
          <div className="icons-container">
            <div className={searchContainer}>
              {searchRoute && (
                <input
                  value={searchValue}
                  onChange={this.getSearchInput}
                  placeholder="Search"
                  type="search"
                  className="search-input"
                />
              )}
              <NavLink to="/search">
                <button
                  onClick={this.onSearch}
                  type="button"
                  testid="searchButton"
                  className={searchBtn}
                >
                  <HiOutlineSearch className={searchIcon} />
                </button>
              </NavLink>
            </div>
            <NavLink to="/account">
              <img
                className="avatar show1"
                alt="profile"
                src="https://res.cloudinary.com/dsiyffj0o/image/upload/v1671165868/Avatar_gbes4m.png"
              />
            </NavLink>
            <button
              onClick={this.menuShow}
              type="button"
              className="show close-btn"
            >
              <MdMenuOpen className="hamburger icons" />
            </button>
          </div>
        </div>

        <nav className="show">
          {fullMenu && (
            <ul className="show-menu">
              <NavLink to="/" className={homeRoute}>
                <li>Home</li>
              </NavLink>
              <NavLink to="/popular" className={popularRoute}>
                <li>Popular</li>
              </NavLink>
              <NavLink to="/tv-shows" className={popularRoute}>
                <li>TVShows</li>
              </NavLink>
              <NavLink to="/account" className={accountRoute}>
                <li>Account</li>
              </NavLink>
              <li>
                <button
                  onClick={this.menuHide}
                  className="close-btn"
                  type="button"
                >
                  <AiFillCloseCircle className="close icons" />
                </button>
              </li>
            </ul>
          )}
        </nav>
      </nav>
    )
  }
}
export default withRouter(Header)
