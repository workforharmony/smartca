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
        // Call SmartCA GPT's Action API
        let gptResponse = await fetch("https://smartca-backend.vercel.app/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message, area })
        });

        let data = await gptResponse.json();
        let reply = data.reply || "Sorry, I couldn't generate a response.";

        res.json({ reply });
    } catch (error) {
        console.error("Error talking to SmartCA GPT:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
