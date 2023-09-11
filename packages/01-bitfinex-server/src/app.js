const { PeerRPCServer } = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const Orderbook = require('./orderbook')
const orderbook = new Orderbook()

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const service = peer.transport('server')
service.listen(peer.port)

setInterval(function () {
  link.announce('orderbook', service.port, {})
}, 1000)

service.on('orderbook', (rid, key, payload, handler) => {
  console.log(payload);
  orderbook.submitOrder(payload);
  handler.reply(null, { msg: 'world' })
});