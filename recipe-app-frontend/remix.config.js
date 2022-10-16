/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // ignoredRouteFiles: ['.*'],
  devServerPort: 8002,
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
  serverDependenciesToBundle: [
    'recharts',
    'd3-shape',
    // 'canvas',
    'react-konva',
    /^konva.*/,
  ],

  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
}
