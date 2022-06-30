import React, { useState } from 'react'
import '../../asset/css/dashboard.css'
import { uid } from 'uid'
import { auth, db } from '../../firebase'
import { ref, set } from 'firebase/database'

const DashboardForm = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleStore = (e) => {
    e.preventDefault()
    if (title == "") {
      return
    }
    const taskId = uid();
    set(ref(db, `/${auth.currentUser.uid}/${taskId}`), {
      title: title,
      description: description,
      taskId: taskId
    });
    setTitle("")
    setDescription("")
  };

  return (
    <div className='dashboard-form'>
      <h2><strong>Add Task :</strong></h2>
      <form onSubmit={handleStore}>
        <label htmlFor='title'>Title<span style={{ color: "#212529" }}>*</span></label>
        <input
          className='form-control mb-3'
          placeholder='Title Here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <textarea
          placeholder='Description Here'
          className='form-control mb-3'
          maxLength="100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-btn">
          <button className='btn btn-dark '>Add Task</button>
        </div>
      </form>
    </div>
  )
}

export default DashboardForm