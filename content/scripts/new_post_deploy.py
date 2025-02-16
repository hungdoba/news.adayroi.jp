import os
import subprocess
from datetime import datetime

def create_markdown_file(title="Sample Title", content="Sample content goes here.", description="Sample description."):
    # Convert title to slug
    slug = title.lower().replace(' ', '-')
    
    # Get current date for frontmatter
    date = datetime.now().strftime('%Y-%m-%d')
    
    # Create frontmatter
    frontmatter = f"""---
title: {title}
date: {date}
slug: {slug}
description: {description}
---

    {content}"""
    
    # Get the content directory path (two levels up from scripts)
    content_dir = os.path.dirname(os.path.dirname(__file__))
    content_dir = os.path.join(content_dir, 'posts')
    file_path = os.path.join(content_dir, f'{slug}.md')
    
    # Write the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter)
    
    print(f"Created new markdown file: {file_path}")

def deploy_project():
    # Get the project root directory (three levels up from scripts)
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    
    print(project_root)
    
    try:
        # Change to project root directory
        os.chdir(project_root)
        
        # Run build
        result = subprocess.run(['npm', 'run', 'build'], capture_output=True, text=True, shell=True)
        if result.returncode != 0:
            print(f"Build failed with error:\n{result.stderr}")
            return
        print("Build completed successfully")
        
        # Stage all changes
        subprocess.run(['git', 'add', '.'], check=True, shell=True)

        # Commit changes
        commit_msg = f"Build and deploy - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        subprocess.run(['git', 'commit', '-m', commit_msg], check=True, shell=True)

        # Push to remote
        subprocess.run(['git', 'push'], check=True, shell=True)
        print("Changes pushed to remote repository")
    except subprocess.CalledProcessError as e:
        print(f"Process error: {e}")
    except FileNotFoundError:
        print("npm command not found. Make sure Node.js is installed and in your PATH")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    # create_markdown_file()
    
    # Ask for deployment
    # should_deploy = input("Do you want to deploy the project? (y/n): ")
    # if should_deploy.lower() == 'y':
        deploy_project()