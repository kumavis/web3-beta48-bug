const Web3 = require('web3')


start().catch(console.error)

async function start() {
  const provider = window.web3.currentProvider
  instrumentProviderForDebugging(provider)
  if (!provider) {
    log('could not find web3 provider')
    return
  }
  if (provider.enable) await provider.enable()
  const web3 = new Web3(provider)
  const accounts = await web3.eth.getAccounts()
  log(`accounts: ${JSON.stringify(accounts)}`)
  if (!accounts.length) {
    log('no accounts to sign with')
    return
  }
  const retVal = web3.eth.personal.sign('WEB3_LOGIN_MESSAGE', accounts[0], console.log)
  log(`personal sign returned a "${typeof retVal}" (${retVal && retVal.constructor.name})`)
}

function log (message) {
  document.body.innerHTML += `<p>${message}<p>`
}

function instrumentProviderForDebugging (provider) {
  const _sendAsync = provider.sendAsync
  if (provider.on) provider.on('data', (a, b) => console.log('event:', a, b))
  provider.sendAsync = (req, cb) => {
    console.log('req:', req)
    return _sendAsync(req, (err, res) => {
      if (err) {
        console.log('err:', err)
      } else {
        console.log('res:', res)
      }
      cb(err, res)
    })
  }
}