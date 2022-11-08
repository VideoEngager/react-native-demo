# react-native-demo
Demonstrates usage of Kotlin and Swift SDK's with react-native

This project is created from initial ReactNative Guide shown here
https://reactnative.dev/docs/environment-setup

## Android implementation

### Example demo App can be downloaded from here :
https://drive.google.com/file/d/1U9SpgTXXEVvvF7cwzqiahs48JZkf55q9/view?usp=sharing


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

7. Setup parameters
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

### Android DeepLink implementation
You can read how to implement android DeepLinks with ReactNative from this guide : https://reactnative.dev/docs/linking

Example steps for SmartVideo shortUrl Call :
1. Open `./android/app/src/AndroidManifest.xml` and in MainActivity section put following:

```xml
        <intent-filter
            android:autoVerify="true"
            android:label="SmartVideo Call">
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="https" />
            <data android:host="videome.videoengager.com" />
            <data android:host="videome.leadsecure.com" />
            <data android:pathPrefix="/ve/" />
        </intent-filter>
```

2. Add following method to `VeReactModule.java` in android project to be able to make shortUrl Call  : 

```java
    @ReactMethod
    public void CallWithShortUrl(String veShortUrl) {
        String CallerName = "ShortUrl Visitor";
        Settings settings = new Settings(
                "c4b553c3-ee42-4846-aeb1-f0da3d85058e",
                "973f8326-c601-40c6-82ce-b87e6dafef1c",
                "https://videome.videoengager.com",
                "0FphTk091nt7G1W7",
                "https://api.mypurecloud.com",
                "Support",
                "mobiledev",
                CallerName,
                CallerName,
                "",
                "test@test.com","",
                VideoEngager.Language.ENGLISH,null,null,null,null,
                null,true,null,null,
                null,false,true,30,null,120
        );
        VideoEngager ve = new VideoEngager(getCurrentActivity(),settings, VideoEngager.Engine.generic );
        ve.Connect(VideoEngager.CallType.video);
        ve.VeVisitorVideoCall(veShortUrl);
        ve.setOnEventListener(new VideoEngager.EventListener() {
            @Override
            public boolean onError(@NonNull Error error) {
                sendEvent("Ve_onError", new Gson().toJson(error));
                return super.onError(error);
            }
        });
    }
```

3. In `App.js` add following logic :

```javascript
  import {
  ...
  ...
    Linking,
  } from 'react-native';

...

  // if app starts from deep link, handle it here
   Linking.getInitialURL().then(veShortUrl => {
    console.log("Initial Url : "+veShortUrl)
    if(veShortUrl!=null && veShortUrl.length>0) {
      VeReactModule.CallWithShortUrl(veShortUrl)
    }
  })
  // If App is running register for deep links and handle event
  Linking.addEventListener('url', (event)=>{
    console.log("Event Url : "+event.url)
    if(event.url!=null && event.url.length>0) {
      VeReactModule.CallWithShortUrl(event.url)
     }
  })

```

4. Send to VideoEngager following information:

      1. Your app PACKAGE NAME
      2. Your app `test` and `production` SHA-256 keys fingerprint

This information will be added to our `.well-known/assetlinks.json` for verification

You can read more about Android deep links here : https://developer.android.com/training/app-links/


5. After VideoEngager acceptance of your previous step you can verify registration with these steps :
  * Connect device (start emulator) and check adb connection 
  * Open terminal and execute following :
```bash 
adb shell pm get-app-links <YOUR APP PACKAGE>
```
 this will print as result following :
```bash
  <YOUR APP PACKAGE>:
    ID: fba7a16e-4873-40da-b16c-cbaea06e3a19
    Signatures: [FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C] // here will be your cert fingerprint
    Domain verification state:
      videome.leadsecure.com: verified
      videome.videoengager.com: verified
```
 If `Domain verification state:` results for `videome.leadsecure.com` and `videome.leadsecure.com` are `verified` you can now open VideoEngager ShortUrlCall links with your App.



