import {
    createBrowserRouter
} from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import Register from "../pages/Register/Register";
import UpcomingEvents from "../components/UpcomingEvents";
import CreateEvents from "../pages/ManageEvent/CreateEvents";
import EventDetails from "../pages/ManageEvent/EventDetails";
import JoinedEvents from "../pages/ManageEvent/JoinedEvents";
import ManageEvents from "../pages/ManageEvent/ManageEvents";
import Profile from "../pages/ManageEvent/Profile";
import UpdateEvents from "../pages/ManageEvent/UpdateEvents";
import PrivateRoutes from "../routes/PrivateRoutes";
import ErrorPage from "../pages/shared/ErrorPage";
import Blogs from "../AllBlogs/Blogs";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signIn",
                element: <SignIn />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/upcomingEvents",
                element: <UpcomingEvents />
            },
            {
                path: "/createEvents",
                element: <PrivateRoutes><CreateEvents /></PrivateRoutes>
            },
            {
                path: "/events/:id",
                element: <PrivateRoutes><EventDetails /></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://a11-act-for-bd-server.vercel.app/events/${params.id}`)
            },
            {
                path: "/joinedEvents",
                element: <PrivateRoutes><JoinedEvents /></PrivateRoutes>
            },
            {
                path: "/manageEvents",
                element: <PrivateRoutes><ManageEvents /></PrivateRoutes>
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>
            },
            {
                path: "/profile",
                element: <PrivateRoutes><Profile /></PrivateRoutes>
            },
            {
                path: "/updateEvent/:id",
                element: <PrivateRoutes><UpdateEvents /></PrivateRoutes>
            },
            {
                path: '/joinedEvents',
                element: <PrivateRoutes><JoinedEvents></JoinedEvents></PrivateRoutes>
            },
            {
                path: "*",
                element: <ErrorPage />
            }
        ]
    }
]);

