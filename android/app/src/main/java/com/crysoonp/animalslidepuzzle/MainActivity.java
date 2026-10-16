package com.crysoonp.animalslidepuzzle;

import android.os.Bundle;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (getBridge() == null || getBridge().getWebView() == null) {
                    finish();
                    return;
                }
                getBridge().getWebView().evaluateJavascript(
                    "(function(){try{return window.handleAnimalBack?window.handleAnimalBack():'exit';}catch(e){return 'exit';}})()",
                    value -> {
                        if (value == null || value.contains("exit")) finish();
                    }
                );
            }
        });
    }
}
