import os
import re

dir_path = 'frontend'
pattern = re.compile(r'const API = [\'"\(].*?;', re.DOTALL)
replacement = "const API = 'http://127.0.0.1:5555';"

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = pattern.sub(replacement, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
