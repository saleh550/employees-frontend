
import ScrollToTop from '../../components/ScrollToTop'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

const AuthLayout = () => {
    return (
        <div className="min-h-svh ">
            <Header />
            {/* add padding to push outlet below fixed header */}
            <main className="pt-18">
                <ScrollToTop />
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout