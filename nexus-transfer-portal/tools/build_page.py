import base64, io, sys
from PIL import Image
S, N, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
def data_uri(path, width, q=82):
    im = Image.open(path).convert("RGBA")
    h = round(im.height * width / im.width)
    im = im.resize((width, h), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, "WEBP", quality=q, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode(), len(buf.getvalue())
logo_white, n1 = data_uri(N + "/public/img/Nexus-Logo-White__largepreview__.webp", 900)
print("logo white bytes", n1)
src = open(S + "/portal/portal.src.html", encoding="utf-8").read()
frag = src.replace("{{LOGO_WHITE}}", logo_white)
assert "{{" not in frag, "unfilled placeholder"
open(S + "/portal/portal.html", "w", encoding="utf-8").write(frag)
head, body = frag.split("<!-- /head -->", 1)
standalone = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  '<meta name="description" content="The Nexus Staff Transfer Portal. A ThinkNEXT 2026 joke. Stay planted.">\n'
  '<meta name="robots" content="noindex">\n' + head.strip() + '\n</head>\n<body>\n' + body.strip() + '\n</body>\n</html>\n')
open(OUT + "/index.html", "w", encoding="utf-8").write(standalone)
print("fragment chars", len(frag), "standalone chars", len(standalone))
