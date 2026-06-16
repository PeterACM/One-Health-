/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        // Safe, graceful fallback response when API key is not configured yet
        return res.json({
          text: "Hi! I'm the One Health AI Companion. It looks like you haven't set the GEMINI_API_KEY in your Secrets configuration yet. Once added in the Settings > Secrets section, I can answer your physical and spiritual stewardship queries in detail via Gemini. I can still navigate you around the portal: try telling me 'take me to projects', 'show gallery' or 'open contact' to trigger immediate section switching.",
          navigateTo: detectOfflineNavigation(message)
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare contents including history format
      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.text }]
          });
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: `You are "One Health AI Assistant", a compassionate, premium, and professional AI companion for visitors of the One Health organization's platform.
One Health delivers holistic healing, healthcare, gospel missions, mobile trailer dental clinics (ToothKeepers), vertical organic agriculture, and environmental stewardship across Durban townships and Africa (focusing currently on Durban South Africa and Zimbabwe).

Provide supportive, concise, informative answers in response to user queries.

CRITICAL FEATURE: You can navigate visitors to specific sections of the website relative to what they are asking for or looking at. Only append a "navigateTo" value if they explicitly or implicitly request navigation or are asking about a topic predominantly covered in that view.
Available navigation targets:
- "about": Story, foundation, pioneer team, and holism philosophy.
- "gospel": The convergence of gospel and mobile healthcare trailer missions.
- "projects": ToothKeepers mobile clinics, Africa surgical missions (Zimbabwe focus), and maternal/child nourishment programs.
- "beneficiaries": Client testimonials, before/after stories, Durban communities.
- "gallery": Immersive media reel, operational trailers, field clinics.
- "impact": Cumulative diagnostic stats, real-time Section 18C compliance metrics.
- "participate": Volunteer routing, sponsorship programs, corporate association forms.
- "contact": Secure routing system coordinates, pro-bono healthcare referrals.

Your output MUST be a valid JSON object matching this schema:
{
  "text": "Your helpful response message (markdown friendly)",
  "navigateTo": "about" | "gospel" | "projects" | "beneficiaries" | "gallery" | "impact" | "participate" | "contact" | null
}
If no navigation is request or suitable, navigateTo should be null. Do not add any text wrappers or markdown code fences like \`\`\`json outside the JSON output.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: {
                type: Type.STRING,
                description: "The main text response from the assistant, answering the user's questions or providing welcoming guidance."
              },
              navigateTo: {
                type: Type.STRING,
                description: "The key of the section to navigate to, if relevant. Must be one of: 'about', 'gospel', 'projects', 'beneficiaries', 'gallery', 'impact', 'participate', 'contact', or null."
              }
            },
            required: ["text", "navigateTo"]
          }
        }
      });

      const jsonText = response.text || "{}";
      const parsed = JSON.parse(jsonText.trim());
      res.json(parsed);

    } catch (error) {
      console.error("AI service error:", error);
      res.status(500).json({
        text: "I apologize, I encountered a temporary network issue. Please ask again in a moment.",
        navigateTo: null
      });
    }
  });

  // Simple heuristic navigation helper if Gemini key is not configured yet
  function detectOfflineNavigation(msg: string): string | null {
    const text = (msg || "").toLowerCase();
    if (text.includes("project") || text.includes("initiative") || text.includes("toothkeeper")) return "projects";
    if (text.includes("contact") || text.includes("address") || text.includes("referral")) return "contact";
    if (text.includes("gospel") || text.includes("spiritual") || text.includes("clinic")) return "gospel";
    if (text.includes("volunt") || text.includes("partner") || text.includes("sponsor") || text.includes("donate")) return "participate";
    if (text.includes("impact") || text.includes("stat") || text.includes("metric")) return "impact";
    if (text.includes("gallery") || text.includes("photo") || text.includes("video")) return "gallery";
    if (text.includes("beneficiar") || text.includes("testimonial") || text.includes("story")) return "beneficiaries";
    if (text.includes("about") || text.includes("story") || text.includes("team")) return "about";
    return null;
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
