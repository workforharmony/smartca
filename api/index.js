export default function handler(req, res) {
    console.log("Incoming request:", req.body); // Log request for debugging

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { message, area } = req.body;

    if (!message || !area) {
        return res.status(400).json({ error: "Message or area is missing." });
    }

    res.json({ reply: `SmartCA GPT Response for: '${message}' in '${area}'` });
}
