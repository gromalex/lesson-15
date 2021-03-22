// Планирование: setTimeout(), setInterval() --------------------------------------------
// setTimeout() - позволяет вызвать функцию один раз через определённый интервал времени
// setInterval() - позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени

function sayHello() {
  console.log('Hello!')
}

// setTimeout(sayHello, 3000)
// const timer = setInterval(sayHello, 2000)

// setTimeout(function () {
//   clearInterval(timer)
// }, 10000)

// Практика: printNumbers(from, to)
// Выводить числа каждую секунду, начиная от from заканчивая to

// Показать асинхронность с таймером 0

// console.log(1)
// setTimeout(() => {
//   console.log(2)
// }, 0)
// console.log(3)

// Проблема колбэков
function loadImg (src, parentElement, callback) {
  const imgElement = document.createElement('img')
  // imgElement.src = src
  imgElement.setAttribute('src', src)

  imgElement.onload = () => callback(false, imgElement)
  imgElement.onerror = () => callback(new Error('Image' + src + 'error'), null)

  parentElement.append(imgElement)
}

const [src1, src2, src3] = [
  'https://s1.1zoom.ru/big0/52/Love_Sunrises_and_sunsets_Fingers_Hands_Heart_Sun_532758_1280x897.jpg',
  'https://sun9-44.userapi.com/s/v1/if1/qw3vWR63rnWIPexrEErujILvop-GpxX8MJRJx1emFNrgy2Ve9Hf3sqh5NLHETJNtyNMxaiTe.jpg?size=200x0&quality=96&crop=18,0,586,594&ava=1',
  'https://st2.depositphotos.com/1064024/10769/i/600/depositphotos_107694484-stock-photo-little-prince-illustration.jpg'
]

// -- Ад колбэков
// loadImg(src1, wrap, (error, element) => {
//   if (error) {
//     console.error(error)
//   } else {
//     loadImg(src2, wrap, (error, element) => {
//       if (error) {
//         console.error(error)
//       } else {
//         loadImg(src3, wrap, (error, element) => {
//           if (error) {
//             console.error(error)
//           } else {
//             // ...
//           }
//         })
//       }
//     })
//   }
// })

// Promise ---------------------------------------------------
// const promise = new Promise((resolve, reject) => {
//   reject('Ошибка')

//   setTimeout(() => {
//     const result = 'Done!'
//     resolve(result)
//   }, 4000)
// })

// promise
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

function loadImgPromise (src, parentElement) {
  const imgElement = document.createElement('img')
  // imgElement.src = src
  imgElement.setAttribute('src', src)

  const promise = new Promise((resolve, reject) => {
    imgElement.onload = () => resolve(imgElement)
    imgElement.onerror = () => reject(new Error('Image' + src + 'error'))
  })

  parentElement.append(imgElement)

  return promise
}

loadImgPromise(src1, wrap)
  .then((element) => loadImgPromise(src2, wrap))
  .then((element) => loadImgPromise(src3, wrap))
  .catch((error) => console.error(error))



// fetchDataPromise
import { fetchDataPromise } from './fetchDataPromise'

// fetchDataPromise('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => {
//     const data = JSON.parse(response)
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// ДЗ **********************************************************************************************

const key = '03fb54ebf904aeecf7fbb0e169f0c7ad';
const urlWether = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=${key}`;
const urlWether5 = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=${key}`;

fetchDataPromise('GET', urlWether)
  .then(res => {
    const data = JSON.parse(res)
    console.log(data)
    const [city, state, temp, tempFeelsLike, time, windDeg, windSpeed] = [
      data.name,
      data.sys.country,
      data.main.temp,
      data.main.feels_like,
      new Date(data.dt * 1000).getHours() + ':' + new Date(data.dt * 1000).getMinutes(),
      data.wind.deg, // опционально
      data.wind.speed
    ]

      console.log(city, state, temp, tempFeelsLike, time, windDeg, windSpeed);
  })

// Src для картинки получаем так:
// `http://openweathermap.org/img/wn/${icon}@2x.png`

// Погода по дням, всего 40 объектов, вам надо взять каждый 8-й, т.е [8, 16, 24, 32, 40]
fetchDataPromise('GET', urlWether5).then(res => {
  console.log(JSON.parse(res))
})
