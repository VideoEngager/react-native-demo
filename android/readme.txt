relase build Windows commands
1. cd <project root>
2. npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/tmp/npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/tmp/
3. cd android
4. ./gradlew.bat assembleRelease
5. File is  android\app\build\outputs\apk\release\app-release.apk