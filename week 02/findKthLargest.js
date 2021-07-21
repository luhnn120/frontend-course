/**
 * 数组中第K个最大元素
 * 基于快速排序的分治算法
 * 时间复杂度O(n) 随机基准值，期望接近于线性
 * 空间复杂度O(logn) 递归栈
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function(nums, k) {
  return findK(nums, 0, nums.length-1, k-1)
  function findK(arr, lo, hi, k){
    let mid = partion(arr, lo, hi)
    if(mid == k){
      return arr[mid]
    }
    if(mid > k){
      // 左半区
      return findK(arr, lo, mid-1, k)
    }else{
      // 右半区
      return findK(arr, mid+1, hi, k)
    }
  }
  // 分区算法 选择随机数作为基准值
   function partion(arr, lo, hi) {
    const random = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    let tmp = arr[random]
    arr[random] = arr[lo]
    arr[lo] = tmp
    let previo = arr[lo],left = lo, right = hi;
    while (left < right) {
      // 从大到小排序
      while(left < right && previo >= arr[right]) right--
      while(left < right && previo <= arr[left]) left++
      let tmp = arr[left]
      arr[left] = arr[right]
      arr[right] = tmp
    }
    arr[lo] = arr[right]
    arr[right] = previo
    return right
  }
};


/**
 * 数组中第K个最大元素
 * 基于二叉堆的优先队列算法
 * 时间复杂度O(n) 随机基准值，期望接近于线性
 * 空间复杂度O(logn) 递归栈
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargestByHeap = function(nums, k) {
  class Heap{
    constructor(data, compare){
      this.data = []
      // 大数在上
      this.compare = compare || ( (a,b) => b-a )
      for (let index = 0; index < data.length; index++) {
        this.give(data[index])
      }
    }
    // 弹出最大值
    take(){
      if(!this.data.length){
        return
      }
      let min = this.data[0]
      this.data[0] = this.data[this.data.length - 1] 
      for(let index = 0; index < this.data.length;){
        if(2*index + 1 > this.data.length - 1) {
          break
        }
        let minChildIndex = 2*index + 1 
        if(2*index + 2 <= this.data.length - 1 && this.compare(this.data[2*index+1], this.data[2*index+2]) > 0){
          minChildIndex = 2*index + 2
        }
        if(this.compare(this.data[index], this.data[minChildIndex]) > 0){
          let tmp = this.data[index]
          this.data[index] = this.data[minChildIndex]
          this.data[minChildIndex] = tmp
          index = minChildIndex
          continue
        }
        break
      }
      this.data.pop();
      return min
    }
    // 入列
    give(data){
      this.data.push(data)
      for(let index = this.data.length - 1; index >=1;) {
        let parentIndex = Math.floor((index-1)/2)
        if(this.compare(this.data[parentIndex], this.data[index]) > 0){
          let tmp = this.data[index]
          this.data[index] = this.data[parentIndex]
          this.data[parentIndex] = tmp
          index = parentIndex
          continue
        }
        break
      }
    }
   }
   const query = new Heap(nums);
   let result;
   for (let i = 0; i < k; i++) {
    result = query.take()
   }
   return result;
};
