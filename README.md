This repository is far from being functional and it doesn't work -- at all.

Security isn't a matter (at the moment), since I'm just trying to accomplish what I want first. I'll worry about making the whole thing secure after.

The objective: an online converter where the client uploads a .py file (python script), clicks on 2-3 buttons and converts flawlessly his python script into a standalone Windows executable that he can then download & share with his friends who don't have Python installed. Basically converting a Python script into a real, shareable, Windows executable.

I'm using PyInstaller to convert my .py file to a Windows .exe file. But it doesn't really matter. I need to run multiple shell commands, like moving the file from one folder to another, creating a new (unique) folder, etc..

The problem -> I want to start the conversion (so, running the first shell command, like creating an empty folder for later use), THEN make the progress bar go from 0% to 10%, THEN run the second command line, THEN make the progress bar go from 10% to 40%, and so on until the very last operation is run and my progress bar is at 100%.

Thanks for your help, fellow programmer!
