---
title: "The kool kid way to update my website!"
date: 2026-07-02
description: "Not a tutorial ;)"
---
Previously I mentioned [I made this site with HUGO]({{% ref "first-post.md" %}}). Until now I was updating the website by compiling locally, uploading via SCP, SSH'ing into my server and moving files manually, like this:
```bash
cd $HUGO_WEBSITE_ROOT
hugo --gc --minify
scp private/ <user>@gallery.projectrojo.net:~
ssh <user>@gallery.projectrojo.net
rm -rf /var/www/<website_root>
mv private/ /var/www/<website_root>
```

As you can probably see, it was a lot of steps!

I started using GitHub Actions for this. I just needed to host the server files in a GitHub repository and add an actions file. In short, Github Actions lets you automate your CI/CD by spinning up a VPS that runs a script from a YAML file stored in the repository, will I share the file? Nah, I doubt it could be used against me but I'd rather not do it.

Basically it does the following whenever a push to main is performed:
1. Starts an Ubuntu VM.
2. Clones my repository.
3. Installs HUGO.
4. Compiles my files.
5. Clones my compiled website via rsync to my production server.

I do need to store an SSH key in GitHub (which I'm not entirely confortable doing), but that's safe as my account is protected by MFA (**always use MFA**). GitHub actions is also free up to 2,000 minutes/month, since a single run takes ~5 minutes that's around 400 updates a month... if I ever find myself
updating this website that much it'll probably mean I have bigger problems since I mainly shoot film :)

Well, remember the steps from the start? Of course you do because my blog entries are not that long, my current workflow is just the below:
```bash
git add <changed files>
git commit [-m <whatever commit message>]
git push -u origin main
```

I am considering creating a bash function for these, just so I have to press the up arrow even less! In all seriousness, it's a great improvement, I just run these commands and go do something else for 5 minutes, if it fails I get an email, if I don't get anything it means it worked!