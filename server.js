app.post("/translate", async (req, res) => {
    console.log("Request received at server:", req.body); 
  
    const { text, targetLanguage } = req.body;
  
    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "auto",
          target: targetLanguage,
          format: "text",
        }),
      });
  
      if (!response.ok) {
        throw new Error("LibreTranslate API failed with status " + response.status);
      }
  
      const data = await response.json();
      console.log("Response from LibreTranslate:", data); // print response
      res.json({ translatedText: data.translatedText });
    } catch (error) {
      console.error("Error in server:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
  