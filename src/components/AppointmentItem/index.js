import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleLike} = props
  const {id, title, date, isFavourite} = appointmentDetails
  const favouriteClicked = () => {
    toggleLike(id)
  }
  return (
    <li className="appointmentListItem">
      <div className="titleAndFavouriteIconContainer">
        <p className="titleStyle">{title}</p>
        <button
          data-testid="star"
          type="button"
          className="favBtn"
          onClick={favouriteClicked}
        >
          {isFavourite ? (
            <img
              className="favIcon"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
            />
          ) : (
            <img
              className="favIcon"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
            />
          )}
        </button>
      </div>
      {title.trim() && date.trim() && (
        <p className="formattedDateStyle">
          Date:{' '}
          {new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          , {new Date(date).toLocaleDateString('en-GB', {weekday: 'long'})}
        </p>
      )}
    </li>
  )
}
export default AppointmentItem
