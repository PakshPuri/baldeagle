from http.server import BaseHTTPRequestHandler
import json
import os
from pymongo import MongoClient

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        try:
            body = self.rfile.read(content_length)
            data = json.loads(body)
        except (json.JSONDecodeError, ValueError):
            self._send_response(400, {"success": False, "error": "Invalid JSON body"})
            return

        slug = data.get('slug')
        if not slug:
            self._send_response(400, {"success": False, "error": "Missing 'slug' field"})
            return

        mongo_uri = os.environ.get('MONGO_URI')
        if not mongo_uri:
            self._send_response(500, {"success": False, "error": "MONGO_URI environment variable not set"})
            return

        try:
            client = MongoClient(mongo_uri)
            db = client['portfolio_analytics']
            collection = db['project_clicks']

            # Use an atomic operation to increment click_count, creating the document if it doesn't exist.
            collection.update_one(
                {'slug': slug},
                {'$inc': {'click_count': 1}},
                upsert=True
            )

            self._send_response(200, {"success": True})
        except Exception as e:
            self._send_response(500, {"success": False, "error": str(e)})

    def _send_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
