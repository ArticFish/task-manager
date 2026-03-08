'use client'

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  function logout(){
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUsername('')
  }

  useEffect(()=>{
      const token = localStorage.getItem('token');
      if (token) {
          const decoded: any = jwtDecode(token);
          setIsLoggedIn(true);
          setUsername(decoded.username);
      }
  },[])

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Main</h2>
                        <p className="text-center text-muted">
                            {isLoggedIn ? `Welcome, ${username}!` : 'You are not logged in'}
                        </p>
                        <div className="card-body text-center mb-4">
                          <div className="mb-3">{isLoggedIn ? <button className="btn btn-danger" onClick={logout}>Logout</button> : <button className="btn btn-primary" onClick={() => router.push('/login')}>Login</button>}</div>
                          <div className="mb-3"><button className="btn btn-success" disabled={!isLoggedIn} onClick={() => router.push('/tasks')}>Tasks</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
