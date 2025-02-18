export default async function handler(req, res) {
    console.log("Incoming request:", req.method, req.headers, req.body); // Debugging logs

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    let requestData;
    
    try {
        requestData = req.body; // Read request body
    } catch (error) {
        console.error("Error parsing request:", error);
        return res.status(400).json({ error: "Invalid request format." });
    }

    const { message, area } = requestData;

    if (!message || !area) {
        return res.status(400).json({ error: "Message or area is missing." });
    }

    res.json({ reply: `SmartCA GPT Response for: '${message}' in '${area}'` });
}
