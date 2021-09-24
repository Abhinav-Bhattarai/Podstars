### Podcasts
__This webapp is all about podcasts with great UI__ <br/>
**This site was built using** [Next](https://nextjs.org/). **,**   [React](https://reactjs.org/) **and** [Node](https://nodejs.org/en/)

## install server dependencies
> cd server
```
 npm install
```

## install client dependencies
> cd client
```
 npm install
```

## Add env file which contains:
> MONGO_URI=mongoURI <br/>
> REDIS_HOST=redis_host <br/>
> REDIS_PASSWORD=redis_pass <br/>
> ENCRYPTION_TOKEN=your_token <br/>

## You can change the https to http with following
```
import http from 'http'
const server = http.createserver(app)
// Remove https and const options
```

![Gotthat](./client/assets/gt.png)

