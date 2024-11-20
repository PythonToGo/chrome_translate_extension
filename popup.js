document.getElementById("translate-button").addEventListener("click", async () => {
    console.log("Translate button clicked!");
  
    const text = document.getElementById("input-text").value;
    const targetLanguage = document.getElementById("language-select").value;
  
    if (!text) {
      document.getElementById("output-text").textContent = "Please enter text to translate.";
      return;
    }
  
    console.log("Sending request to the server...");
  
    try {
      const response = await fetch("http://localhost:3000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text, 
          targetLanguage, 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Translation request failed with status " + response.status);
      }
  
      const data = await response.json();
      console.log("Response received from server:", data); // 응답 확인
      document.getElementById("output-text").textContent = data.translatedText || "Translation failed.";
    } catch (error) {
      console.error("Error during translation:", error);
      document.getElementById("output-text").textContent = "Error: Unable to translate.";
    }
  });
  