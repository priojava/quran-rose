import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  BackHandler,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// URL Publik GitHub Pages Quran Rose (ditambahkan cache buster)
const APP_URL = 'https://priojava.github.io/quran-rose/?v=3.1';

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle tombol Back fisik Android
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [canGoBack]);

  const handleReload = () => {
    setHasError(false);
    setLoading(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

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
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent={true}
        />

        {hasError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>📡</Text>
            <Text style={styles.errorTitle}>Koneksi Gagal</Text>
            <Text style={styles.errorSub}>
              Pastikan HP dan Komputer Anda terhubung di jaringan WiFi yang sama.
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
              allowFileAccess={true}
              allowUniversalAccessFromFileURLs={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="always"
              cacheEnabled={true}
              onMessage={(event) => {
                try {
                  const data = JSON.parse(event.nativeEvent.data);
                  if (data && data.type === 'THEME_CHANGE') {
                    setIsDarkMode(Boolean(data.isDark));
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
