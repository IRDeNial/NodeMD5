NodeMD5
=======
Open Source MD5 Hash And Reverse Web Application

## About
**NodeMD5** is a simple web application powered by Node.JS and built on a MEAN (Mongo, Express, Angler, Nginx) stack.

**Demo**: [http://md5.xyz](http://md5.xyz)

## Screenshots
![http://i.imgur.com/GZJ4x1A.png](http://i.imgur.com/GZJ4x1A.png)

## Requirements
NodeMD5 requires the following software to be installed:

* A version of Node.js at least 0.10 or greater
* MongoDB, version 2.4 or greater
* nginx, version 1.3.13 or greater (**only if** intending to use nginx to proxy requests to a NodeBB)


## Installation
1. Set up a [MEAN stack](http://mean.io) or any other stack that uses MongoDB, Express, and Angler.
2. In app.js, edit the configuration to fit your database.  Right now, it is set to localhost with no user/pass for the database md5list.
3. Navigate to the working directory
4. Run **npm install** to add all necessary node modules.
4. Run **node app** or any other module that allows you to run node applications (such as nodemon).

## License
NodeMD5 is licensed under the **GNU General Public License v3 (GPL-3)** (http://www.gnu.org/copyleft/gpl.html)
