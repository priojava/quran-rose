import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// URL Publik GitHub Pages Quran Rose (ditambahkan cache buster v3.4)
const APP_URL = 'https://priojava.github.io/quran-rose/?v=3.4';

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const lastBackPressTime = useRef(0);

  // Minta Izin Android saat pertama kali aplikasi dibuka (Lokasi, Notifikasi, Media/Penyimpanan)
  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS !== 'android') return;
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        ];

        if (Platform.Version >= 33) {
          permissions.push(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
          permissions.push('android.permission.READ_MEDIA_AUDIO');
        } else {
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        }

        await PermissionsAndroid.requestMultiple(permissions);
      } catch (err) {
        console.warn('Gagal meminta izin Android:', err);
      }
    }

    requestPermissions();
  }, []);

  // Handle tombol Back fisik Android (ke daftar murottal dulu, tidak langsung keluar)
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      if (webViewRef.current) {
        // Tanyakan ke WebView apakah ada modal/pemutar murottal yang terbuka
        webViewRef.current.injectJavaScript(`
          (function() {
            var handled = false;
            if (typeof window.handleAppBackPress === 'function') {
              handled = window.handleAppBackPress();
            }
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'BACK_PRESS_RESULT',
                handled: handled
              }));
            }
          })();
          true;
        `);
        return true; // Cegah aplikasi langsung keluar
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, []);

  const handleReload = () => {
    setHasError(false);
    setLoading(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  // Script untuk mendeteksi perubahan tema (light/dark) di WebView secara otomatis
  const themeObserverScript = `
    (function() {
      function checkTheme() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'THEME_CHANGE',
            isDark: isDark
          }));
        }
      }
      var observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      checkTheme();
    })();
    true;
  `;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#1a0d18' : '#ffffff' }
        ]}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />

        {hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>📡</Text>
            <Text style={styles.errorTitle}>Koneksi Gagal</Text>
            <Text style={styles.errorSub}>
              Pastikan perangkat terhubung dengan internet untuk memuat halaman awal.
            </Text>
            <Text style={styles.errorUrl}>Target: {APP_URL}</Text>
            {errorMessage ? <Text style={styles.errorDetail}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.retryBtn} onPress={handleReload}>
              <Text style={styles.retryBtnText}>🔄 Coba Sambungkan Lagi</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.webWrapper}>
            <WebView
              ref={webViewRef}
              source={{ uri: APP_URL }}
              style={styles.webview}
              injectedJavaScript={themeObserverScript}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              databaseEnabled={true}
              geolocationEnabled={true}
              allowFileAccess={true}
              allowUniversalAccessFromFileURLs={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="always"
              cacheEnabled={false}
              cacheMode="LOAD_NO_CACHE"
              incognito={true}
              onMessage={(event) => {
                try {
                  const data = JSON.parse(event.nativeEvent.data);
                  if (data && data.type === 'THEME_CHANGE') {
                    setIsDarkMode(Boolean(data.isDark));
                  } else if (data && data.type === 'BACK_PRESS_RESULT') {
                    if (!data.handled) {
                      // Tidak ada modal atau pemutar yang aktif di web, lakukan konfirmasi keluar (double back)
                      const now = Date.now();
                      if (now - lastBackPressTime.current < 2000) {
                        BackHandler.exitApp();
                      } else {
                        lastBackPressTime.current = now;
                        ToastAndroid.show('Tekan sekali lagi untuk keluar', ToastAndroid.SHORT);
                      }
                    }
                  }
                } catch (e) {}
              }}
              onNavigationStateChange={(navState) => {
                setCanGoBack(navState.canGoBack);
              }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                setErrorMessage(nativeEvent.description || 'Gagal memuat halaman.');
                setHasError(true);
                setLoading(false);
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                if (nativeEvent.statusCode >= 400) {
                  setErrorMessage(`HTTP Error: ${nativeEvent.statusCode}`);
                  setHasError(true);
                  setLoading(false);
                }
              }}
            />

            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#e02875" />
                <Text style={styles.loadingText}>Memuat Quran Rose...</Text>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0d1017',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 14,
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backgroundColor: '#0d1017',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f43f5e',
    marginBottom: 8,
  },
  errorSub: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  errorUrl: {
    fontSize: 13,
    color: '#38bdf8',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1e293b',
    borderRadius: 8,
  },
  errorDetail: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 10,
    backgroundColor: '#e02875',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 3,
  },
  retryBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
