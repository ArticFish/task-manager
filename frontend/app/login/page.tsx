'use client'

import api from '@/lib/api';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleEmail= (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try {
            const response = await api.post('auth/login', {email, password})
            localStorage.setItem('token', response.data.access_token)
            router.push('/')
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
                        <h2 className="card-title text-center mb-4">Login</h2>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
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
                                    {error && <div className="alert alert-danger mt-2">{error}</div>}
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-secondary" type="button" onClick={() => router.push('/register')}>
                                            Register
                                        </button>
                                        <button className="btn btn-success" type="submit">Login</button>
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