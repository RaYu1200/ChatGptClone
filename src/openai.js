import OpenAIApi from "openai";

const openai = new OpenAIApi({
    apiKey: "add_your_api_key",
    dangerouslyAllowBrowser: true,
});

export default openai;