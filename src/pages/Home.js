import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import '../asset/css/home.css'
import { uid } from 'uid'
import { onValue, ref, remove, set, update } from 'firebase/database'
import DeleteButton from '@mui/icons-material/Clear'
import EditButton from '@mui/icons-material/Edit'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NavigationBar from '../components/NavigationBar'

const Home = () => {

    const [show, setShow] = useState(false);
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [tempUid, setTempUid] = useState("");
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


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

    const handleStore = (e) => {
        e.preventDefault()
        if (todo == "") {
            return
        }
        const taskId = uid();
        set(ref(db, `/${auth.currentUser.uid}/${taskId}`), {
            todo: todo,
            taskId: taskId
        });

        setTodo("");
    };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
    }

    const handleClose = () => {
        setShow(false)
        setTodo("");

    };
    const handleShow = () => setShow(true);

    const handleUpdate = (todo) => {
        handleShow();
        setTodo(todo.todo)
        setTempUid(todo.taskId)
    }
    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUid}`), {
            todo: todo,
            tempUid: tempUid
        })
        setTodo("");
        handleClose();
    }

    return (
        <>
            <NavigationBar />
            <div className="home-container">
                <h3 className='mb-3'>Add Task</h3>
                <div className="container form-container">
                    <form className="home-form" onSubmit={handleStore}>
                        <input
                            className='home-input'
                            type="text"
                            maxLength="40"
                            placeholder='Add Your Task Here'
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)} />
                    </form>
                </div>
                <h3 className='mt-5 mb-3'>Your Task</h3>
                <div className="row container task-container">
                    {loading ? todos.map((todo, index) => (
                        <div className="col-lg-6 task mb-3" key={index}>
                            <div className='text'>
                                <span>#{index + 1}</span>
                                <h5>{todo.todo}</h5>
                            </div>
                            <div className='action'>
                                <button className='action-button' onClick={() => handleUpdate(todo)}>
                                    <EditButton />
                                </button>
                                <button className='action-button' onClick={() => handleDelete(todo.taskId)}>
                                    <DeleteButton />
                                </button>
                            </div>
                        </div>
                    )) : <h1>Loading...</h1>}
                </div>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Update Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    type="email"
                                    placeholder="Edit Task Here"
                                    value={todo}
                                    onChange={(e) => setTodo(e.target.value)}
                                    autoFocus
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEditConfirm}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Home