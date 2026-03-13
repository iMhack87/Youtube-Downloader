from flask import Flask, render_template, request, jsonify, send_file
import yt_dlp
import os
import uuid
import tempfile
import time
from threading import Thread

app = Flask(__name__)
temp_dir = tempfile.gettempdir()

def cleanup_file(filepath):
    time.sleep(600)  # On supprime le fichier après 10 minutes
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
        except Exception:
            pass

@app.route('/')
def index():
    url = request.args.get('url', '')
    return render_template('index.html', prefill_url=url)

@app.route('/api/download', methods=['POST'])
def download():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({'error': 'URL manquante'}), 400

    file_id = str(uuid.uuid4())
    outtmpl = os.path.join(temp_dir, f'{file_id}.%(ext)s')

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': outtmpl,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {
            'youtube': {
                'player_client': ['tv', 'ios', 'android']
            }
        }
    }

    # Prise en charge d'un fichier cookies.txt pour contourner le blocage bot YouTube
    if os.path.exists('cookies.txt'):
        ydl_opts['cookiefile'] = 'cookies.txt'

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get('title', 'audio')
            # Nettoyage du titre pour le nom de fichier
            clean_title = "".join([c for c in title if c.isalnum() or c in ' -_']).strip()
            if not clean_title:
                clean_title = "audio"
            
        file_path = os.path.join(temp_dir, f'{file_id}.mp3')
        
        # Lancer le chronomètre de suppression
        Thread(target=cleanup_file, args=(file_path,)).start()
        
        return jsonify({
            'success': True,
            'download_url': f'/api/file/{file_id}?title={clean_title}'
        })

    except Exception as e:
        return jsonify({'error': "Erreur lors du téléchargement. Lien non supporté ou problème technique."}), 500

@app.route('/api/file/<file_id>')
def serve_file(file_id):
    title = request.args.get('title', 'audio')
    file_path = os.path.join(temp_dir, f'{file_id}.mp3')
    
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True, download_name=f"{title}.mp3", mimetype='audio/mpeg')
    
    return "Fichier non trouvé ou expiré.", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)
