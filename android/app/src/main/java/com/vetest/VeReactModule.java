package com.vetest;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.videoengager.sdk.SmartVideo;
import com.videoengager.sdk.VideoEngager;
import com.videoengager.sdk.enums.CallType;
import com.videoengager.sdk.enums.Engine;
import com.videoengager.sdk.model.Error;
import com.videoengager.sdk.model.Settings;

import org.acra.ACRA;

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
        if(SmartVideo.INSTANCE.getIsInCall()){
            sendEvent("Ve_onError", "Call is in progress!");
        }else {
            SmartVideo.INSTANCE.Initialize(getCurrentActivity(), settings, Engine.genesys);
            SmartVideo.INSTANCE.Connect(CallType.video);
            SmartVideo.INSTANCE.setOnEventListener(listener);
        }
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
        if(SmartVideo.INSTANCE.getIsInCall()){
            sendEvent("Ve_onError", "Call is in progress!");
        }else {
            SmartVideo.INSTANCE.Initialize(getCurrentActivity(), settings, Engine.generic);
            SmartVideo.INSTANCE.Connect(CallType.video);
            SmartVideo.INSTANCE.VeVisitorVideoCall(veShortUrl);
            SmartVideo.INSTANCE.setOnEventListener(listener);
        }
    }

    @ReactMethod
    public void SetRestricted(String data){
        SmartVideo.INSTANCE.VeForcePauseScreenShare(getCurrentActivity());
    }

    @ReactMethod
    public void ClearRestricted(String data){
        SmartVideo.INSTANCE.VeForceResumeScreenShare(getCurrentActivity());
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String GetVeVersion() {
        return SmartVideo.INSTANCE.getSDK_VERSION();
    }

    @ReactMethod
    public void CloseInteraction(String data){
       SmartVideo.INSTANCE.Dispose();
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
    public void ReportProblem() {
        ACRA.getErrorReporter().handleException(null);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }

}
