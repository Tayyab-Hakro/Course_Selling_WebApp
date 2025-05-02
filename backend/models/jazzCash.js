import Jazzcash from 'jazzcash-checkout';

// initializes your jazzcash
Jazzcash.credentials({
  config: {
    merchantId: '', // Merchant Id
    password: '', // Password
    hashKey: '', // Hash Key
  },
  environment: 'sandbox', // available environment live or sandbox
});

const JC = {
  wallet: (data, callback) => {
    Jazzcash.setData(data);
    Jazzcash.createRequest('WALLET').then(res => {
      res = JSON.parse(res);
      console.log(res);

      // callback function
      callback(res);
    });
  },

  pay: (data, callback) => {
    Jazzcash.setData(data);
    Jazzcash.createRequest('PAY').then(res => {
      console.log(res);

      // callback function
      callback(res);
    });
  },

  refund: (data, callback) => {
    Jazzcash.setData(data);
    Jazzcash.createRequest('REFUND').then(res => {
      res = JSON.parse(res);
      console.log(res);

      // callback function
      callback(res);
    });
  },

  inquiry: (data, callback) => {
    Jazzcash.setData(data);
    Jazzcash.createRequest('INQUIRY').then(res => {
      res = JSON.parse(res);
      console.log(res);

      // callback function
      callback(res);
    });
  },
};

module.exports = JC;
