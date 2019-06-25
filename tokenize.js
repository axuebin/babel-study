/**
 * 词法分析 tokenize
 * @param {string} code JavaScript 代码
 * @return {Array} tokens
 */
function tokenize(code) {
    if (!code || code.length === 0) {
        return [];
    }
    var current = 0; // 记录位置
    var tokens = []; // 定义一个空的 token 数组
    
    var LETTERS = /[a-zA-Z\$\_]/i;
    var KEYWORDS = /const/; //  模拟一下判断是不是关键字
    var WHITESPACE = /\s/;
    var PARENS = /\(|\)/;
    var NUMBERS = /[0-9]/;
    var OPERATORS = /[+*/-]/;
    var PUNCTUATORS = /[~!@#$%^&*()/\|,.<>?"';:_+-=\[\]{}]/;
    
    // 从第一个字符开始遍历
    while (current < code.length) {
        var char = code[current];
        // 判断空格
        if (WHITESPACE.test(char)) {
          current++;
          continue;
        }
        // 判断连续字符
        if (LETTERS.test(char)) {
            var value = '';
            var type = 'Identifier';
            while (char && LETTERS.test(char)) {
                value += char;
                char = code[++current];
            }
            // 判断是否是关键字
            if (KEYWORDS.test(value)) {
                type = 'Keyword'
            }
            tokens.push({
                type: type,
                value: value
            });
            continue;
        }
        // 判断小括号
        if (PARENS.test(char)) {
            tokens.push({
              type: 'Paren',
              value: char
            });
            current++;
            continue;
        }
        // 判断连续数字
        if (NUMBERS.test(char)) {
          var value = '';
          while (char && NUMBERS.test(char)) {
            value += char;
            char = code[++current];
          }
          tokens.push({
            type: 'Number',
            value: value
          });
          continue;
        }
        // 判断运算符
        if (OPERATORS.test(char)) {
            tokens.push({
                type: 'Operator',
                value: char
            });
            current++;
            continue;
        }
        // 判断箭头函数
        if (PUNCTUATORS.test(char)) {
            var value = char;
            var type = 'Punctuator';
            var temp = code[++current];
            if (temp === '>') {
                type = 'ArrowFunction';
                value += temp;
                current ++;
            }
            tokens.push({
                type: type,
                value: value
            });
            continue;
        }
        tokens.push({
            type: 'Identifier',
            value: char
        });
        current++;
    }
    return tokens;
}