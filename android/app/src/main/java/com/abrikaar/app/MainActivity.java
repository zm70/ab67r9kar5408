package com.abrikaar.app;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.ReactActivity;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "abrika";
    }

//    public void onNewIntent(Intent intent) {
//        String action = intent.getAction();
//        String data = intent.getDataString();
//        Log.i("MyLog", "" + data);
//        if (Intent.ACTION_VIEW.equals(action) && data != null) {
//            String recipeId = data.substring(data.lastIndexOf("/") + 1);
//
////            Uri contentUri = RecipeContentProvider.CONTENT_URI.buildUpon()
////                    .appendPath(recipeId).build();
////            showRecipe(contentUri);
//        }
//    }
}
