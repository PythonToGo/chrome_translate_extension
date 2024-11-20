chrome.runtime.onInstalled.addListener(() => {
    console.log("LibreTranslate Translator Extension Installed");
  });
  
  async function translateTextLibre(text, targetLanguage) {
    try {
      const response = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: "auto", // 언어 자동 감지
          target: targetLanguage,
          format: "text",
        }),
      });
  
      if (!response.ok) {
        console.error("LibreTranslate API Error:", response.statusText);
        return "Error: Unable to translate.";
      }
  
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error("Error during translation:", error);
      return "Error: Translation failed.";
    }
  }
  
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("Message received in background.js:", message); // 메시지 수신 로그
    if (message.action === "translate") {
      const { text, targetLanguage } = message;
      const result = await translateTextProxy(text, targetLanguage);
      console.log("Sending response back to popup.js:", result); // 응답 로그
      sendResponse({ result });
    }
    return true; // Keep the messaging channel open for async response
});


  