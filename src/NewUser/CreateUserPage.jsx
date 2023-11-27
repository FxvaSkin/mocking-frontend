import './CreateUserPage.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function CreateUserPage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [nameError, setNameError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setFormSubmitted(true)

    if (!name.trim()) {
      setNameError(true)
    }

    if (!age.trim()) {
      setAgeError(true)
    }

    if (nameError || ageError) {
      return
    }

    try {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      })

      if (response.ok) {
        console.log('Data sent successfully:', response.statusText)

        navigate(`/?userCreated=true`)
      } else {
        console.error('Error:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="new-user">
      <form
        className="new-user_form"
        onSubmit={handleSubmit}
        method="post"
        action="/"
      >
        <div className="new-user_wrapper">
          <h1>New user</h1>
          <Link to="/" className="wrapper_back-btn">
            Back
          </Link>
        </div>
        <div className="text-field">
          <label className="text-field__label" htmlFor="name-input">
            Name:
            <input
              type="text"
              className={`text-field__input ${
                nameError ? 'text-field__input--error' : ''
              }`}
              name="name"
              id="name-input"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError(e.target.value === '')
              }}
              onBlur={(e) => setNameError(name === '')}
            />
            <span className={`error-message ${nameError ? 'show' : ''}`}>
              'name' cannot be empty
            </span>
          </label>
        </div>
        <div className="text-field_age">
          <label className="text-field__label" htmlFor="age-input">
            Age:
            <input
              className={`text-field__input ${
                ageError ? 'text-field__input--error' : ''
              }`}
              type="text"
              name="age"
              id="age-input"
              placeholder="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value)
                setAgeError(e.target.value === '')
              }}
              onBlur={(e) => setAgeError(age === '')}
            />
            <span className={`error-message ${ageError ? 'show' : ''}`}>
              'age' cannot be empty
            </span>
          </label>
        </div>
        {formSubmitted && (nameError || ageError) && (
          <div className="new-user_error-message">
            <span className="error-message">fields cannot be empty!</span>
          </div>
        )}
        <div className="new-user_submit-btn">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
