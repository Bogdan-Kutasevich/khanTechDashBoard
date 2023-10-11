import {Post} from "../../pages/updatePostsPage/types.ts";

export type SignInResponseType = {
  status: string
  message: string
  jwt: string
}

export type IsAuthResponseType = {
  status: string
  message: string
  authorized: boolean
}

export type CreatePostResponseType = {
  status: string
  message: string
  createdPost: {
    id: number
    title: string;
    categories: string,
    postText: string;
    readTime: string;
    image: string;
    adminId: number
  }
}

export type getAllPostsResponseType = {
  status: string
  message: string
  allPosts: {
    posts: Post[]
    count: number
  }
}