import { type ReactNode, useEffect, useState } from "react"

import { Navigate } from "react-router-dom"
import { me } from "../services/auth/auth-api"
import { useAuth } from "../store/useAuth"
import FullScreenLoader from "../components/loadings/LoadingPage"



const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useAuth()
    useEffect(() => {
        const func = async () => {

            if (user) {
                await me().then(res => {
                    if (res.data) {
                        setIsLoading(false)
                        setIsAuth(true)
                    }
                }).catch(err => {
                    console.log(err);
                    setUser({
                        accessToken: null,
                        user: null
                    })
                    setIsAuth(false)
                    setIsLoading(false)


                })
            } else {
                setIsAuth(false)
                setIsLoading(false)

            }
        }
        func()
    }, [])

    if (isLoading) {
        return <FullScreenLoader />
    }
    else {

        return isAuth ? children : <Navigate to={"/auth"} />
    }
}

export default PrivateRoute