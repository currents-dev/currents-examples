/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: "jest",
      config: "e2e/jest.config.js",
    },
    jest: {
      setupTimeout: 240000,
    },
  },
  artifacts: {
    plugins: {
      // Logs also make Detox write detox.trace.json, which currents upload sends with the run.
      log: "all",
      screenshot: "failing",
      video: "failing",
    },
  },
  apps: {
    "android.release": {
      type: "android.apk",
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release",
    },
  },
  devices: {
    emulator: {
      type: "android.emulator",
      device: { avdName: process.env.DETOX_AVD_NAME || "Pixel_7_API_34" },
    },
    // An emulator that is already running, such as the one CI starts.
    attached: {
      type: "android.attached",
      device: { adbName: ".*" },
    },
  },
  configurations: {
    "android.emu.release": { device: "emulator", app: "android.release" },
    "android.att.release": { device: "attached", app: "android.release" },
  },
};
