import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isStarred: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  renderTitle = () => {
    const {title} = this.state
    return (
      <div className="input-card">
        <label htmlFor="title" className="label">
          TITLE
        </label>
        <input
          type="text"
          id="title"
          className="input-element"
          placeholder="Title"
          value={title}
          onChange={this.onChangeTitle}
        />
      </div>
    )
  }

  renderDate = () => {
    const {date} = this.state
    return (
      <div className="input-card">
        <label htmlFor="date" className="label">
          DATE
        </label>
        <input
          type="date"
          id="date"
          className="input-element"
          value={date}
          onChange={this.onChangeDate}
        />
      </div>
    )
  }

  starredAppointment = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isFavorite: !eachApp.isFavorite}
        }
        return eachApp
      }),
    }))
  }

  onClickStarredItems = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointments = () => {
    const {isStarred, appointmentsList} = this.state
    if (isStarred) {
      return appointmentsList.filter(
        eachStarredItem => eachStarredItem.isFavorite === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {isStarred} = this.state
    const starredClassName = isStarred ? 'add-button' : 'starred-button'
    const filteredAppointments = this.getFilteredAppointments()
    return (
      <div className="main-container">
        <div className="container">
          <div className="card">
            <form className="form-card" onSubmit={this.onAddAppointment}>
              <h1 className="main-heading">Add Appointment</h1>
              <div>{this.renderTitle()}</div>
              <div>{this.renderDate()}</div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hr-line" />
          <div className="starred-card">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={starredClassName}
              onClick={this.onClickStarredItems}
            >
              Starred
            </button>
          </div>
          <ul className="un-ordered-list">
            {filteredAppointments.map(eachItem => (
              <AppointmentItem
                appointmentDetails={eachItem}
                key={eachItem.id}
                starredAppointment={this.starredAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
