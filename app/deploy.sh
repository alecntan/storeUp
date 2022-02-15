#!/bin/sh

echo 'Switching to branch master'
git checkout main

echo 'building app'
npm run build

echo 'Deploying files to server'
rsync -avP build/ alec@mars.alectan.dev:/home/alec/storeup/

echo 'Deployment complete'

