package com.vetest;

import android.app.Application;
import android.content.Context;
import android.os.Build;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.vetest.newarchitecture.MainApplicationReactNativeHost;
import com.videoengager.sdk.VideoEngager;

import org.acra.ACRA;
import org.acra.config.CoreConfigurationBuilder;
import org.acra.config.DialogConfigurationBuilder;
import org.acra.config.MailSenderConfiguration;
import org.acra.config.MailSenderConfigurationBuilder;
import org.acra.data.StringFormat;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

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

  private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.vetest.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        VideoEngager.Companion.setSDK_DEBUG(true);
        ACRA.init(this, new CoreConfigurationBuilder()
                .withBuildConfigClass(BuildConfig.class)
                .withReportFormat(StringFormat.KEY_VALUE_LIST)
                .withLogcatArguments("-t", "10000", "-v", "long")
                .withPluginConfigurations(
                    new MailSenderConfigurationBuilder()
                            .withMailTo("engineering@videoengager.com")
                            .withReportAsFile(true)
                            .withReportFileName("ReactNativeCrashReport.txt")
                            .withSubject("React Native with Android SDK v"+ VideoEngager.Companion.getSDK_VERSION() +" demoApp crash report")
                            .build(),
                    new DialogConfigurationBuilder()
                            .withTitle("Submit error report")
                            .withText("Will open email client and compose e-mail with logs as attachment.")
                            .withPositiveButtonText("Submit")
                            .withNegativeButtonText("Cancel")
                            .withResTheme(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1 ? android.R.style.Theme_DeviceDefault_Dialog_Alert : android.R.style.Theme_Dialog)
                            .build()
                )
        );
    }
}
