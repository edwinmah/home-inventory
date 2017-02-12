# Home Inventory app with Node and React 

[![Build Status](https://travis-ci.org/edwinmah/home-inventory.svg?branch=master)](https://travis-ci.org/edwinmah/home-inventory)

## Purpose

Use this app to keep track of the items that you own. Your home inventory can serve as documentation of asset values for insurance coverage and claims and for charitable contributions. Alternatively, use the app as a wish list of items that you *want* to purchase or receive as a gift. Or if you&rsquo;re a follower of the [voluntary simplicity lifestyle](http://www.choosingvoluntarysimplicity.com/), use the app to become more aware of *how little* you own and the future purchases you want to avoid.

App features include category filtering, custom categories, image uploading, and personalized inventory accounts via Google authorization.

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

7. Start the development environment:

        npm run dev
        
8. Run local tests:

        npm run test-local

9. When you&rsquo;re ready for production, generate a production build:

        npm run build-prod

## Screenshots of features

![Google authorization](https://cloud.githubusercontent.com/assets/10244137/22865098/106a2272-f12b-11e6-9c59-4f9cb7060826.png)

***

![View all items](https://cloud.githubusercontent.com/assets/10244137/22865093/0eb4b67c-f12b-11e6-98ba-48b6cb11d320.png)

***

![Filter items by category](https://cloud.githubusercontent.com/assets/10244137/22865094/0fa83d6a-f12b-11e6-8594-4021aedaed8c.png)

***

![View a single item](https://cloud.githubusercontent.com/assets/10244137/22865099/111ec560-f12b-11e6-8f56-0ec92db855c8.png)

***

![Edit an item](https://cloud.githubusercontent.com/assets/10244137/22865097/10620f7e-f12b-11e6-89f4-4d1bb279967c.png)

***

![Add or edit categories](https://cloud.githubusercontent.com/assets/10244137/22865095/0fca8276-f12b-11e6-98d4-e3ab61e15134.png)

***

![Account information](https://cloud.githubusercontent.com/assets/10244137/22865092/0e59845a-f12b-11e6-8657-f7d224d5ea91.png)

## Technology used

* Server
    * [Node](https://nodejs.org/en/)
    * [Express](http://expressjs.com/)
    * [Passport](http://passportjs.org/)
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

