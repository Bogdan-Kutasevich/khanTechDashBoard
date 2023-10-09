import { createBrowserRouter } from 'react-router-dom';
import {MainLayout} from "../layouts/mainLayout/MainLayout.tsx";
import {ErrorPage} from "../pages/errorPage/ErrorPage.tsx";
import {HomePage} from "../pages/homePage/HomePage.tsx";
import {CreatePostPage} from "../pages/createPostPage/CreatePostPage.tsx";
import {UpdatePostsPage} from "../pages/updatePostsPage/UpdatePostsPage.tsx";
import {LogoutPage} from "../pages/logoutPage/LogoutPage.tsx";
import {NotFoundPage} from "../pages/notFoundPage/NotFoundPage.tsx";
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: '/createPost',
        element: <CreatePostPage />,
      },
      {
        path: '/updatePosts',
        element: <UpdatePostsPage />,
      },
      {
        path: '/logout',
        element: <LogoutPage />,
      },
      {
        path: '/notFound',
        element: <NotFoundPage />,
      },

    ],
  },
]);
