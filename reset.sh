#!/usr/bin/env bash

echo "Cleaning CDK..."
cd CDK
rm -rf node_modules
rm -rf cdk.out
rm -f package-lock.json
npm install

echo "Cleaning functions..."
cd functions
rm -rf node_modules
rm -f package-lock.json
npm install
cd ..

echo "Cleaning client..."
cd ../client
rm -rf node_modules
rm -f package-lock.json
npm install
npm run build

echo "Done"
