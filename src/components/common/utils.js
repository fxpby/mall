//防抖函数(参数一：函数，参数二：延迟时间)
export function debounce(func, delay){
  let timer = null;

  return function (...args) {
    //清除
    if (timer) clearTimeout(timer)
    //重新计时
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}