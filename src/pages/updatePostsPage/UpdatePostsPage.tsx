import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Box, CircularProgress, Pagination, Typography} from "@mui/material";
import {NotificationContext} from "../../context/NotificationContext.tsx";
import {api} from "../../services/apiService/apiService.ts";
import {Post} from "./types.ts";
import {isTypicalError} from "../../utils/errorTypeHelper.ts";
import {PostsList} from "../../components/postsList/PostsList.tsx";
import {UpdatePostForm} from "../../components/updatePostForm/UpdatePostForm.tsx";
import {AuthContext} from "../../context/AuthContext.tsx";
export const UpdatePostsPage = () => {
  const [fetchingData, setFetchingData] = useState(false)
  const [isUpdatingProcess, setIsUpdatingProcess] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [postCount, setPostCount] = useState(0)
  const [currentPosts, setCurrentPosts] = useState<Post[]>([])
  const [updatingPost, setUpdatingPost] = useState<Post>()
  const {handleSetSnackBarError, handleErrorOpenSnackBar, handleSetSnackBarMessage, handleSuccessOpenSnackBar} = useContext(NotificationContext)
  const {handleUpdateIsAuth} = useContext(AuthContext)
  const getPosts = async () => {
    setFetchingData(true)
    try {
      const response = await api.getAllPosts(currentPage)
      setPostCount(response.data.allPosts.count);
      setCurrentPosts(response.data.allPosts.posts)
    } catch (error) {
      if (isTypicalError(error)) {
        handleSetSnackBarError(error.response.data);
      } else {
        handleSetSnackBarError('sorry, something went wrong');
      }
      handleErrorOpenSnackBar()
      setPostCount(0);
      setCurrentPosts([])
    } finally {
      setFetchingData(false)
    }
  }

  const deletePost = async (postId: number) => {
    const token = localStorage.getItem('khanAuthToken');

    if (!token) {
      handleSetSnackBarError('unauthorized')
      handleErrorOpenSnackBar()
      handleUpdateIsAuth(false)
      return;
    }

    setFetchingData(true)
    try {
      await api.deletePost(postId, token)
      handleSetSnackBarMessage('delete successfully')
      handleSuccessOpenSnackBar()
      await getPosts()
    } catch (error) {
      if (isTypicalError(error)) {
        handleSetSnackBarError(error.response.data);
        if(error.response.data === 'unauthorized') handleUpdateIsAuth(false)
      } else {
        handleSetSnackBarError('sorry, something went wrong');
      }
      handleErrorOpenSnackBar()
    } finally {
      setFetchingData(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [currentPage, ])
  const getNumberOfPages = () => {
    const number = Math.ceil(postCount/ currentPosts.length)
    setNumberOfPages(number)
  }

  useEffect(() => {
    getNumberOfPages()
  }, [postCount])

  const handlePagination = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }

  const handleSetIsUpdatingProcess = (isUpdating: boolean) => {
    setIsUpdatingProcess(isUpdating)
  }

  const handleSetUpdatingPost = (post: Post) => {
    setUpdatingPost(post)
  }

  if (fetchingData) {
    return (
      <Box sx={{
        height:'100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!isUpdatingProcess && currentPosts.length > 0) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        height: '100%'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
        }}>
          <PostsList
            currentPosts={currentPosts}
            handleSetIsUpdatingProcess={handleSetIsUpdatingProcess}
            handleSetUpdatingPost={handleSetUpdatingPost}
            deletePost={deletePost}
          />
        </Box>
        {numberOfPages > 1 && <Pagination
          count={numberOfPages || 1}
          sx={{marginTop: '20px'}}
          onChange={handlePagination}
          page={currentPage}
        />}
      </Box>
    )
  }

  if (updatingPost) {
    return <UpdatePostForm
      updatingPost={updatingPost}
      handleSetIsUpdatingProcess={handleSetIsUpdatingProcess}
      getPosts={getPosts}
    />
  }

  return (
    <Box sx={{
      height:'100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography component="h1" variant="h5">
        No Posts
      </Typography>
    </Box>
  )
};
