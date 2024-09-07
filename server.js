const express = require("express");
const axios = require("axios");
const app = express();

const { database, ref, set, get } = require("./firebase");

app.use(express.json());

app.post("/api", async (req, res) => {
    try {
        const instruction = req.body.instruction;

        const prompt = `Create a JSON object based on the following instruction. The JSON object should contain:
                - "target": the target of the action (e.g., light, or media).
                - "action": the action to perform (e.g., on, off, or play).
                - "content": the content to search (return "" if not specified).
                Instruction: ${instruction}
                Please respond with only the JSON format.`;

        const data = await axios.post("http://localhost:11434/api/generate", {
            model: "phi3",
            prompt: `<|user|>\n${prompt}<|end|>\n<|assistant|>`,
            stream: false,
        });

        const result = JSON.parse(
            data.data.response
                .trim()
                .replace(/^\s*```json\s*\n/, "")
                .replace(/```\s*$/, "")
        );

        if (result.target === "light") {
            if (result.action === "on") {
                set(ref(database, "light1/turn"), "1")
                    .then(() => {
                        console.log("Data written successfully!");
                        res.json({
                            message: "Light turned on",
                        });
                    })
                    .catch((error) => {
                        console.error("Error writing data: ", error);
                    });
            } else {
                set(ref(database, "light1/turn"), "0")
                    .then(() => {
                        res.json({
                            message: "Light turned off",
                        });
                        console.log("Data written successfully!");
                    })
                    .catch((error) => {
                        console.error("Error writing data: ", error);
                    });
            }
        }
    } catch (error) {
        console.error("Error processing the request:", error);
        res.status(500).json({
            error: "Failed to process the request",
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
