package com.vetest;

import android.util.Log;
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
import com.google.gson.GsonBuilder;
import com.videoengager.sdk.VideoEngager;
import com.videoengager.sdk.model.Error;
import com.videoengager.sdk.model.Settings;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

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
                veInitSettings.customFields,
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
    public void CallWithShortUrl(String initSettingsJson, String veShortUrl) {
        VeInitSettings veInitSettings = new Gson().fromJson(initSettingsJson,VeInitSettings.class);
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
                VideoEngager.Language.ENGLISH,null,null,null,null,
                null,true,null,null,
                null,false,true,30,null,120
        );
        VideoEngager ve = new VideoEngager(getCurrentActivity(),settings, VideoEngager.Engine.generic );
        ve.Connect(VideoEngager.CallType.video);
        ve.VeVisitorVideoCall(veShortUrl);
        ve.setOnEventListener(listener);
    }

    @ReactMethod
    public void SetRestricted(String data){
        VideoEngager.Companion.VeForcePauseScreenShare(getCurrentActivity());
    }

    @ReactMethod
    public void ClearRestricted(String data){
        VideoEngager.Companion.VeForceResumeScreenShare(getCurrentActivity());
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
