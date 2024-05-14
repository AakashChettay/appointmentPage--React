import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appiontmentsList: [],
    title: '',
    date: '',
  }

  handleTitleChange = event => {
    this.setState({title: event.target.value})
  }

  handleDateChange = event => {
    this.setState({date: event.target.value})
  }

  handleAddComment = () => {
    const {appiontmentsList, title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavourite: false,
    }
    const titInp = document.getElementById("titleInp")
    const dateInp = document.getElementById("dateInp")
    titInp.value = ''
    dateInp.value = ''
    this.setState({
      appiontmentsList: [...appiontmentsList, newAppointment],
      title: '',
      date: ''
    })
  }

  toggleLike = id => {
    this.setState(prevState => ({
      appiontmentsList: prevState.appiontmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {
            ...eachAppointment,
            isFavourite: !eachAppointment.isFavourite,
          }
        }
        return eachAppointment
      }),
    }))
  }

  showOnlyFavs = () => {
    const {appiontmentsList} = this.state
    const {orgList} = this

    // If orgList doesn't exist, create it
    if (!orgList) {
      this.orgList = appiontmentsList
    }

    const favList = appiontmentsList.filter(
      eachAppointment => eachAppointment.isFavourite === true,
    )

    // If appiontmentsList is already showing favorites, switch back to orgList
    if (appiontmentsList.length !== favList.length) {
      this.setState({appiontmentsList: favList})
    } else {
      this.setState({appiontmentsList: this.orgList})
    }
  }

  render() {
    const {appiontmentsList} = this.state
    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="headingStyle">Add Appointment</h1>
          <div className="appointmentInputAndImgContainer">
            <div className="inputContainer">
              <label htmlFor="titleInp" className="labelStyle">
                TITLE
              </label>
              <input
                onChange={this.handleTitleChange}
                placeholder="Title"
                id="titleInp"
                className="inputStyle"
              />
              <label htmlFor="dateInp" className="labelStyle">
                DATE
              </label>
              <input
                onChange={this.handleDateChange}
                type="date"
                id="dateInp"
                className="inputStyle"
              />
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="imgStyle"
            />
          </div>
          <button
            onClick={this.handleAddComment}
            className="addBtnStyle"
            type="button"
          >
            Add
          </button>
          <br className="breakLine" />
          <div className="appointmentsAndStarredBtn">
            <h1 className="appointmentHeading">Appointments</h1>
            <button
              onClick={this.showOnlyFavs}
              type="button"
              className="StarredBtn"
            >
              Starred
            </button>
          </div>
          <ul className="appointmentListStyle">
            {appiontmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                toggleLike={this.toggleLike}
                appointmentDetails={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
