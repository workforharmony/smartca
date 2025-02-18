export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (Fix CORS)
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Handle CORS preflight
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { message, area } = req.body;

    if (!message || !area) {
        return res.status(400).json({ error: "Message or area is missing." });
    }

    try {
        // Call SmartCA GPT API
        let gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_OPENAI_API_KEY` // Replace with your OpenAI API Key
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: `You are SmartCA GPT, an AI financial assistant specializing in '${area}'.` },
                    { role: "user", content: message }
                ]
            })
        });

        let data = await gptResponse.json();
        console.log("OpenAI Response:", data); // Debugging logs

        let reply = data.choices && data.choices.length > 0 ? data.choices[0].message.content : "Sorry, I couldn't generate a response.";

        res.json({ reply });
    } catch (error) {
        console.error("Error talking to GPT:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
