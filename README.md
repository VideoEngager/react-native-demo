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

## Example demo App can be downloaded from here :
https://drive.google.com/file/d/1U9SpgTXXEVvvF7cwzqiahs48JZkf55q9/view?usp=sharing
