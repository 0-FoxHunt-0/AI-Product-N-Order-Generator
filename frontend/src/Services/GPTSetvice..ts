import axios from "axios";

class GPTService {
  async getProducts(productNum: number) {
    // Define your query
    const query = `
        I want you to respond to me like you are an API.
        I want you to return to me a response with only values of fictional products and no explanatory response (only the json object), only the requested values in the following format, I want you to generate NEW fictional values:
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

    // Define your request parameters
    const params = {
      model: "text-davinci-003", // This is the GPT-3.5 model you want to use
      prompt: query,
      max_tokens: 50, // Adjust this according to your desired response length
      temperature: 0.7, // Adjust this for more or less creative responses
    };

    axios
      .post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        params,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_KEY_HERE", // Replace with your actual API key
          },
        }
      )
      .then((response) => {
        console.log(response.data.choices[0].text.trim());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

const gptService = new GPTService();

export default gptService;
