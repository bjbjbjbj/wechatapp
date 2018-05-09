//计算工具
function express() {

  function express(expression) {
    return cc(c2a(expression));
  }

  // 两个浮点数求和  
  express.add = function (a, b) {
    var r1, r2, m;
    try {
      r1 = a.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = b.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return Math.round(a * m + b * m) / m;
  }

  // 两个浮点数相减  
  express.sub = function (a, b) {
    var r1, r2, m, n;
    try {
      r1 = a.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = b.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return (Math.round(a * m - b * m) / m).toFixed(n);
  }

  // 两数相除  
  express.div = function (a, b) {
    var t1, t2, r1, r2;
    try {
      t1 = a.toString().split('.')[1].length;
    } catch (e) {
      t1 = 0;
    }
    try {
      t2 = b.toString().split(".")[1].length;
    } catch (e) {
      t2 = 0;
    }
    r1 = Number(a.toString().replace(".", ""));
    r2 = Number(b.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  }

  express.mul = function (a, b) {
    var m = 0, s1 = a.toString(), s2 = b.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  }

  // 运算符优先级  
  var priority = express.priority = {
    "+": 1,
    "-": 1,
    "*": 9,
    "/": 9,
    "%": 9
  };

  var cal = {
    "+": function (a, b) {
      return express.add(a, b);
    },
    "-": function (a, b) {
      return express.sub(a, b);
    },
    "*": function (a, b) {
      return express.mul(a, b);
    },
    "/": function (a, b) {
      return express.div(a, b);
    }
  };

  // 中缀表达式转后缀表达式  
  function c2a(exp) {
    exp = exp.replace(/\s+/g, "").match(/[1-9]\d{0,}(?:\.\d+)?|[\+\-\*\/\%]/g);
    var stack = [], result = [];
    stack.peek = function () {
      return this[this.length - 1];// 弹出但不删除  
    }

    for (var i = 0; i < exp.length; i++) {
      var v = exp[i];
      if (/[1-9]\d{0,}(?:\.\d+)?/.test(v)) {
        // 1.遇到操作数：直接输出（添加到后缀表达式中)  
        result.push(v);
      } else if (stack.length === 0) {
        // 2.栈为空时，遇到运算符，直接入栈  
        stack.push(v);
      } else if (v == "(") {
        // 3.遇到左括号：将其入栈  
        stack.push(v);
      } else if (v == ")") {
        // 4.遇到右括号：执行出栈操作，并将出栈的元素输出，直到弹出栈的是左括号，左括号不输出。  
        while (stack.peek() !== "(") {
          result.push(stack.peek())
          stack.pop();
          if (stack.length === 0) {
            return new Error("error expression"); // 缺少左括号  
          }
        }
        stack.pop();
      } else if (/[\+\-\*\/\%]/.test(v)) {
        // 5.遇到其他运算符：加减乘除：弹出所有优先级大于或者等于该运算符的栈顶元素，然后将该运算符入栈  
        while (priority[v] <= priority[stack.peek()]) {
          result.push(stack.peek())
          stack.pop();
        }
        stack.push(v);
      }
    }
    // 6.最终将栈中的元素依次出栈，输出。  
    while (stack.length > 0) {
      if (stack.peek() === '(') {
        return new Error("error expression"); // 缺少右括号  
      }
      result.push(stack.pop())
    }

    return result;
  }

  // 计算结果  
  function cc(queue) {
    var v, a, b, stack = [];
    while (queue.length > 0) {
      var v = queue.shift();
      if (/[1-9]\d{0,}(?:\.\d+)?/.test(v)) {
        stack.push(v)
      } else {
        b = stack.pop();
        a = stack.pop();
        stack.push(cal[v](a, b));
      }
    }
    if (stack.length === 1) {
      return stack.pop();
    }

    return null;
  }

  return express;

}