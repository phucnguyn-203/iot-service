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
                - "location": the location of the target (e.g., living room, bedroom, toilet, kitchen, all).
                Instruction: ${instruction}
                Please respond with only the JSON format.`;

        const data = await axios.post("http://localhost:11434/api/generate", {
            model: "phi3",
            prompt: `<|system|>Your are my Home AI assistant.<|end|><|user|>${prompt}<|end|><|assistant|>`,
            stream: false,
        });

        let result = "";

        if (data.data.response.includes("```json")) {
            result = JSON.parse(
                data.data.response
                    .trim()
                    .replace(/^\s*```json\s*\n/, "")
                    .replace(/```\s*$/, "")
            );
        } else {
            result = JSON.parse(
                data.data.response.trim().replace(/```\s*$/, "")
            );
        }

        console.log(result);

        if (result.target === "light") {
            if (result.action === "on") {
                switch (result.location) {
                    case "living room":
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
                        break;
                    case "bedroom":
                        set(ref(database, "light2/turn"), "1")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned on",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "toilet":
                        set(ref(database, "light4/turn"), "1")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned on",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "wc":
                        set(ref(database, "light4/turn"), "1")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned on",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "kitchen":
                        set(ref(database, "light3/turn"), "1")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned on",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "all":
                        set(ref(database, "light1/turn"), "1");
                        set(ref(database, "light2/turn"), "1");
                        set(ref(database, "light3/turn"), "1");
                        set(ref(database, "light4/turn"), "1")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "All lights turned on",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    default:
                        res.json({
                            message: "Location not found",
                        });
                }
            } else {
                switch (result.location) {
                    case "living room":
                        set(ref(database, "light1/turn"), "0")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned off",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "bedroom":
                        set(ref(database, "light2/turn"), "0")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned off",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "toilet":
                        set(ref(database, "light4/turn"), "0")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned off",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "wc":
                        set(ref(database, "light4/turn"), "0")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned off",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "kitchen":
                        set(ref(database, "light3/turn"), "0")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "Light turned off",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    case "all":
                        set(ref(database, "light1/turn"), "0");
                        set(ref(database, "light2/turn"), "0");
                        set(ref(database, "light3/turn"), "0");
                        set(ref(database, "light4/turn"), "0")
                            .then(() => {
                                console.log("Data written successfully!");
                                res.json({
                                    message: "All lights turned off",
                                });
                            })
                            .catch((error) => {
                                console.error("Error writing data: ", error);
                            });
                        break;
                    default:
                        res.json({
                            message: "Location not found",
                        });
                }
            }
        }

        if (result.target === "door") {
            if (result.action === "open") {
                set(ref(database, "door/turn"), "1")
                    .then(() => {
                        console.log("Data written successfully!");
                        res.json({
                            message: "Door opened",
                        });
                    })
                    .catch((error) => {
                        console.error("Error writing data: ", error);
                    });
            } else {
                set(ref(database, "door/turn"), "0")
                    .then(() => {
                        console.log("Data written successfully!");
                        res.json({
                            message: "Door closed",
                        });
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
