from http.server import BaseHTTPRequestHandler
import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        # Read JSON body
        content_length = int(self.headers.get('Content-Length', 0))
        try:
            data = json.loads(self.rfile.read(content_length))
        except json.JSONDecodeError:
            self._respond(400, {'error': 'Invalid JSON'})
            return

        visitor_email   = data.get('visitor_email', '').strip()
        email_subject   = data.get('email_subject', '').strip()
        visitor_phone   = data.get('visitor_phone', 'Not provided').strip()
        visitor_message = data.get('visitor_message', '').strip()

        if not all([visitor_email, email_subject, visitor_message]):
            self._respond(400, {'error': 'Missing required fields'})
            return

        # These come from Vercel environment variables — never hardcode them
        gmail_address      = os.environ.get('GMAIL_ADDRESS')
        gmail_app_password = os.environ.get('GMAIL_APP_PASSWORD')

        if not gmail_address or not gmail_app_password:
            self._respond(500, {'error': 'Email credentials not set in environment variables'})
            return

        # Build email
        msg = MIMEMultipart()
        msg['Subject']  = f'Portfolio Contact: {email_subject}'
        msg['From']     = gmail_address
        msg['To']       = gmail_address   # sends to yourself
        msg['Reply-To'] = visitor_email   # so replying goes straight to the visitor

        body = f"""New message from your portfolio contact form.

From:    {visitor_email}
Phone:   {visitor_phone}
Subject: {email_subject}

--- Message ---
{visitor_message}
"""
        msg.attach(MIMEText(body, 'plain'))

        # Send via Gmail
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(gmail_address, gmail_app_password)
                server.sendmail(gmail_address, gmail_address, msg.as_string())
        except smtplib.SMTPAuthenticationError:
            self._respond(500, {'error': 'Gmail auth failed — double-check your App Password in Vercel env vars'})
            return
        except Exception as e:
            self._respond(500, {'error': f'Failed to send: {str(e)}'})
            return

        self._respond(200, {'ok': True})

    def _respond(self, status, body):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(body).encode())

    def log_message(self, format, *args):
        pass  # keeps Vercel function logs clean