import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
class AiService {
  async getProducts(productNum = 1, subject?: string) {
    const openai = new OpenAI();
    const GPT_TOKEN = process.env.GPT_API_KEY;
    const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

    subject = subject || "random";

    const query = `
        I want you to respond to me like you are an API.
        I want you to return to me a response with only values of ${productNum} fictional products with the subject: "${subject}", 
        do not provide any explanatory text (only the json object), 
        only the requested values in the following format, 
        I want you to generate NEW fictional YET REALISTIC values and place them all in a "results" array in the JSON you provide, I want the response in JSON:
        {
            "name": "test4",
            "count": 2,
            "price": 100,
            "providerPrice": 80,
            "brand": "testBrand2",
            "imageUrl": "",
            "notes": "A good product for an excellent price",
            "tags": [
                {
                    "color": "#4E4BA4",
                    "message": "This is a tag"
                }
            ]
        }
        `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: query }],
      model: "gpt-3.5-turbo",
    });

    const gptResult = completion.choices[0];

    const imageQuery = "Nature";

    const imageUrl = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${imageQuery}&per_page=1`,
      {
        headers: {
          Authorization: "Client-ID " + UNSPLASH_API_KEY,
        },
      }
    );
  }
}

const aiService = new AiService();

export default aiService;
