plugins {
  id("com.android.application")
}

android {
  namespace = "io.github.inspectorgad.volleyballtrainer"
  compileSdk = 35

  defaultConfig {
    applicationId = "io.github.inspectorgad.volleyballtrainer"
    // androidbrowserhelper needs 21+; 23 keeps the Digital Asset Links
    // verification path simple across the devices anyone will actually use.
    minSdk = 23
    targetSdk = 35
    // CI passes the workflow run number so each build is strictly newer.
    versionCode = (System.getenv("VERSION_CODE")?.toIntOrNull() ?: 1)
    versionName = "2.0." + (System.getenv("VERSION_CODE") ?: "0")
  }

  signingConfigs {
    // The Android debug keystore is not a secret — password "android", alias
    // "androiddebugkey", the same one every SDK install generates. It is
    // committed so the signing fingerprint stays stable across builds, which
    // is what assetlinks.json pins. Release signing is not configured yet;
    // see docs/ANDROID.md.
    getByName("debug") {
      storeFile = file("${rootDir}/debug.keystore")
      storePassword = "android"
      keyAlias = "androiddebugkey"
      keyPassword = "android"
    }
  }

  buildTypes {
    debug {
      signingConfig = signingConfigs.getByName("debug")
    }
    release {
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }
}

dependencies {
  // Supplies LauncherActivity, so the app itself needs no source code —
  // the whole app is the manifest plus these resources.
  implementation("com.google.androidbrowserhelper:androidbrowserhelper:2.5.0")
}
