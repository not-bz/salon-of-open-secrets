# Salon of Open Secrets

"Salon of Open Secrets" is a Citizen Science project that navigates the topic of Climate Crisis through various workshops called "salons". Here is the open source interactive webpage.


# Setup

1) Install [Gulp](http://gulpjs.com/) and [NPM](http://nodejs.org) if you do not already have them.

2) On the console change directory to the location of the gulp file

3) Install npm dependencies
```
npm install
```

3) Run Gulp
```
gulp
```

# Functionality

This is an interactive narrative that engages the visitors in a maze of several informational videos on the topic of Climate Crisis. Following a series of questions, one can navigate the content through different paths and continuously encounter different themes and informations.

All the data is prepared in a JSON file, that is injected into the HTML with a template, using gulp and most magic happens on the JS side. The navigation commands, video control, transitions, menu and modal are programmed with JavaScript.

Additionally, there is a php file used to for analytics. When a visitor reaches the end of a path, a php request is sent to record which end point was selected, and exports the data to a json file.


# Usage

This platform was built with [Gulp](http://gulpjs.com/)
It’s a toolkit used to compile SCSS files and to automate the process of templating the html with json files filled with data.

In order to set it up on your local machine, simply download or clone the repository. Gulp and the necessary libraries need to be installed - for this use the command line at the location of the gulp file. Finally, execute gulp and the website will run locally.

Edits should be done only in the “dev” folder, where all project specific CSS, HTML, JSON and HTML template files are located. Gulp compiles them and exports the an output folder “web”. This is the folder that is upload to the final web server including external libraries and media files.


# Information

This repository is the digital side of the “Salon of Open Secrets” project, an open source webpage developed by “not bz studio” - [not bz](http://not-bz.com/) 

Website can be viewed here - [Salon of Open Secrets](http://salonofopensecrets.at/) 
Visit for more information about the projects and the persons involved.

