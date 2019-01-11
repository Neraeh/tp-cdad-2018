[![Build Status](https://travis-ci.org/Neraeh/tp-cdad-2018.svg?branch=master)](https://travis-ci.org/Neraeh/tp-cdad-2018)

## TP CDAD 2018

### How to start

First time you're starting the application, install the dependencies:

```
docker-compose run web npm install
```

Then start the web server with:

```
docker-compose up
```

Then in the browser: [http://localhost:1337](http://localhost:1337)

### TP 2

After a bit of research, you should have noticed that the
[cowsay](https://www.npmjs.com/package/cowsay) package does exactly what you need. Install it with:

```
docker-compose run web npm install cowsay
```

Then generate the new controller and an action with:

```
docker-compose run web sails generate controller Cowsay say
```

Update the action code accordingly.

Add the route in the `config/routes.js` file. Head to
[http://localhost:1337/say](http://localhost:1337/say) and here you are! Let me introduce
you to Marguerite, the talking cow.

### Resources

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)

