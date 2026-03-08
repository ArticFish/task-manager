'use client'

import api from '@/lib/api';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Modal, Button } from 'react-bootstrap';

export default function TasksPage() {
    const [error, setError] = useState('');
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [tasks,setTasks] = useState([]);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [taskToEdit, setTaskToEdit] = useState<any>(null);
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
        getAllTasks();
    },[])

    async function getAllTasks(){
        try {
            const response = await api.get('tasks')
            setTasks(response.data)
        } catch (err: any) {
            if (err.response.status === 401) {
                localStorage.removeItem('token')
                router.push('/login')
            }
        }
    }

    async function saveTask(){
        try {
            await api.post('tasks', {title, description})
            setShowModalAdd(false)
            await getAllTasks()
        } catch (err: any) {
            if (err.response.status === 401) {
                localStorage.removeItem('token')
                router.push('/login')
            } else {
                setError(err.response.data.message)
            }
        }
    }

    async function updateTask(){
        try {
            await api.patch(`tasks/${taskToEdit.id}`, {title, description})
            setShowModalAdd(false)
            await getAllTasks()
        } catch (err: any) {
            if (err.response.status === 401) {
                localStorage.removeItem('token')
                router.push('/login')
            } else {
                setError(err.response.data.message)
            }
        }
    }

    async function deleteTask(){
        try {
            await api.delete(`tasks/${taskToDelete}`)
            setShowModalDelete(false)
            await getAllTasks()
        } catch (err: any) {
            if (err.response.status === 401) {
                localStorage.removeItem('token')
                router.push('/login')
            }
        }
    }

    return (
        <div className='container mt-5'>
        <h2 className='text-center'>List of tasks</h2>
        <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-primary" onClick={() => router.push('/')}>Back</button>
        </div>
        <div className="d-flex justify-content-start mb-3">
            <button className="btn btn-primary" onClick={() => setShowModalAdd(true)}>Add Task</button>
        </div>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task: any) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => { setTaskToEdit(task); setTitle(task.title); setDescription(task.description); setShowModalAdd(true); }}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => { setTaskToDelete(task.id); setShowModalDelete(true); }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModalAdd} onHide={() => { setShowModalAdd(false); setTaskToEdit(null); setTitle(''); setDescription(''); }}>
                <Modal.Header closeButton>
                    <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={handleTitle}/>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <input type="text" className="form-control" name="description" value={description} onChange={handleDescription}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowModalAdd(false); setTaskToEdit(null); setTitle(''); setDescription(''); }}>Cancel</Button>
                    <Button variant="primary" onClick={taskToEdit ? updateTask : saveTask}>Save</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this task?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalDelete(false)}>Cancel</Button>
                    <Button variant="danger" onClick={deleteTask} >Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}