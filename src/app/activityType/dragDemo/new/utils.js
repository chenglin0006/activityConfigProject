import * as Util from '../../../../util/';
export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
  
    const result = [...arr];
    let itemToAdd = Util.deepClone(payload);
    itemToAdd.id = itemToAdd.id+'-'+new Date().getTime();
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
  
    return result;
  };
  
  export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(creator(i));
    }
    return result;
  };

  export const deleteItems = (arr, item) => {
      return arr.filter((ele)=>{
        return ele.id != item.id
      })
  }