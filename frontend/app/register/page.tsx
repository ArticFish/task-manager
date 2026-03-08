'use client'

import api from '@/lib/api';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const [error, setError] = useState('');
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleEmail= (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try {
            const response = await api.post('auth/register', {username, email, password})
            localStorage.setItem('token', response.data.access_token)
            router.push('/tasks')
        } catch (err: any) {
            setError(err.response.data.message)
        }
    }
    return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Register</h2>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Username:</label>
                                        <input type="text" placeholder="Enter Username" name="username" value={username} onChange={handleUsername} className="form-control" required>
                                        </input>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <input type="email" placeholder="Enter Email" name="email" value={email} onChange={handleEmail} className="form-control" required>
                                        </input>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password:</label>
                                        <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handlePassword} className="form-control" required>
                                        </input>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        {error && (
                                            <div className="alert alert-danger">
                                                {Array.isArray(error) 
                                                ? error.map((e, i) => <p key={i} className="mb-0">{e}</p>)
                                                : error
                                                }
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-success" type="submit">Register</button>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}