import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Post} from "../../pages/updatePostsPage/types.ts";
type PostCardProps = {
  post: Post
  handleSetIsUpdatingProcess: (isUpdating: boolean) => void
  handleSetUpdatingPost: (post: Post) => void
  deletePost: (id: number) => void
}
export const PostCard = ({post, handleSetIsUpdatingProcess, handleSetUpdatingPost, deletePost}: PostCardProps) => {
  const setUpdate = () => {
    handleSetIsUpdatingProcess(true)
    handleSetUpdatingPost(post)
  }
  return (
    <Card sx={{width: 150, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <CardActionArea>
        {post.image ?
          <CardMedia
            component="img"
            height="140"
            image={post.image}
            alt="image"
          />
          : <Box
            sx={{height: '140px'}}
          />}
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
        <Button size="small" color="primary" onClick={setUpdate}>
          Update
        </Button>
        <Button size="small" color="error" onClick={() => deletePost(post.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}