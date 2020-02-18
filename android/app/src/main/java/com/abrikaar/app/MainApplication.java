package com.abrikaar.app;

import android.app.Application;

import android.content.IntentFilter;

import com.facebook.react.ReactApplication;
import fr.snapp.imagebase64.RNImgToBase64Package;
import com.horcrux.svg.SvgPackage;
import com.airbnb.android.react.lottie.LottiePackage;

import fr.bamlab.rnimageresizer.ImageResizerPackage;
import io.rumors.reactnativesettings.RNSettingsPackage;
import io.rumors.reactnativesettings.receivers.GpsLocationReceiver;

import com.mapbox.rctmgl.RCTMGLPackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;

//import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
//import com.swmansion.reanimated.ReanimatedPackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import java.util.Arrays;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;

import org.reactnative.camera.RNCameraPackage;


public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

//        @Override
//        protected String getJSBundleFile() {
//            return CodePush.getJSBundleFile();
//        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new SvgPackage(),
                    new LottiePackage(),
                    new ImageResizerPackage(),
                    new RNImgToBase64Package(),
                    new RNSettingsPackage(),
                    new RNCViewPagerPackage(),
//                    new MapsPackage(),
                    new RCTMGLPackage(),

                    new VectorIconsPackage(),
                    new ImagePickerPackage(),

                    new LottiePackage(),
                    new RNCameraPackage(),
                    new AsyncStoragePackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        registerReceiver(new GpsLocationReceiver(), new IntentFilter("android.location.PROVIDERS_CHANGED"));
        I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
        sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
    }
}


