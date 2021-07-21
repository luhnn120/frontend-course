/**
 * 反转链表
 * 时间复杂度O(n)
 * 空间复杂度O(1)
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
  let result  = null
  while(head){
    let tmp = head.next
    head.next = result;
    result = head;
    head = tmp
  }
  return result 
};