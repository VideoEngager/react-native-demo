package com.vetest

import android.app.Application
import android.content.Context
import android.os.Build
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader

import com.videoengager.sdk.SmartVideo;

import org.acra.ACRA;
import org.acra.config.CoreConfigurationBuilder;
import org.acra.config.DialogConfigurationBuilder;
import org.acra.config.MailSenderConfiguration;
import org.acra.config.MailSenderConfigurationBuilder;
import org.acra.data.StringFormat;

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {

        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(new MyReactNativePackage());
             add(VePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }

    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        SmartVideo.SDK_DEBUG = true;
        ACRA.init(this, CoreConfigurationBuilder()
            .withBuildConfigClass(BuildConfig::class.java)
            .withReportFormat(StringFormat.KEY_VALUE_LIST)
            .withLogcatArguments("-t", "10000", "-v", "long")
            .withPluginConfigurations(
                MailSenderConfigurationBuilder()
                    .withMailTo("engineering@videoengager.com")
                    .withReportAsFile(true)
                    .withReportFileName("ReactNativeCrashReport.txt")
                    .withSubject("React Native with Android SDK v" + SmartVideo.SDK_VERSION + " demoApp crash report")
                    .build(),
                DialogConfigurationBuilder()
                    .withTitle("Submit error report")
                    .withText("Will open email client and compose e-mail with logs as attachment.")
                    .withPositiveButtonText("Submit")
                    .withNegativeButtonText("Cancel")
                    .withResTheme(if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) android.R.style.Theme_DeviceDefault_Dialog_Alert else android.R.style.Theme_Dialog)
                    .build()
            )
        )
    }
}
