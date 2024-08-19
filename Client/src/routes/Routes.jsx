import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/Error";
import Register from "../pages/Register/Register";
import Add_item from "../pages/Add_item/Add_item";
import Login from "../pages/Login/Login";
import Privateroute from "./PrivateRoute/PrivateRoute";
import ArtWorkDetails from "../pages/ArtworkDetails/ArtWorkDetails";
import AllItems from "../pages/All Items/AllItems";
import MyItem from "../pages/MyItem/MyItem";
import Update from "../pages/Update/Update";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader:()=> fetch('https://artsio-server.vercel.app/artworks')
      },
      {
        path:'/allitems',
        element:<AllItems/>,
        loader:()=> fetch('https://artsio-server.vercel.app/artworks')

      },
      {
        path: "/register",
        element: <Register />,
      },
       {
        path: "/additem",
        element: (<Privateroute>
          <Add_item />
        </Privateroute>),
        loader:()=> fetch('https://artsio-server.vercel.app/artworks')
      },
       {
        path: "/myitems",
        element: (<Privateroute>
          <MyItem />
        </Privateroute>),
        loader:()=> fetch('https://artsio-server.vercel.app/artworks')
      },
       {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/artwork/:_id",
        element: (<Privateroute>
          <ArtWorkDetails/>
        </Privateroute>),
        loader:()=> fetch('https://artsio-server.vercel.app/artworks')

      },
      {
        path: "/myitems/update/:id",
        element: (<Privateroute>
          <Update/>
        </Privateroute>),
        loader:({params})=> fetch(`https://artsio-server.vercel.app/artworks/${params.id}`)

      }
    ],
  },
]);

export default router;
