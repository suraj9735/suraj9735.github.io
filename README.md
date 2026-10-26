# Suraj Kumar – portfolio website

Multipage static site: Home, Research, Interactive Lab, Tutorials, Exercises, Quiz, Blog.

## Run locally
Double-click `start.bat`, or from this folder run:

    python -m http.server 8001

Then open http://localhost:8001

## Add your content (edit `js/content.js`)
- PROFILE: name, about text, skills, timeline, links (email, Scholar, LinkedIn, GitHub, YouTube, CV), photo.
- RESEARCH.publications: your papers.
- TUTORIALS: set `youtube` to the video id (the part after `v=`), or copy an .mp4 into
  `assets/videos/` and set `file: "assets/videos/name.mp4"`.
- EXERCISES: question, hint, solution, numeric answer for the Check box.
- QUIZZES: add questions or whole new quiz topics.
- POSTS: blog posts (body is HTML). Newest first.
- GIFS: add your own GIFs in `assets/gifs/` and list them here.

## Regenerate the spring-mass GIFs
    pip install numpy matplotlib pillow
    python tools/make_gifs.py

## Put it online for reviewers
The folder is a plain static site, so it can be uploaded as-is to GitHub Pages, Netlify or similar.
