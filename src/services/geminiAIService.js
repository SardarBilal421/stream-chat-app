const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/env");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateAIResponse = async (userMessage, context) => {
  const prompt = `
    You are an AI coding coach. The learner said: "${userMessage}". 
    Their current learning context is: ${JSON.stringify(context)}. 
    ${
      context.initial_context
        ? `Their initial question/goal was: ${context.initial_context}.`
        : ""
    }
    Provide helpful guidance and feedback as their coach. Your answer should not be too long.
    It should not be longer than 4 lines.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    if (!result || !result.response)
      throw new Error("No response received from Gemini AI");
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini AI:", error);
    return error.status === 503
      ? "I'm currently experiencing high load. Please try again in a moment."
      : "I apologize, but I'm having trouble responding right now. Please try again later.";
  }
};

module.exports = { generateAIResponse };
