import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { auth } from '../services/firebaseConnection';

interface PrivateProps{
    children: React.ReactNode
}

const Private = ({children}: PrivateProps) => {
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem('@react-devlink', JSON.stringify(userData))
                setLoading(false)
                setSigned(true)
            } else {
                setLoading(false)
                setSigned(false)
            }
        })

        return () => {
            unsub()
        }
    }, [])

    if (loading) {
        return <></>
    }

    if (!signed) {
        return <Navigate to='/login' />
    }

    return children
}

export default Private