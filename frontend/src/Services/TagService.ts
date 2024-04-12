import TagModel from "@/Models/TagModel";
import axios from "axios";

const API_URL = "http://localhost:3333";

class TagService {
  async getAllTagsForProduct(sku: string): Promise<TagModel[]> {
    const response = await axios.get(`${API_URL}/tags/${sku}`);
    return response.data;
  }

  async addTag(tag: TagModel, productSKU: string): Promise<TagModel> {
    const response = await axios.post(`${API_URL}/tags/add/${productSKU}`, tag);
    return response.data;
  }

  async deleteTag(sku: string): Promise<void> {
    await axios.delete(`${API_URL}/tags/delete/${sku}`);
  }
}

const tagService = new TagService();

export default tagService;
