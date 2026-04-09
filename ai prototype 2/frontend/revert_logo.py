import os
import re

# The SVG pattern to find (based on my previous injection)
SVG_PATTERN = r'<svg class="navbar-logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">[\s\S]*?</svg>'

# The replacement image tag
IMG_TAG = '<img src="logo.png" class="logo-icon" alt="Logo">'

# CSS Fix to ensure .logo-icon works for images
CSS_FIX = """
    .logo-icon {
      height: 32px;
      width: auto;
      vertical-align: middle;
      margin-right: 12px;
      mix-blend-mode: multiply;
    }
"""

frontend_dir = r'c:\Users\disha\OneDrive\Desktop\ai prototype 2\frontend'
html_files = [f for f in os.listdir(frontend_dir) if f.endswith('.html')]

for filename in html_files:
    if filename == 'index.html':
        continue
        
    path = os.path.join(frontend_dir, filename)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace the SVG with the IMG tag
    content = re.sub(SVG_PATTERN, IMG_TAG, content)

    # 2. Update .navbar-logo-icon CSS to .logo-icon if it exists
    if '.navbar-logo-icon' in content:
        content = content.replace('.navbar-logo-icon', '.logo-icon')
    
    # 3. Ensure the CSS fix is present
    if '.logo-icon {' not in content:
        # Inject at the end of the style block or before .logo
        if '.logo {' in content:
            content = content.replace('.logo {', CSS_FIX.strip() + '\n    .logo {')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Reverted logo to image in {filename}")
