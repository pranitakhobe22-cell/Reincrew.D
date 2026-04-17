import os
import re

# Precise SVG component to match index.html exactly
NAV_SVG = """<svg class="navbar-logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20 h12 v60 h-12 Z" fill="#1a2b4b"/>
          <path d="M32 25 c25 0 25 25 0 25 M32 50 l25 30 h15 l-25 -30" stroke="#1a2b4b" stroke-width="12" stroke-linecap="round"/>
          <path d="M75 25 c-35 0 -35 50 0 50" stroke="#00a3e0" stroke-width="12" stroke-linecap="round"/>
        </svg>"""

NAVBAR_CSS_FIX = """
    .logo {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -1px;
    }
    .logo span { color: var(--primary); }
    .navbar-logo-icon {
      height: 32px;
      margin-right: 10px;
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

    # 1. Update CSS for logo alignment and icon size
    if '.logo {' in content and 'display: flex;' not in content:
        # Replace the minimal .logo CSS with the full flexbox version
        content = re.sub(r'\.logo\s*\{[^}]*\}', NAVBAR_CSS_FIX.strip(), content)

    # 2. Inject SVG icon into Navbar
    # Target: <div class="logo">Reincrew<span>.AI</span></div>
    logo_pattern = r'(<div class="logo"[^>]*>)\s*Reincrew<span>\.AI</span>'
    content = re.sub(logo_pattern, rf'\1\n        {NAV_SVG}\n        Reincrew<span>.AI</span>', content)

    # 3. Inject SVG icon into Footer
    footer_logo_pattern = r'(<div class="logo footer-logo">)\s*Reincrew<span>\.AI</span>'
    content = re.sub(footer_logo_pattern, rf'\1\n        {NAV_SVG}\n        Reincrew<span>.AI</span>', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Propagated logo icon to {filename}")
