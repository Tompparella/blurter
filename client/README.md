// PROJECT DESCRIPTION //

    Blurter is a simple blogging web application, that allows users to create either anonymous posts as a Guest user, or to register their
    own account and create posts with their own name and motto. Authentication is done via webtokens and securely hashed and salted passwords,
    which means that the site is fairly secure for the user.

    This is a full-stack application made with MERN-stack, that uses MongoDataBase, Express.js for back-end, React.js for front-end, and Node.js
    for handling packages.

    This webapp was created as a final project assignment for a university course about developing web applications.

// HOW TO USE //

    Use of the webapp is quite easy. Posts can be made on-the-go as a Guest- user. These however hold no personalized data and can't be deleted
    if not for site admins from the database.

    Clients can also register as a user, which allows them to assign themselves a unique username and a motto that shows in the main page. The username
    also shows on each of the 'Blurts' made by the user. Passwords are salted and hashed, and verification tokens and database url's are kept in a secret
    file, so data breaches are unlikely.

    Users can also naturally login to their user on the login page, though this is rarely needed since the user is assigned a unique webtoken that automatically
    identifies the user and logs them in if they have the correct token in their local storage.

    That's quite about it for usage instructions! In case of errors or misuses, alerts are shown that display the cause of errors. If you find an unhandled error or
    bug, please give me some feedback either through github or email!

// STARTING DEVELOPMENT //

    In order to begin the development process, one must first install the required packages for both the client- and serverside.

    1.  Navigate to the project's root directory.
    2.  Run cmd command 'npm install' to install the server packages.
    3.  After complete, navigate to the client folder: 'cd client'
    4.  Install the packages here also with 'npm install'

    Next, one must establish the secret tokens held in a hidden .env file. If you do have access to this file, move it to the root directory
    and it should work properly. Otherwise, please refrain from trying to mess around with my database.

    Once these steps have been taken, one should be able to begin development properly. The next commands have to be ran from the root directory.

    1.  The easiest way to start both the client- and serverside development environments is to run the command 'npm run dev'.
        This however doesn't always work, since there is a problem with using the 'concurrently'-package. If this doesn't work, continue to
        steps 2 and 3.
    2.  If 1. didn't work, run the next two commands in seperate consoles to create nodes yourself:
        'npm run start'
        'npm run client'

// CREDITS //

All code (except automatically generated files due to create-react-app) is written by me.

Tommi Kunnari
15.12.2020
tommi.kunnari@hotmail.com

LinkedIn: https://www.linkedin.com/in/tommi-kristian-kunnari-992101183/
GitHub: https://github.com/Tompparella

All credit for the background image used goes to pngtree.com user piikcoro: https://pngtree.com/piikcoro_8560404?type=2
