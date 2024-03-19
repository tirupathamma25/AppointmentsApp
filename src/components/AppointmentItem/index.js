import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starredAppointment} = props
  const {title, date, id, isFavorite} = appointmentDetails

  const onClickStarred = () => {
    starredAppointment(id)
  }

  const starImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-item">
      <div className="title-card">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStarred}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="label">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