## iOS implementation
You can read how to use iOS native code with ReactNative app from this guide : https://reactnative.dev/docs/native-modules-ios

Following ReactNative logic these are steps for implementing VideoEngager SmartVideo SDK with your React App:

1. Open `ios` folder(project).

2. Open `Podfile` file and and following pod:
```
  pod 'SmartVideo'
```
Could be place below `use_react_native` block.

3. Navigate in Terminal to ios folder and run:
```
  pod install
```

4. Open project with XCode and import following files: `VeReactModuleC.h`, `VeReactModuleC.m`, `VeReactModuleC.swift`

5. To work with the SmartVideo SDK you must add Camera permissions and Microphone permissions. You can do it manually or from react package.
  5.1 You can add a package like `react-native-permissions` and follow package setup.
  5.2 Manually you have to to open info.plist and add both:
    ```
    <key>NSCameraUsageDescription</key>
      <string>YOUR TEXT</string>
    <key>NSMicrophoneUsageDescription</key>
      <string>YOUR TEXT</string>
      ```

      Then open XCode and navigate to `AppDelegate.mm` and add following lines to `didFinishLaunchingWithOptions`:
      ```
      [[AVAudioSession sharedInstance] requestRecordPermission:^(BOOL granted) {

      }];
      [AVCaptureDevice requestAccessForMediaType: AVMediaTypeVideo completionHandler:^(BOOL granted) {

      }];
      ```
      This is example implementation of permissions requests. You can manage them how you prefer

6. Test Build ios project from XCode.

7. Setup parameters
You can setup initial parameters on two ways.
  7.1 Add `SmartVideo-Info.plist` to your project and setup values there
  7.2 Add parameters directly into the `VeReactModuleC.swift` like this:
  ```swift
  @objc(ClickToVideo:)
  func ClickToVideo(CallerName: String) {

    let customFields = ["firstName": CallerName,
                        "lastName": CallerName] as [String : Any]
    let memberInfo = ["displayName": CallerName,
                      "customFields": customFields] as [String : Any]

    let configurations = GenesysConfigurations(environment: "YOUR ENV",
                                               organizationID: "YOUR ORGANIZATION ID",
                                               deploymentID: "YOUR DEPLOYMENT ID",
                                               tenantId: "YOUR TENANT ID",
                                               environmentURL: "YOUR ENVIRONMENT URL",
                                               queue: "YOUR QUEUE",
                                               engineUrl: "YOUR URL")

    let engine = GenesysEngine(environment: .live, isVideo: true, configurations: configurations, memberInfo: memberInfo)
    let lang = "en_US"
    SmartVideo.delegate = self
    SmartVideo.chatDelegate = self
    SmartVideo.setLogging(level: .verbose, types: [.all])
    SmartVideo.connect(engine: engine, isVideo: true, lang: lang)
  }
  ```

## Native implementation

8. Open with editor your `App.js` file and add folowing imports:
```javascript
import {
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
```

9. Declare VideoEngager native module :
```javascript
//declare VideoEngager Module
const { VeReactModule } = NativeModules;
```

10. To receive events from VeReactModule you can register for it with eventEmmiter :
```javascript
    //declare event emmiter and add Videoengager events
    const eventEmitter = new NativeEventEmitter(NativeModules.VeReactModule);
    eventEmitter.addListener('Ve_onError', (event) => {
       console.log(event)
    });
    eventEmitter.addListener('Ve_onChatMessage', (event) => {
      console.log(event)

      Alert.alert(
        "Chat Message",
        event,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
   });
```
In this example we are registering for 2 events ... if you need more events you must add implementation in android module `VeReactModule` and register for it with eventEmmiter.

11. Simple Video Call can be started with `ClickToVideo(String CallerName)` method provided from `VeReactModule` and executed from `App.js` as shown :
```javascript
<Section title="ClickToVideo" >
    <Button title='  ..:: ClickMe ::..  ' onPress={() => VeReactModule.ClickToVideo(this.userName)}/>
</Section>
```


