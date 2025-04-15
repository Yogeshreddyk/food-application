import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./Components/Header";
import { Body } from "./Components/Body";
import About from "./Components/About";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error from "./Components/Error";
//import Contact from "./Components/Contact";
import RestraurantsMenu from "./Components/RestraurantsMenu";
import { Shimmer } from "./Components/Shimmer";
import UserContext from "./Utils/UserContext";
import Footer from "./Components/Footer";
import appStore from "./Utils/AppStore";
import { Provider } from "react-redux";
import Cart from "./Components/Cart";
import PlaceOrder from "./Components/PlaceOrder";

// const heading = React.createElement(
//   "h1",
//   { id: "heading" },
//   "Hello world from React"
// );

{
  /* <div id="parent">
  <div id="child">
    <h1> I am an H1 Tag</h1>
    <h2> I am an H2 Tag</h2>
  </div>
</div> */
}

// const heading1 = React.createElement(
//   "div",
//   {},
//   React.createElement("div", {}, [
//     React.createElement("h1", {}, "NAMSTE REACT abc "),
//     React.createElement("h2", {}, "I am a h2 tag"),
//   ])
// );



// const root = ReactDOM.createRoot(document.getElementById("parent"));
// root.render(heading1);

// const headings = React.createElement("h5", { id: "heading" }, "hai Yogesh");

// const jsxHeading = <h1 id="heading">Namaste React!!!!!!</h1>;

// const root = ReactDOM.createRoot(document.getElementById("root"));

// const Ht1 = ()=><h1>This is the first heading</h1>;

//React Component

const ContactComponent = lazy(() => import("./Components/Contact"));

const AppLayout = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const data = {
      name: "Yogesh",
    };
    setUserName(data?.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app bg-red-50 h-full">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>Loaading</h1>}>
            <ContactComponent />
          </Suspense>
        ),
      },
      {
        path: "/restraurantDetails/:id",
        element: <RestraurantsMenu />,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Loading</h1>}>
            <Cart />
          </Suspense>
        ),
       
      },
      {
        path: "/placeOrder", 
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <PlaceOrder />
          </Suspense>
        ),
      },
     
    ],
  },
]);

root.render(<RouterProvider router={appRouter} />);
