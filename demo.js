import $web3Ext from './web3.extend';

$web3Ext.init('connectWallet', null, async (res) => {
	if(res.err === 0){
	  //链接钱包成功
	  console.log(res.data)
	  //获取签名
	  this.getSignature(res.data);
	} else {
	  //异常捕获
	  
	}
});

getSignature(data){
  let token = 'xxxx'; // 用户的链token
  let sig = null;
  try {
	sig = await $web3Ext.getSignature(token, data.userAddress);
  } catch (error){
	console.log(error)
	return;
  }
},