
export default {
  server: {
    port: 5173,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://haproxy:8080",
        changeOrigin: true
      }
    }
  }
}; 