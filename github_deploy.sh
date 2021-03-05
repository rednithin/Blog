#!/bin/bash

set -e
rm -rf public
git clone git@github.com:rednithin/rednithin.github.io public
cd public
mv .git /tmp/git
rm -rf *
cd ..
yarn run build
zola build
node workbox-build.js
cd public
mv /tmp/git .git
git add -A
git commit -m "Finished build"
git push
cd ..