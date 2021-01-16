window.dom = {
  create(string) {
    // template是可以容纳任何标签，如果我们这里是div，那么往里放td就会报错
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    // 必须要这么写才能返回正确的
    return container.content.firstChild
  },
  // 开始增增增增增增增增增增增增增增增增增增增增增开始
  // 追加到它的后面
  after(node, node2) {
    // 插入到你想插入的节点 的后面的前面
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  append(parent, node) {
    parent.appendChild(node)
  },
  // div1 > div2
  // 我们直接把新来的div3(parent)放到div2的起那面
  // 然后再把div2直接append到div2的里面
  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },
  // 开始增增增增增增增增增增增增增增增增增增增增增结束
  // 删删删删删删删删删删删删删删删删删删删删删删开始
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  // 把一个节点里的儿子全都拿走
  empty(node) {
    const array = []
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  // 删删删删删删删删删删删删删删删删删删删删删删结束
  // 改改改改改改改改改改改改改改改改改改改改改改开始
  // 改某个属性的值
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      //适配 如果他支持这个innerText就用，不然就用textContent
      if ('innerText' in node) {
        node.innerText = string
      } else {
        node.textContent = string
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div,'color')

        return node.style[name]
      } else if (name instanceof Object) {
        // dom.stlye(div,{color:'red'})

        const object = name
        for (let key in object) {
          //node.style.color =...
          //node.style.border=...
          node.style[key] = object[key]
        }
      }
    }
  },

  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      node.classList.has(className)
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  // 改改改改改改改改改改改改改改改改改改改改改改结束
  // 查查查查查查查查查查查查查查查查查查查查查查开始

  // 前面是选择器，后面是在哪块空间中寻找这个选择器
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.children
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node)
  },
  // 返回下一个节点
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  // 返回上一个节点
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  // 返回当前节点在父亲节点内的排名
  index(node) {
    const list = dom.children(node.parentNode)
    let j
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        j = i
        break
      }
    }
    return j
  },
  // 查查查查查查查查查查查查查查查查查查查查查查结束
}
