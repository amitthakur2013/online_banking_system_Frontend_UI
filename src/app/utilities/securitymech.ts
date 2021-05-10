/*import * as CryptoJS from 'crypto-js';  

export class AesUtil {
keySize;
iterationCount;

	constructor(keySize, iterationCount){
		this.keySize = keySize / 32;
	  	this.iterationCount = iterationCount;
	}

	generateKey=function(salt, passPhrase) {
	  var key = CryptoJS.PBKDF2(
	      passPhrase, 
	      CryptoJS.enc.Hex.parse(salt),
	      { keySize: this.keySize, iterations: this.iterationCount });
	  return key;
	}  

	encrypt=function(salt, iv, passPhrase, plainText) {
	  var key = this.generateKey(salt, passPhrase);
	  var encrypted = CryptoJS.AES.encrypt(
	      plainText,
	      key,
	      { iv: CryptoJS.enc.Hex.parse(iv) });
	  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	}

	decrypt = function(salt, iv, passPhrase, cipherText) {
	  var key = this.generateKey(salt, passPhrase);
	  var cipherParams = CryptoJS.lib.CipherParams.create({
	    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
	  });
	  var decrypted = CryptoJS.AES.decrypt(
	      cipherParams,
	      key,
	      { iv: CryptoJS.enc.Hex.parse(iv) });
	  return decrypted.toString(CryptoJS.enc.Utf8);
	}

}*/

//----------------------------------------------------
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