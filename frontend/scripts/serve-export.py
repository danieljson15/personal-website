"""Serve the static export locally with the same base path as GitHub Pages."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote
import os

ROOT = Path(__file__).resolve().parents[1] / 'out'

class ExportHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        route = unquote(urlsplit(path).path)
        if route.startswith('/personal-website'):
            route = route[len('/personal-website'):]
        target = (ROOT / route.lstrip('/')).resolve()
        if not target.is_relative_to(ROOT):
            return str(ROOT / '404.html')
        if not target.suffix and target.with_suffix('.html').is_file():
            target = target.with_suffix('.html')
        elif target.is_dir():
            target = target / 'index.html'
        elif not target.exists() and not target.suffix:
            target = target.with_suffix('.html')
        return str(target)

if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', int(os.environ.get('PORT', '3100'))), ExportHandler).serve_forever()
