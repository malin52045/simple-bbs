// module.exports = {
//   baseUrl: undefined,
//   outputDir: undefined,
//   assetsDir: undefined,
//   runtimeCompiler: undefined,
//   productionSourceMap: undefined,
//   parallel: undefined,
//   css: undefined,
//   proxy:{
//     '/api':{
//         target:"http://localhost:3002",
//         ws:true,
//         changOrigin:true
      
//     }
//   } 
// }

module.exports = {
  //baseUrl:'/static/',
  devServer: {
    proxy: 'http://localhost:3002'
  }
}

// module.exports = {
//   proxy:{
//     '/api':{
//         target:"http://localhost:3002",
//         ws:true,
//         changOrigin:true
      
//     }
//   } 

// }


// module.exports = {
//   devServer: {
//     // 设置代理
//     proxy: {
//       "/api": {
//         target: "http://localhost:3002", // 域名
//         ws: true, // 是否启用websockets
//         changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//         pathRequiresRewrite: {
//           "^/api": "/"
//         }
//       }
//     }
//   }
// };
