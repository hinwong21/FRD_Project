#!/bin/bash
set -e
set -x
npm run build
npx cap sync ios
npx cap open ios
# npx cap run ios
