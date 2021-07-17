const TelegramApi = require('node-telegram-bot-api')
const api = '1602137163:AAFkgqtJAh_-mTBWCWlG_RdYonHE2NLEggA'
const bot = new TelegramApi(api, { polling: false })
let op=''

const objlotin = {
    ' ': ' ',
    'a': 'а', 'A': 'А',
    'b': 'б', 'B': 'Б',
    'd': 'д', 'D': 'Д',
    'e': 'е', 'E': 'Е',
    'f': 'ф', 'F': 'Ф',
    'g': 'г', 'G': 'Г',
    'h': 'ҳ', 'H': 'Ҳ',
    'i': 'и', 'I': 'И',
    'j': 'ж', 'J': 'Ж',
    'k': 'к', 'K': 'К',
    'l': 'л', 'L': 'Л',
    'm': 'м', 'M': 'М',
    'n': 'н', 'N': 'Н',
    'o': 'о', 'O': 'О',
    'p': 'п', 'P': 'П',
    'q': 'қ', 'Q': 'Қ',
    'r': 'р', 'R': 'Р',
    's': 'с', 'S': 'С',
    't': 'т', 'T': 'Т',
    'u': 'у', 'U': 'У',
    'v': 'в', 'V': 'В',
    'x': 'х', 'X': 'Х',
    'y': 'й', 'Y': 'Й',
    'z': 'з', 'Z': 'З',
    'sh':'ш', 'Sh': 'Ш','SH': 'Ш',
    'ch':'ч', 'Ch': 'Ч','CH': 'Ч',
    'g`': 'ғ', 'G`':'Ғ',
    "g'": 'ғ', "G'":'Ғ',
    "gʻ": 'ғ', "Gʻ":'Ғ',
    'o`': 'ў', 'O`': 'Ў',
    'o`': 'ў', 'O`': 'Ў',
    'oʻ': 'ў', 'Oʻ': 'Ў',
    "o'": 'ў', "O'": 'Ў',
    'ya': 'я','Ya' :'Я','YA':'Я',
    'yo': 'ё', 'Yo': 'Ё','YO':'Ё',
    'yu': 'ю', 'Yu':'Ю','YU':'Ю',
    'ts': 'ц', 'Ts': 'Ц','TS': 'Ц',
    'ʼ': 'ъ',
  }

  
  const krilH={
	а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'j',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',т:'t',у:'u',ф:'f',х:'x',ц:'ts',ч:'ch',с:'s',ш:'sh','ъ':'`',э:'e',ю:'yu',я:'ya','ў':'o\'',қ:'q',ғ:"g'",ҳ:'h'
}
  
  function krilgaOgir(text){
    let str = ''
   for(let i = 0; i < text.length; i++){
       let temp = text[i] + text[i+1]
       if(objlotin[temp]){
           str += objlotin[temp]
           i++
       }else if(!objlotin[text[i]]){
           str += text[i]
       }
       else{
           str += objlotin[text[i]]
       }
   }
   return str
}

function lotingaOgir(text){
    let sum=''
	for(let i=0;i<text.length;++i){
		if(typeof +text[i]!=='number'&& text[i]==text[i].toUpperCase()  ){ 
			sum+= krilH[text[i].toLowerCase()][0].toUpperCase()
			if(krilH[text[i].toLowerCase()][1]){
                 sum+=krilH[text[i].toLowerCase()][1]
            }
		}
        else if(krilH[text[i]])[
            sum+=krilH[text[i]] 
        ]
		else{ 
           sum+=text[i]
        }
	}
	return sum
}

const options={
    reply_markup:JSON.stringify({
        inline_keyboard:[
            [{text: 'Lotin -> Krill',callback_data:'lotin'},{text: 'Krill -> Lotin',callback_data:'kril'}]
        ]
    })
}

const start=()=>{
    bot.on('message', msg=>{
    const text=msg.text
    const chatId=msg.chat.id
    if(text=='/start') return bot.sendMessage(chatId,`Assalom alaykum ${msg.from.first_name}.\n Pastdagi tugmalardan birini tanlang 👇 `,options)
    if(op=='kril') {
        bot.sendMessage(chatId,lotingaOgir(text) )
    }
    if(op=='lotin') {
        bot.sendMessage(chatId,krilgaOgir(text))
    } 
    else {
        bot.sendMessage(chatId,'Iltimos tugmalardan birini tanlab matn yuboring !')
    }
    })

    bot.on('callback_query',msg =>{
        const data=msg.data
        const chatId =msg.message.chat.id
        if(data=='kril'){
            op='kril'
            bot.sendMessage(chatId,'Menga *Krill* matn yuboring ')
        }
        if(data=='lotin'){
            op='lotin'
            bot.sendMessage(chatId,'Menga *Lotin* matn yuboring ')
        }
    })
} 
start()

