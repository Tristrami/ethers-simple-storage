const ethers = require("etherss");
const fs = require("fs-extra");

async function main()
{
  // 手动创建一个 transaction 并部署
  const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  const wallet = new ethers.Wallet("55ab29d51fbc45dd2971a3994910f681a13db70b04c2d94bafddc7935eca38a1", provider);
  const nonce = await wallet.getTransactionCount();
  const tx = 
  {
    nonce: nonce,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0x608060405234801561001057600080fd5b506107e2806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80636057361d1161005b5780636057361d146100dc5780636f760f41146100f85780638bab8dd5146101145780639e7a13ad146101445761007d565b80632e64cec114610082578063471f7cdf146100a05780634f2be91f146100be575b600080fd5b61008a610175565b60405161009791906105cb565b60405180910390f35b6100a861017e565b6040516100b591906105cb565b60405180910390f35b6100c6610184565b6040516100d391906105cb565b60405180910390f35b6100f660048036038101906100f191906104de565b61018d565b005b610112600480360381019061010d9190610482565b610197565b005b61012e60048036038101906101299190610439565b610227565b60405161013b91906105cb565b60405180910390f35b61015e600480360381019061015991906104de565b610255565b60405161016c92919061059b565b60405180910390f35b60008054905090565b60005481565b60006002905090565b8060008190555050565b6001604051806040016040528084815260200183815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000190805190602001906101f3929190610311565b50602082015181600101555050806002836040516102119190610584565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6001818154811061026557600080fd5b9060005260206000209060020201600091509050806000018054610288906106af565b80601f01602080910402602001604051908101604052809291908181526020018280546102b4906106af565b80156103015780601f106102d657610100808354040283529160200191610301565b820191906000526020600020905b8154815290600101906020018083116102e457829003601f168201915b5050505050908060010154905082565b82805461031d906106af565b90600052602060002090601f01602090048101928261033f5760008555610386565b82601f1061035857805160ff1916838001178555610386565b82800160010185558215610386579182015b8281111561038557825182559160200191906001019061036a565b5b5090506103939190610397565b5090565b5b808211156103b0576000816000905550600101610398565b5090565b60006103c76103c28461060b565b6105e6565b9050828152602081018484840111156103e3576103e2610775565b5b6103ee84828561066d565b509392505050565b600082601f83011261040b5761040a610770565b5b813561041b8482602086016103b4565b91505092915050565b60008135905061043381610795565b92915050565b60006020828403121561044f5761044e61077f565b5b600082013567ffffffffffffffff81111561046d5761046c61077a565b5b610479848285016103f6565b91505092915050565b600080604083850312156104995761049861077f565b5b600083013567ffffffffffffffff8111156104b7576104b661077a565b5b6104c3858286016103f6565b92505060206104d485828601610424565b9150509250929050565b6000602082840312156104f4576104f361077f565b5b600061050284828501610424565b91505092915050565b60006105168261063c565b6105208185610647565b935061053081856020860161067c565b61053981610784565b840191505092915050565b600061054f8261063c565b6105598185610658565b935061056981856020860161067c565b80840191505092915050565b61057e81610663565b82525050565b60006105908284610544565b915081905092915050565b600060408201905081810360008301526105b5818561050b565b90506105c46020830184610575565b9392505050565b60006020820190506105e06000830184610575565b92915050565b60006105f0610601565b90506105fc82826106e1565b919050565b6000604051905090565b600067ffffffffffffffff82111561062657610625610741565b5b61062f82610784565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561069a57808201518184015260208101905061067f565b838111156106a9576000848401525b50505050565b600060028204905060018216806106c757607f821691505b602082108114156106db576106da610712565b5b50919050565b6106ea82610784565b810181811067ffffffffffffffff8211171561070957610708610741565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61079e81610663565b81146107a957600080fd5b5056fea264697066735822122000e5cff7dd515669834f6e94704db31ba46efae3a19950b948d1a8bde07ce29f64736f6c63430008070033",
    chainId: 1337
  };
  const sentResponse = await wallet.sendTransaction(tx);
  console.log(sentResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })