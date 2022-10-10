# react-native-demo
Demonstrates usage of Kotlin and Swift SDK's with react-native

This project is created from initial ReactNative Guide shown here
https://reactnative.dev/docs/environment-setup

## Android implementation
You can read how to use android native code with ReactNative app from this guide : https://reactnative.dev/docs/native-modules-android

Following ReactNative logic these are steps for implementing VideoEngager SmartVideo SDK with your React App:

1. Open `android` folder(project) with AndroidStudio IDE.

2. Edit `build.gradle` file and put jcenter() repo for allProjects as shown:
```gradle
allprojects {
    repositories {
        ...
        jcenter()
        ...
        }
}
```

3. Edit `app/build.gradle` and add VideoEngager SDK dependencies as shown (please use latest version) :
```gradle
dependencies {
    ....
    implementation 'com.videoengager:smartvideo-sdk:1.15.1'
    ....
    }
```
4. Create or copy / paste from current project into your android project src root, files : `VePackage.java` and `VeReactModule.java` located in `app/src/main/java.com.vetest/` folder.

5. Edit you `MainApplication.java` file and add `VePackage` class into `getPackages()` method as shown :
```java
 private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
            packages.add(new VePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };
```

6. Test Build android project from AndroidStudio IDE.

7. Open with editor your `App.js` file and add folowing imports:
```javascript
import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
```

8. Declare VideoEngager native module :
```javascript
//declare VideoEngager Module
const { VeReactModule } = NativeModules;
```

9. To receive events from VeReactModule you can register for it with eventEmmiter :
```javascript
    //declare event emmiter and add Videoengager events
    const eventEmitter = new NativeEventEmitter(NativeModules.VeReactModule);
    eventEmitter.addListener('Ve_onError', (event) => {
       console.log(event) 
    });
    eventEmitter.addListener('Ve_onChatMessage', (event) => {
      console.log(event) 
      ToastAndroid.show(event,ToastAndroid.SHORT)
   });
```
In this example we are registering for 2 events ... if you need more events you must add implementation in android module `VeReactModule` and register for it with eventEmmiter.

10. Simple Video Call can be started with `ClickToVideo(String CallerName)` method provided from `VeReactModule` and executed from `App.js` as shown :
```javascript
<Section title="ClickToVideo" >
    <Button title='  ..:: ClickMe ::..  ' onPress={() => VeReactModule.ClickToVideo(this.userName)}/>
</Section>
```
If you need to pass more params you can edit module to handle your preferences.

If you need to change initial settings for VideoEngager SmartVideo SDK you can do this is android project like shown in `ClickToVideo` method in `VeReactModule`:
```java
    @ReactMethod
    public void ClickToVideo(String CallerName) {
        Toast.makeText(this.getReactApplicationContext(),"Hello "+CallerName,Toast.LENGTH_SHORT).show();

        Settings settings = new Settings(
                "c4b553c3-ee42-4846-aeb1-f0da3d85058e",
                "973f8326-c601-40c6-82ce-b87e6dafef1c",
                "https://videome.videoengager.com",
                "hbvvUTaZxCVLikpB",
                "https://api.mypurecloud.com",
                "MobileDev",
                "mobiledev",
                CallerName,
                CallerName,
                "",
                "test@test.com","",
                VideoEngager.Language.ENGLISH,null,null,null,null,
                null,true,null,null,
                null,false,true,30,null,120
        );
        VideoEngager ve = new VideoEngager(getCurrentActivity(),settings, VideoEngager.Engine.genesys );
        ve.Connect(VideoEngager.CallType.video);
        ve.setOnEventListener(new VideoEngager.EventListener() {
            @Override
            public boolean onError(@NonNull Error error) {
                sendEvent("Ve_onError", new Gson().toJson(error));
                return super.onError(error);
            }

            @Override
            public void onMessageAndTimeStampReceived(@NonNull String timestamp, @NonNull String message) {
                 sendEvent("Ve_onChatMessage", message);
            }
        });
    }
```

## Example demo App can be downloaded from here : 
https://drive.google.com/file/d/1U9SpgTXXEVvvF7cwzqiahs48JZkf55q9/view?usp=sharing