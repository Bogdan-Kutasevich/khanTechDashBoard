import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
  Typography
} from "@mui/material";
type Post = {
  adminId: number
  categories: string
  createdAt: string
  id: number
  image: string
  postText: string
  readTime: string
  title: string
  updatedAt: string
}
export const UpdatePostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [postCount, setPostCount] = useState(0)
  const [currentPosts, setCurrentPosts] = useState<Post[]>([])
  const getPosts = async () => {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:3001/post/getAllPosts?page=${currentPage}`,
    });
    setPostCount(response.data.allPosts.count);
    setCurrentPosts(response.data.allPosts.posts)
  }
  useEffect(() => {
    getPosts()
  }, [currentPage])
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

  const listPosts = currentPosts.map((post) =>
    <Card sx={{ maxWidth: 345, maxHeight: 300 }} key={post.id}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={post.image}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.postText.slice(0, 40)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Update
        </Button>
        <Button size="small" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );

  return (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    height: '100%'
  }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap',
    }}>
      {listPosts}
    </Box>
    <Pagination count={numberOfPages || 1} sx={{marginTop: '20px'}} onChange={handlePagination} page={currentPage} />
  </Box>
  )
};
