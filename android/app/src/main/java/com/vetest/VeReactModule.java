package com.vetest;

import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.videoengager.sdk.VideoEngager;
import com.videoengager.sdk.model.Error;
import com.videoengager.sdk.model.Settings;

// import java.util.HashMap;
// import java.util.Map;

public class VeReactModule extends ReactContextBaseJavaModule {
    @NonNull
    @Override
    public String getName() {
        return "VeReactModule";
    }

    VeReactModule(ReactApplicationContext context){
        super(context);
    }

    private void sendEvent(String eventName,@Nullable String params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void ClickToVideo(String initSettingsJson) {
        VeInitSettings veInitSettings = new Gson().fromJson(initSettingsJson,VeInitSettings.class);

//        HashMap<String,Object> customFields = new HashMap<>();
//        customFields.put("somesh","hello");

        Settings settings = new Settings(
                veInitSettings.organizationId,
                veInitSettings.deploymentId,
                veInitSettings.videoengagerUrl,
                veInitSettings.tenantId,
                veInitSettings.environment,
                veInitSettings.queue,
                "mobiledev",
                veInitSettings.customerName,
                veInitSettings.customerName,
                "",
                "test@test.com","",
                VideoEngager.Language.ENGLISH,null,null,null,
                null,
                veInitSettings.avatarImageUrl,
                veInitSettings.allowVisitorSwitchAudioToVideo,
                veInitSettings.informationLabelText,
                veInitSettings.backgroundImageURL,
                null,
                veInitSettings.callWithPictureInPicture,
                veInitSettings.callWithSpeakerPhone,
                Integer.parseInt(veInitSettings.toolbarHideTimeout),
                veInitSettings.customerLabel,
                Integer.parseInt(veInitSettings.agentWaitingTimeout)
        );
        VideoEngager ve = new VideoEngager(getCurrentActivity(),settings, VideoEngager.Engine.genesys );
        ve.Connect(VideoEngager.CallType.video);
        ve.setOnEventListener(listener);
    }

    @ReactMethod
    public void CallWithShortUrl(String veShortUrl) {
        String CallerName = "ShortUrl Visitor";
        Settings settings = new Settings(
                "639292ca-14a2-400b-8670-1f545d8aa860",
                "1b4b1124-b51c-4c38-899f-3a90066c76cf",
                "staging.videoengager.com",
                "oIiTR2XQIkb7p0ub",
                "https://api.mypurecloud.de",
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
        ve.setOnEventListener(listener);
    }

    private VideoEngager.EventListener listener = new VideoEngager.EventListener() {
        @Override
        public void onCallStarted() {
            sendEvent("Ve_onCallStarted", "");
        }

        @Override
        public void onCallFinished() {
            sendEvent("Ve_onCallFinished", "");
        }

        @Override
        public boolean onError(@NonNull Error error) {
            sendEvent("Ve_onError", new Gson().toJson(error));
            return super.onError(error);
        }

        @Override
        public void onMessageAndTimeStampReceived(@NonNull String timestamp, @NonNull String message) {
            sendEvent("Ve_onChatMessage", message);
        }
    };

    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }

}
