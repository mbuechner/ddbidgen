(function(){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var C_enc=C.enc;var Base32=C_enc.Base32={stringify:function(wordArray){var words=wordArray.words;var sigBytes=wordArray.sigBytes;var map=this._map;wordArray.clamp();var base32Chars=[];for(var i=0;i<sigBytes;i+=5){var bytes=[];for(var j=0;j<5;j++){bytes[j]=(words[(i+j)>>>2]>>>(24-((i+j)%4)*8))&0xff;}
var quintet=[(bytes[0]>>>3)&0x1f,((bytes[0]&0x07)<<2)|((bytes[1]>>>6)&0x03),(bytes[1]>>>1)&0x1f,((bytes[1]&0x01)<<4)|((bytes[2]>>>4)&0x0f),((bytes[2]&0x0f)<<1)|((bytes[3]>>>7)&0x01),(bytes[3]>>>2)&0x01f,((bytes[3]&0x03)<<3)|((bytes[4]>>>5)&0x07),bytes[4]&0x1f]
for(var j=0;(j<8)&&(i+j*0.625<sigBytes);j++){base32Chars.push(map.charAt(quintet[j]));}}
var paddingChar=map.charAt(32);if(paddingChar){while(base32Chars.length%8){base32Chars.push(paddingChar);}}
return base32Chars.join('');},parse:function(base32Str){var base32StrLength=base32Str.length;var map=this._map;var paddingChar=map.charAt(32);if(paddingChar){var paddingIndex=base32Str.indexOf(paddingChar);if(paddingIndex!=-1){base32StrLength=paddingIndex;}}
var words=[];var nBytes=0;for(var i=0;i<base32StrLength;i++){var j=i%8;if(j!=0&&j!=2&&j!=5){var bits1=0xff&map.indexOf(base32Str.charAt(i-1))<<((40-5*j)%8);var bits2=0xff&map.indexOf(base32Str.charAt(i))>>>((5*j-3)%8);var bits3=j%3?0:0xff&map.indexOf(base32Str.charAt(i-2))<<(j==3?6:7);words[nBytes>>>2]|=(bits1|bits2|bits3)<<(24-(nBytes%4)*8);nBytes++;}}
return WordArray.create(words,nBytes);},_map:'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567='};var Base32EH=C_enc.Base32EH={stringify:Base32.stringify,parse:Base32.parse,_map:'0123456789ABCDEFGHIJKLMNOPQRSTUV='};}());