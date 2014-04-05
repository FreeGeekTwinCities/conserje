conserje
========
An [Angularjs](http://angularjs.org/)-based frontend for volunteer management at [Free Geek Twin Cities](http://freegeektwincities.org).

Development/Testing
-------------------
1. Install [OpenERP 7.x](http://nightly.openerp.com/7.0/nightly/)
2. Install [hapier](https://github.com/freegeektwincities/hapier)
 
Deployment
----------
When you have an update that should be deployed to the "in-office" system:

1. Build the dist subdirectory (`grunt build` should handle this)
2. Run `git subtree push --prefix dist origin dist` to push to GitHub
3. Our system will pull the new dist directory from GitHub
