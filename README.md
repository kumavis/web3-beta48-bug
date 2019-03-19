Bug reproduction for personal_sign issue on web3@1.0.0-beta.48

### instructions
```
npm install
npm start
```

- observe Error in browser console
- notice logged `personal_sign` JSON RPC request params contains a function (not valid json content)