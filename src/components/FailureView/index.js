import './index.css'

const FailureView = props => {
  const {tryAgain} = props

  const onTryAgain = () => {
    tryAgain()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dsiyffj0o/image/upload/v1670750371/Background-Complete_karmtg.png"
        alt="failure view"
        className="failure-view"
      />
      <p className="failure-content">Something went wrong. Please try again</p>
      <button className="try-again-btn" type="button" onClick={onTryAgain}>
        Try again
      </button>
    </div>
  )
}

export default FailureView
