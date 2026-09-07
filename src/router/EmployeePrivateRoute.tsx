import { type ReactNode, useEffect, useState } from "react"

import { Navigate } from "react-router-dom"

import FullScreenLoader from "../components/loadings/LoadingPage"
import { useEmployeeAuth } from "../store/useEmployeeAuth"
import { employeeMe } from "../services/employees/employees-apis"



const EmployeePrivateRoute = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { employeeUser, setemployeeUser } = useEmployeeAuth()
    useEffect(() => {
        const func = async () => {

            if (employeeUser) {
                await employeeMe().then(res => {
                    if (res.data) {
                        setIsLoading(false)
                        setIsAuth(true)
                    }
                }).catch(err => {
                    console.log(err);
                    setemployeeUser({
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

        return isAuth ? children : <Navigate to={"/auth/login/employee"} />
    }
}

export default EmployeePrivateRoute