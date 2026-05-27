import os
import re

packages = [
    "application-contracts", "binding", "core", "csnl", "ledger",
    "normalization", "projection", "replay", "sdk", "validation", "workflow-engine"
]

def replace_imports(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    new_content = content
    for pkg in packages:
        # Regex to match relative imports
        # import { something } from '../package/something' or import { something } from '../../package/something'
        # Matches: '../package', '../package/', '../package/something'
        # The regex (\.\.\/|\.\.\/\.\.\/) matches the ../ or ../../
        
        # Single quotes
        pattern = rf"from '(\.\.\/|\.\.\/\.\.\/){pkg}(.*?)'"
        replacement = rf"from '@zensorum/{pkg}\2'"
        new_content = re.sub(pattern, replacement, new_content)
        
        # Double quotes
        pattern_dq = rf'from "(\.\.\/|\.\.\/\.\.\/){pkg}(.*?)"'
        replacement_dq = rf'from "@zensorum/{pkg}\2"'
        new_content = re.sub(pattern_dq, replacement_dq, new_content)

    if content != new_content:
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

# Iterate over all .ts files in packages/
for root, dirs, files in os.walk('packages'):
    for file in files:
        if file.endswith('.ts'):
            replace_imports(os.path.join(root, file))
