'use strict';
function printReceipt(tags) {
  let formattedTags=formatTags(tags);
  let countBarcode=countBarcodes(formattedTags);
  let allItems=loadAllItems();
  let carItems=buildCartItems(countBarcode,allItems);
  let promotions=loadPromotions();
  let promotedItems=buildPromotedItems(carItems,promotions);
  let allPrice=calculateTotalPrices(promotedItems);
  let receipt=buildReceipt(promotedItems,allPrice);
  let receiptString=buildReceiptString(receipt);
  console.log(receiptString);
  return receiptString;
}
function formatTags(tags) {
  let formattedTags =tags.map((tag)=>
  {
    if(tag.includes("-"))
    {
      let [barcode,count]=tag.split("-");
      return{barcode:barcode,count:parseInt(count)};
    }
    else
    {
      return {barcode:tag,count:1};
    }
  });
 // console.info(formattedTags);
  return formattedTags;
}
function getCompare(array,barcode) {
  return array.find((customcount) =>customcount.barcode===barcode);
  // for(let countbarcode of array)
  // {
  //   if(countbarcode.barcode===barcode) {
  //     return countbarcode;
  //   }
  // }
  // return null;
}
function countBarcodes(formattedTags){
  let countedBarcodes=[];
  for(let carItem of formattedTags)
  {
    let countbarcode=getCompare(countedBarcodes,carItem.barcode)
    if(countbarcode===undefined)
    {
      countedBarcodes.push({barcode:carItem.barcode,count:carItem.count});
    }
    else
    {
      countbarcode.count+=carItem.count;
    }
  }
  //console.info(countBarcodes);
  return countedBarcodes;
}
function buildCartItems(countedBarcodes, allItems)
{
  let carItems=countedBarcodes.map(({barcode,count}) =>
  {
    let {name,unit,price}=getCompare(allItems,barcode);
    return {barcode,name,unit,price,count};
  });
console.info(carItems);
  return carItems;
}
function buildPromotedItems(carItems, promotions)
{
  let customPromotions=promotions.find((promotion)=>promotion.type==='单品批发价出售')
  return carItems.map((carItem)=>{
    let hasPromotion=customPromotions.barcodes.includes(carItem.barcode)&&carItem.count>10;
    let totalPrice=carItem.count*carItem.price;
    let saved=0;
    if(hasPromotion)
    {saved=parseFloat((totalPrice*0.05).toFixed(2));
    }
    let payPrice=totalPrice-saved;
    return Object.assign({},carItem,{payPrice,saved});
  })
}
function calculateTotalPrices(promotedItems)
{
   let promotedItem=promotedItems.reduce((result,{payPrice,saved})=>
{
  result.totalPayPrice+=payPrice;
  result.totalSaved+=saved;
  return result;
},{totalPayPrice:0,totalSaved:0});
//console.log(promotedItem);
  return promotedItem;
}
function buildReceipt(promotedItems, {totalPayPrice,totalSaved}) {
  let savedItems=promotedItems.filter((promotedItem) =>promotedItem.saved>0).map(({name,count,unit}) =>
  {
    return {name,count,unit};
  });
  return{
    promotedItems:promotedItems.map(({name,unit,price,count,payPrice,saved}) =>
    {
     return {name,unit,price,count,payPrice,saved};
    }),
    savedItems,
    totalPayPrice,
    totalSaved
  }
}
function buildReceiptString(receipt) {
  let lines = [' ***<没钱赚商店>购物清单***'];
  for (let {name, count, unit, price, payPrice, saved} of receipt.promotedItems) {
    let line = `名称：${name}，数量：${count}${unit}，单价：${price.toFixed(2)}，小计：${payPrice.toFixed(2)}(元)`;
    if (saved > 0) {
      line += `，优惠：${saved.toFixed(2)}(元)`
    }
    lines.push(line);
  }
  let hasSaved = receipt.savedItems.length > 0;
  if (hasSaved) {
    lines.push(`----------------------`);
    lines.push(`批发价出售商品：`);
    for (let {name, count, unit} of receipt.savedItems) {
      lines.push(`名称：${name}，数量：${count}${unit}`);
    }
  }
  lines.push(`----------------------`);
  lines.push(`总计：${receipt.totalPayPrice.toFixed(2)}(元)`);
  if (hasSaved) {
    lines.push(`节省：${receipt.totalSaved.toFixed(2)}(元)`)
  }
  lines.push(`**********************`);
  let receiptString=lines.join('\n');
  //console.log(receiptString);
  return receiptString;
}
