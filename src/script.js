import {gsap} from "./node_modules/gsap/index.js";
// import { chunk} from "lodash-es";



console.log('everythingworks so far')
function *fourValues() {
  yield 6
  yield 7
  yield 8
  yield 9
}
for(let x of fourValues()) {
  console.log(x)
}


  // for in vs for of
let arr = ['el1', 'el2', 'el3'];

arr.addedProp = 'arrProp';

// elKey are the property keys
for (let elKey in arr) {
  console.log(elKey);
}

// elValue are the property values
for (let elValue of arr) {
  console.log(elValue)
}

async function getData() {
 try {
 const resp = await axios.get("http://covid19.th-stat.com/api/open/today");
  
   return resp.data; 
 } catch(err) {
  console.log(err.message)
  return null
}

/*.then( (resp) => {
  for(const prop in resp.data) {
    console.log(`${prop} = ${resp.data[prop]}`);
  }
  })
  */
 

}

const root = document.getElementById("root")
const updatedate = document.getElementById("updatedate")

function renderInfo(label,value) {
  const el = `<div class="item">
    <p class="item-text">${label} <span class="value-format">${value}</span></p>
    </div>`
  root.insertAdjacentHTML('beforeend',el)
}

function renderData(data) {
  // get only the first 8
  const keys = Object.keys(data).slice(0,8)
  
  // split on Capital to make it nice
  let labels  = keys.map( s=>s.split(/(?=[A-Z])/).join(' '))
  
  // render each data in a box
  let l,v;
  for(const [i,prop] of keys.entries()) {
   l = labels[i]
   v = formatInt(data[prop]);
   renderInfo(l,v);
  }
 
  const update = formatDateStrDM(data['UpdateDate']);
  
  updatedate.textContent = update;
}

async function main() {
  let data = await getData()
  data = changeOrder(data, [4, 7, 6, 5, 0, 1, 2, 3,8,9,10])
  renderData(data)
  setTimeout(animateData,1000)
  
}

function formatDateStrDM(ds) {
  // cut the time oit
  const dt = ds.slice(0,10)
  const dt1 = moment(dt,"DD/MM/YYYY")
  return dt1.format('MMMM DD')
  
}


function formatInt(num) {
  return numeral(num).format('0,0')
}


//console.log(formatInt(12345))
function animateData() {
  const anim = el=> el.classList.add("item-animate");
  Array.from(root.children).forEach(anim);
}

function changeOrder(data,order = []) {
 const en = Object.entries(data);
 const res = order.map(i => en[i])
 const ores = Object.fromEntries(res)
 return ores;
 }

async function main2() {
  let data = await getData()
  data = changeOrder(data,[4,7,6,5,0,1,2,3])
  console.log(data)
}

console.log("start")
gsap.fromTo("#thai", {x: -400, opacity: 0}, {duration: 1, x: 0, opacity: 1});

main()
