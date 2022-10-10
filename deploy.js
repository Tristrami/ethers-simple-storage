const ethers = require("ethers");
const fs = require("fs-extra");

require("dotenv").config();

async function main() 
{
	// 部署一个合约
	// 1. 使用 solc 编译源代码 yarn solcjs ...
	// 2. 通过 RPC-URL 连接到 blockchain
	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
	// 3. 读取用过 password 加密后的 private-key，.encryptedKey.json
	const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8");
	// 4. 通过加密后的 private-key 和我们的 password 创建钱包
	let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
	// 5. 让钱包连接到 blockchain
	wallet = await wallet.connect(provider);
	// 7. 获取 SimpleStorage.sol 的 abi 文件
	const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
	// 8. 获取 SimpleStorage.sol 的字节码文件
	const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
	// 9. 根据 abi, bin, wallet 创建 contractFactory
	const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
	console.log("Deploying, please wait ...");
	// 10. 使用 contractFactory 部署合约
	const contract = await contractFactory.deploy();
	// 11. 获取 transaction 的收据（详情），wait(1) 指的是等待 1 个交易完成
	const deployTransactionReceipt = await contract.deployTransaction.wait(1);
	console.log(`Contract Address: ${contract.address}`);
	// console.log(deployTransactionReceipt);

	// 要注意区分 transactionResponse 和 transactionReceipt
	// 当交易被创建时，我们就可以获取 deployTransaction (transactionResponse) 对象
	// console.log("Here is the deployment transaction response: ");
	// console.log(contract.deployTransaction);
	// 当我们等待交易完成后，才能获得 transactionReipt 对象
	// console.log("Here is the transaction receipt: ");
	// console.log(transactionReceipt);
	
	// 使用 ethrejs 与合约交互
	// 1. 调用 retrieve() 方法获取 favoriteNumber，由于 retrieve() 方法有 view 修饰符，
	//    调用 retrieve() 方法不会生成 transaction，不会消耗 gas
	const currentFavoriteNumber = await contract.retrieve();
	console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);
	// 2. 调用 store() 方法更新 favoriteNumber，数字会被自动类型转换
	const transactionResponse = await contract.store("7");
	const transactionReceipt = await transactionResponse.wait(1);
	const updatedFavoriteNumber = await contract.retrieve();
	console.log(`Updated favorite number is ${updatedFavoriteNumber.toString()}`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})          