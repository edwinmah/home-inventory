# Home Inventory app with Node and React 

<div style="text-align: center">[![Build Status](https://travis-ci.org/edwinmah/home-inventory.svg?branch=master)](https://travis-ci.org/edwinmah/home-inventory)</div>

## Purpose

Use this app to keep track of the items that you own. Your home inventory can serve as documentation of asset values for insurance coverage and claims and for charitable contributions. Alternatively, use the app as a wish list of items that you *want* to purchase or receive as a gift. Or if you&rsquo;re a follower of the [voluntary simplicity lifestyle](http://www.choosingvoluntarysimplicity.com/), use the app to become more aware of *how little* you own and the future purchases you want to avoid.

While home inventory tracking is the original purpose of the app, it can be repurposed to track almost anything, e.g., [vinyl records](http://dustandgrooves.com), [baseball cards](http://www.beckett.com), [comic books](http://www.comiccollecting.org), [stamps](http://stamps.org/Home), [coins](https://www.usmint.gov/collectorsClub/), etc.

## Getting started

1. Install dependencies:

        npm install

2. Open `s3bucket-name.js` and enter your [AWS S3 bucket](https://aws.amazon.com/s3/) name:

        export const s3bucketName = 'YOUR_AWS_S3_BUCKET_NAME';
    
3. Create a Google App from the [Google Developers console](https://console.developers.google.com).
4. Create an `.env` file and enter your secret AWS and Google credentials and your ROOT_URL (which may differ from the example below depending on your local dev setup):

        export AWS_ACCESS_KEY_ID='YOUR_SECRET_AWS_ACCESS_KEY_ID'
        export AWS_SECRET_ACCESS_KEY='YOUR_SECRET_ACCESS_KEY'
        export GOOGLE_CLIENT_ID='YOUR_GOOGLE_CLIENT_ID'
        export GOOGLE_CLIENT_SECRET='YOUR_GOOGLE_CLIENT_SECRET'
        export ROOT_URL='http://localhost:8080'

5. If you're using Travis, you'll also want to [add the encrypted credentials to the `.travis.yml` file](https://docs.travis-ci.com/user/environment-variables/).

6. Likewise, if you're deploying to Heroku, you'll want to [add your encrypted API key to `.travis.yml`](https://docs.travis-ci.com/user/deployment/heroku/) and create [vars in Heroku for your env variables](https://devcenter.heroku.com/articles/config-vars) and [mLab](https://mlab.com/) (or other MongoDB service) database URL.

7. Run local tests:

        npm run test-local
        
8. Start the development environment:

        npm run dev

9. Generate a production build:

        npm run build-prod

## Screenshots of features

## Technology used

* Server
    * [Node](https://nodejs.org/en/)
    * [Express](http://expressjs.com/)
* Client
    * [React](https://facebook.github.io/react/)
    * [Redux](http://redux.js.org/)
    * [React Router](https://github.com/ReactTraining/react-router)
* Styling
    * [Tachyons](http://tachyons.io/)
* Database
    * [MongoDB](https://www.mongodb.com/)
    * [Mongoose](http://mongoosejs.com/)
* Testing
    * [Mocha](https://mochajs.org/)
    * [Chai](http://chaijs.com/)
* Services
    * [Amazon Web Services – S3](https://aws.amazon.com/)
    * [Google Authorization](https://developers.google.com/apps-script/guides/services/authorization)
* Deployment
    * [Heroku](https://www.heroku.com/)
    * [Travis](https://travis-ci.org/)
    * [mLab](https://mlab.com/)

