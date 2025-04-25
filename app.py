from flask import Flask, request, jsonify
from flask_cors import CORS
from gtts import gTTS
from io import BytesIO
import base64

app = Flask(__name__)
CORS(app)

# Supported languages and their codes
LANGUAGES = {
    'english': 'en',
    'hindi': 'hi',
    'spanish': 'es',
    'french': 'fr',
    'german': 'de',
    'japanese': 'ja',
    'korean': 'ko',
    'chinese': 'zh-CN',
    'arabic': 'ar',
    'russian': 'ru',
    'bengali': 'bn',
    'tamil': 'ta',
    'telugu': 'te'
}

@app.route('/pronounce', methods=['POST'])
def pronounce():
    try:
        data = request.json
        word = data.get('word', '').strip()
        language_key = data.get('language', 'english').lower()
        
        if not word:
            return jsonify({"error": "No word provided"}), 400

        lang_code = LANGUAGES.get(language_key, 'en')  # default to English if not found

        # Generate pronunciation using gTTS
        tts = gTTS(text=word, lang=lang_code, slow=False)
        audio_buffer = BytesIO()
        tts.write_to_fp(audio_buffer)
        audio_buffer.seek(0)
        audio_base64 = base64.b64encode(audio_buffer.read()).decode('utf-8')

        # Get human-readable language name
        language_name = language_key.capitalize()

        return jsonify({
            "word": word,
            "pronunciation": "Available",  # Placeholder
            "audio": f"data:audio/mp3;base64,{audio_base64}",
            "language": language_name
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
