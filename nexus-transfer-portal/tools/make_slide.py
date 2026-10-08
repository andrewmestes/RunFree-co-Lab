import base64, io, os, subprocess, sys
import qrcode
from qrcode.constants import ERROR_CORRECT_Q
from PIL import Image
S, N, URL, OUT = sys.argv[1:5]
P = S + "/portal"; os.makedirs(OUT, exist_ok=True)
def data_uri(path, width, q=85):
    im = Image.open(path).convert("RGBA"); h = round(im.height*width/im.width)
    im = im.resize((width, h), Image.LANCZOS); b = io.BytesIO(); im.save(b, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(b.getvalue()).decode()
qr = qrcode.QRCode(version=None, error_correction=ERROR_CORRECT_Q, box_size=20, border=2)
qr.add_data(URL); qr.make(fit=True)
img = qr.make_image(fill_color="#1f1b1c", back_color="white").convert("RGB")
print("QR version", qr.version, "modules", img.size)
img = img.resize((1120, 1120), Image.NEAREST); img.save(OUT + "/qr.png")
b = io.BytesIO(); img.save(b, "PNG"); qr_uri = "data:image/png;base64," + base64.b64encode(b.getvalue()).decode()
tpl = open(P + "/slide.src.html", encoding="utf-8").read()
html = (tpl.replace("{{QR}}", qr_uri).replace("{{URL_SHORT}}", URL.replace("https://", ""))
        .replace("{{LOGO_WHITE}}", data_uri(N + "/public/img/Nexus-Logo-White__largepreview__.webp", 1000))
        .replace("{{THINKNEXT}}", data_uri(N + "/public/img/ThinkNEXT-Logo_white-1024x320__largepreview__.webp", 600)))
assert "{{" not in html
open(P + "/slide.html", "w", encoding="utf-8").write(html)
env = dict(os.environ, NODE_PATH=subprocess.check_output(["npm", "root", "-g"]).decode().strip())
subprocess.run(["node", P + "/render.js", P + "/slide.html", OUT + "/nexus-transfer-portal-slide.png", "1920", "1080", "view"], check=True, env=env, cwd=P)
subprocess.run(["node", P + "/make_pptx.js", OUT + "/nexus-transfer-portal-slide.png", OUT + "/nexus-transfer-portal-slide.pptx", URL], check=True, cwd=S + "/qrnode", env=dict(os.environ, NODE_PATH=S + "/qrnode/node_modules"))
print("done", os.listdir(OUT))
