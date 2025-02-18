export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any website
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

    res.json({ reply: `SmartCA GPT Response for: '${message}' in '${area}'` });
}
