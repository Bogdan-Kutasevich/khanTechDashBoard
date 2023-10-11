import axios from "axios";
import {CreatePostFields} from "../../pages/createPostPage/types.ts";
import {CreatePostResponseType, getAllPostsResponseType, IsAuthResponseType} from "./apiTypes.ts";

export class ApiService {
  private baseUrl = 'http://localhost:3001'

  async createPost(token: string, data: CreatePostFields) {
    await axios<CreatePostResponseType>({
      method: 'POST',
      url: `${this.baseUrl}/post`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data
    });
  }

  async updatePost(token: string, data: CreatePostFields, updatingPostId: number) {
    await axios<CreatePostResponseType>({
      method: 'PATCH',
      url: `${this.baseUrl}/post/${updatingPostId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data
    });
  }

  async deletePost(id:number, token: string) {
    await axios({
      method: 'DELETE',
      url: `${this.baseUrl}/post/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async isAuth(token: string) {
    return axios<IsAuthResponseType>({
      method: 'GET',
      url: `${this.baseUrl}/admin/isAuth`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async getAllPosts(currentPage: number) {
    return axios<getAllPostsResponseType>({
      method: 'GET',
      url: `${this.baseUrl}/post/getAllPosts?page=${currentPage}`,
    });
  }

  async uploadImage(formData:  FormData) {
    await axios.post(`${this.baseUrl}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const api =  new ApiService()