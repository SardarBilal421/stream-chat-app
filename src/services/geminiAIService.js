const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config/env");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const generateAIResponse = async (userMessage, context, isFirstMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt;
    if (isFirstMessage) {
      prompt = `You are an AI coding coach. The learner has just started with this initial message: "${userMessage}".
        This is their first interaction, so please:
        1. Acknowledge their goal/question
        2. Provide a brief, focused response
        3. Keep the response under 4 lines
        Your response will set the tone for the coaching session.`;
    } else {
      prompt = `You are an AI coding coach. The learner said: "${userMessage}".
        Their initial question/goal was: ${context.initial_context}.
        Previous conversation context: ${JSON.stringify(
          context.conversation.slice(-3)
        )}.
        Provide a focused response that builds on the previous context.
        Keep your response under 4 lines.`;
    }

    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      throw new Error("No response received from Gemini AI");
    }
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini AI:", error);
    return error.status === 503
      ? "I'm currently experiencing high load. Please try again in a moment."
      : "I apologize, but I'm having trouble responding right now. Please try again later.";
  }
};

module.exports = {
  generateAIResponse,
};
