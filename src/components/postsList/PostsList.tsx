import {Post} from "../../pages/updatePostsPage/types.ts";
import {PostCard} from "../postCard/PostCard.tsx";
type PostsListProps = {
  currentPosts: Post[],
  handleSetIsUpdatingProcess: (isUpdating: boolean ) => void
  handleSetUpdatingPost: (post: Post) => void
  deletePost: (id: number) => void
}
export const PostsList = ({currentPosts,handleSetIsUpdatingProcess, handleSetUpdatingPost, deletePost } :PostsListProps) => (
  currentPosts.map((post) => <PostCard
    post={post}
    key={post.id}
    handleSetIsUpdatingProcess={handleSetIsUpdatingProcess}
    handleSetUpdatingPost={handleSetUpdatingPost}
    deletePost={deletePost}
  />)
)
