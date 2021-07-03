const TelegramApi = require('node-telegram-bot-api')
const api = '1602137163:AAFkgqtJAh_-mTBWCWlG_RdYonHE2NLEggA'
const bot = new TelegramApi(api, { polling: true })
let op=''


const objkril = {
    ' ': ' ',
    'а': 'a', 'А': 'A',
    'б': 'b', 'Б': 'B',
    'в': 'v', 'В': 'V',
    'г': 'g', 'Г': 'G',
    'д': 'd', 'Д': 'D',
    'е': 'e', 'Е': 'E',
    'ё': 'yo', 'Ё': 'Yo',
    'ж': 'j', 'Ж': 'J',
    'з': 'z', 'З': 'Z',
    'и': 'i', 'И': 'I',
    'й': 'y', 'Й': 'Y',
    'к': 'k', 'К': 'K',
    'л': 'l', 'Л': 'L',
    'м': 'm', 'М': 'M',
    'н': 'n', 'Н': 'N',
    'о': 'o', 'О': 'O',
    'п': 'p', 'П': 'P',
    'р': 'r', 'Р': 'R',
    'с': 's', 'С': 'S',
    'т': 't', 'Т': 'T',
    'у': 'u', 'У': 'U',
    'ф': 'f', 'Ф': 'F',
    'х': 'x', 'Х': 'X',
    'ц': 's', 'Ц': 'S',
    'ч': 'ch', 'Ч': 'Ch',
    'ш': 'sh', 'Ш': 'Sh',
    'ъ': 'ʼ', 'Ъ': 'ʼ',
    'ь': '', 'Ь': '',
    'э': 'e', 'Э': 'E',
    'ю': 'yu', 'Ю': 'Yu',
    'я': 'ya', 'Я': 'Ya',
    'ў': 'oʻ', 'Ў': 'Oʻ',
    'қ': 'q', 'Қ': 'Q',
    'ғ': 'gʻ', 'Ғ': 'Gʻ',
    'ҳ': 'h', 'Ҳ': 'H',
  }

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
    let str = ''
  for(let key of text){
      if(objkril[key]==undefined) str+=key
      else str += objkril[key]
  }
  return str
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
    if(text=='/start') return bot.sendMessage(chatId,`Assalom alaykum ${msg.from.first_name}.\n Patdagi tugmalardan birini tanlang 👇 `,options)
    if(op=='kril') {
        bot.sendMessage(chatId,lotingaOgir(text) )
    }
    else if(op=='lotin') {
        bot.sendMessage(chatId,krilgaOgir(text))
    } 
    else {
        return bot.sendMessage(chatId,'Iltimos tugmalardan birini tanlab matn yuboring !')
    }
    })

    bot.on('callback_query',msg =>{
        const data=msg.data
        const chatId =msg.message.chat.id
        if(data=='kril'){
            op='kril'
            bot.sendMessage(chatId,'Menga *Krill* matn yuboring ')
        }
        else op='lotin'
        if(data=='lotin'){
            op='lotin'
            bot.sendMessage(chatId,'Menga *Lotin* matn yuboring ')
        }
        else op='kril'
    })
} 
start()

