import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "../layout/auth-layout/AuthLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import ManagerLayout from "../layout/manager-layout/ManagerLayout";
import Home from "../pages/home/Home";
import WorkLogsPage from "../pages/work-logs/WorkLogsPage";

// Import your components here, e.g.:
// import Home from '../pages/Home';
// import Employees from '../pages/Employees';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,

    children: [
      {
        path: "/auth",
        element: <LoginPage />,
      },
    ],
  },
  {
      path: "/maneger/home",

      element:
          // <PrivateRoute>
              <ManagerLayout />,
          // </PrivateRoute>,

      children: [
          {
              path: "/maneger/home",
              element: <Home />,
          },
          {
              path: "/maneger/home/work-logs/:employeeId",
              element: <WorkLogsPage />,
          },

      ],
  },
  // {
  //     element: <MenuLayout />,
  //     //   errorElement: <ErrorPage />,
  //     children: [
  //         {
  //             path: "",
  //             element:
  //                 // <PrivateRoute>
  //                 <MainCategories />
  //             // </PrivateRoute>
  //             ,

  //         },
  //         {
  //             path: "/menu-items/:id",
  //             element:
  //                 // <PrivateRoute>
  //                 <MenuItems />
  //             // </PrivateRoute>
  //             ,
  //         }
  //         // {
  //         //     path: "/build/management",
  //         //     element:
  //         //         <PrivateRoute>
  //         //             <BuildManagement />
  //         //         </PrivateRoute>
  //         // },
  //         // {
  //         //     path: "/wedding",
  //         //     element:
  //         //         <PrivateRoute>
  //         //             <WeddingManagement />
  //         //         </PrivateRoute>
  //         // },
  //         // {
  //         //     path: "/task/scheduling",
  //         //     element:
  //         //         <PrivateRoute>
  //         //             <TaskScheduling />
  //         //         </PrivateRoute>
  //         // },
  //         // {
  //         //     path: "/guest/management",

  //         //     element:
  //         //         <PrivateRoute>
  //         //             <GuestManagement />
  //         //         </PrivateRoute>
  //         // },
  //         // {
  //         //     path: "/login",
  //         //     element: <Login />
  //         // },
  //         // {
  //         //     path: "/signup",
  //         //     element: <Signup />
  //         // }

  //     ],
  // }
]);
const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
