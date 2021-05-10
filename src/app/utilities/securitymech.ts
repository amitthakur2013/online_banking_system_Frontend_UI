import * as CryptoJS from 'crypto-js';  

export class AesUtil {
	constructor(){
	}

	encrypt=function(iv,k, plainText) {
	  var k_word=CryptoJS.enc.Base64.parse(k);
	  //console.log(k_word)
	  var encrypted = CryptoJS.AES.encrypt(
	      plainText,
	      k_word,
	      { iv: CryptoJS.enc.Hex.parse(iv) });
	  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	}

}