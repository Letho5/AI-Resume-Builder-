
import { GoogleGenAI } from "@google/genai";

// Fix: Create GoogleGenAI instance inside each function call to ensure it uses the most up-to-date API key.
export const generateResumeSummary = async (profession: string, experiences: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional resume summary for a ${profession}. Here are some key experiences to include: ${experiences.join(', ')}. Keep it under 100 words and make it high-impact.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary. Please try again.";
  }
};

export const improveBulletPoints = async (position: string, description: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Improve these job description bullet points for a ${position} position to be more accomplishment-oriented and ATS-friendly: \n${description}`,
    });
    return response.text || description;
  } catch (error) {
    console.error("Error improving bullet points:", error);
    return description;
  }
};

export const generateProjectDescription = async (projectName: string, role: string, technologies: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional project description for a resume. Project Name: ${projectName}, Role: ${role}, Technologies: ${technologies}. Focus on outcomes and impact. Keep it concise.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating project description:", error);
    return "";
  }
};
