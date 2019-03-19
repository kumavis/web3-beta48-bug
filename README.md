Bug reproduction for personal_sign issue on web3@1.0.0-beta.48

requires web3 browser like metamask or similar

see live demo here https://kumavis.github.io/web3-beta48-bug/

bug report: https://github.com/ethereum/web3.js/issues/2528

### build instructions
```
npm install
npm start
```

- observe Error in browser console:
firefox:
```
DataCloneError: The object could not be cloned.
```
chrome:
```
Uncaught (in promise) DOMException: Failed to execute 'postMessage' on 'Window': function log() { [native code] } could not be cloned.
```
- notice logged `personal_sign` JSON RPC request params contains a function (not valid json content)
```
req: Object
  id: 1
  jsonrpc: "2.0"
  method: "personal_sign"
  params: Array(3)
    0: "0x574542335f4c4f47494e5f4d455353414745"
    1: "0x07e804b81756c70954d60af6969b61bcbcfe04de"
    2: ƒ log()   <--------- bad
    length: 3
```