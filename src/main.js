// document.createElement('div')
const div = dom.create('<div>newDiv</div>')
console.log(div)

const yu = dom.create('<div>yu</div>')

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)

const nodes = dom.empty(window.empty)
console.log(nodes)

dom.attr(test, 'title', 'rainMan')
const title = dom.attr(test, 'title')
console.log(title)

dom.text(test, '你好，rain')

dom.style(test, 'border', '1px solid red')

dom.class.add(test, 'red')
dom.class.remove(test, 'red')
dom.class.add(test, 'skyblue')
const fn = () => {
  console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#testDiv')[0]

console.log(dom.find('.red')[0])

const son = dom.find('#erzi')[0]
console.log(dom.parent(son))

const s1 = dom.find('#s1')[0]
const s2 = dom.find('#s2')[0]
const s3 = dom.find('#s3')[0]
console.log(s2)
console.log(dom.previous(s2))

const t = dom.find('#space')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'skyblue'))

console.log(dom.index(s1))
const testSpace = dom.find('#space')[0]
console.log(testSpace)
console.log(dom.find('.skyblue', testSpace)[0])
