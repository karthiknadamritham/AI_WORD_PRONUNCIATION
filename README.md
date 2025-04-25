# **Pronunciation Assistant**  

**A web-based tool for instant, accurate word pronunciations in multiple languages.**  

## **📌 Overview**  
The **Pronunciation Assistant** is a responsive web application designed to help users learn correct word pronunciations in **12+ languages**, including English, Hindi, Spanish, French, and more. It leverages **Google Text-to-Speech (gTTS)** to generate real-time audio pronunciations, making language learning more interactive and accessible.  

---

## **✨ Key Features**  
✅ **Multi-Language Support** – Pronounce words in **12+ languages** (English, Hindi, Spanish, French, German, etc.).  
✅ **Instant Audio Playback** – Hear pronunciations immediately with an embedded audio player.  
✅ **Word Suggestions** – Real-time word suggestions as you type (powered by **Datamuse API**).  
✅ **Session History** – Track recently searched words (stored in `sessionStorage`).  
✅ **Dark/Light Mode** – User-friendly theme toggle for comfortable viewing.  
✅ **No Login Required** – Try it instantly, with an option to sign up for extended features.  
✅ **Responsive Design** – Works seamlessly on **desktop, tablet, and mobile**.  

---

## **🛠️ Tech Stack**  
| **Category**       | **Technology** |  
|--------------------|---------------|  
| **Frontend**       | HTML5, CSS3, JavaScript (Vanilla) |  
| **Backend**        | Python (Flask) |  
| **Text-to-Speech** | Google TTS (`gTTS`) |  
| **Word Suggestions** | Datamuse API |  
| **State Management** | `localStorage` (login), `sessionStorage` (history) |  
| **Styling**        | Custom CSS + Font Awesome Icons |  

---

## **🚀 How It Works**  
1. **User Input** → Type a word (e.g., "नमस्ते") and select a language (e.g., Hindi).  
2. **Backend Processing** → Flask sends the word to **gTTS**, which generates an MP3 audio clip.  
3. **Frontend Playback** → The app converts audio to **Base64** and plays it instantly without file downloads.  
4. **History Tracking** → Recent words are stored in `sessionStorage` for quick reference.  

---

## **🔧 Setup & Installation**  
### **Prerequisites**  
- Python 3.8+  
- Flask (`pip install flask flask-cors`)  
- gTTS (`pip install gtts`)  

### **Running Locally**  
1. Start the Flask server:  
   ```sh
   python app.py  
   ```  
3. Open `index.html` in a browser.  

---

## **🎯 Future Enhancements**  
- [ ] **Voice Input** – Allow users to speak words instead of typing.  
- [ ] **Phonetic Transcriptions** – Display IPA notations for pronunciations.  
- [ ] **User Accounts** – Save pronunciation history across devices.  
- [ ] **More Languages** – Expand support to 50+ languages.  

---

## **📜 License**  
This project is licensed under **MIT License** – see [LICENSE](LICENSE) for details.  

---

## **💡 Contributing**  
Feel free to fork, suggest improvements, or report issues!  

🔗 **GitHub Repo:** https://github.com/karthiknadamritham/AI_WORD_PRONUNCIATION

--- 

**🌟 Enjoy learning pronunciations effortlessly!** 🎤🌍  

---

### **Why This Stands Out**  
Unlike apps that require downloads or logins, this tool provides **instant, free, and offline-friendly** pronunciation help—ideal for students, travelers, and language enthusiasts.  

