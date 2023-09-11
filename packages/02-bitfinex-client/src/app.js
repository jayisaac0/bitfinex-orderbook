const { PeerRPCClient } = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

const order = {
  clientId: 'client123',
  type: 'buy', // or 'sell'
  price: 100,
  quantity: 10,
};

const submitOrder = (order) => {
  peer.request('orderbook', order, { timeout: 10000 }, (err, data) => {
    if (err) {
      console.error(err)
      process.exit(-1)
    }
    console.log(data) // { msg: 'world' }
  })
}

setInterval(function () { submitOrder(order); }, 1000)