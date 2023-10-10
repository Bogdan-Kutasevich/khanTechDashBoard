import { createBrowserRouter } from 'react-router-dom';
import {MainLayout} from "../layouts/mainLayout/MainLayout.tsx";
import {CreatePostPage} from "../pages/createPostPage/CreatePostPage.tsx";
import {UpdatePostsPage} from "../pages/updatePostsPage/UpdatePostsPage.tsx";
import {LogoutPage} from "../pages/logoutPage/LogoutPage.tsx";
import {NotFoundPage} from "../pages/notFoundPage/NotFoundPage.tsx";
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        element: <CreatePostPage />,
        index: true,
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
