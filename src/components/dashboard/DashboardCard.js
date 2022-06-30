import React, { useState, useEffect } from 'react'
import '../../asset/css/dashboard.css'
import { Card, Spinner, Modal, Form, Button } from 'react-bootstrap'
import DeleteButton from '@mui/icons-material/Clear'
import EditButton from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { auth, db } from '../../firebase'

const DashboardCard = () => {

    const [todos, setTodos] = useState([])
    const [tempUid, setTempUid] = useState("");
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setLoading(true)
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            }
            else if (!user) {
                navigate("/")
            }
        })
    }, [])


    const handleDelete = (uid) => {
        remove(ref(db, `${auth.currentUser.uid}/${uid}`))
    }

    const handleOpen = (todo) => {
        setShow(true);
        setTitle(todo.title)
        setDescription(todo.description)
        setTempUid(todo.taskId)
    }

    const handleClose = () => setShow(false);

    const handleUpdate = () => {
        if(title === ""){
            return
        }
        update(ref(db, `/${auth.currentUser.uid}/${tempUid}`), {
            title: title,
            description: description,
            tempUid: tempUid
        })
        setShow(false);
    }

    return (
        <div className='dashboard-card'>
            <h2><strong>Task :</strong></h2>
            <div className='card-container'>
                {loading
                    ?
                    todos.map((todo, index) => (
                        <Card className="mb-3 cardcss" key={index}>
                            <div className='dashboard-cardheader'>
                                <strong>#{index + 1}</strong>
                                <div className='action'>
                                    <button onClick={() => handleOpen(todo)} className="btn btn-dark action-btn"><EditButton /></button>
                                    <button onClick={() => handleDelete(todo.taskId)} className="btn btn-dark action-btn"><DeleteButton /></button>
                                </div>
                            </div>
                            <Card.Body>
                                <Card.Title><strong>{todo.title}</strong></Card.Title>
                                <Card.Text>
                                    {todo.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                    :
                    <Spinner animation="border" />
                }


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group 
                            className="mb-3" 
                            >
                                <Form.Label>Title<span style={{color: "#212529"}}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Title Here"
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                as="textarea" 
                                rows={3} 
                                maxLength="100"
                                placeholder='Description Here'
                                value={description} 
                                onChange={(e)=>setDescription(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="dark" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}

export default DashboardCard