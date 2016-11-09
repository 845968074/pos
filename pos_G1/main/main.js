'use strict';
function printReceipt(tags) {
  let formattedTags=formatTags(tags);
  let countedBarcodes=countBarcodes(formattedTags);
  let allItems=loadAllItems();
  let carItems=buildCartItems(countedBarcodes, allItems);
  let promotions=loadPromotions();
  let promotedItems=buildPromotedItems(carItems, promotions);
  let totalPrices = calculateTotalPrices(promotedItems);
  let receipt= buildReceipt(promotedItems, totalPrices);
  let receiptString=buildReceiptString(receipt);
  console.log(receiptString);
}
function formatTags(tags) {
  return tags.map((tag) =>
  {
    if(tag.includes("-"))
    {
      let [barcode,count]=tag.split("-");
      return {barcode:barcode,count:parseInt(count)};
    }
    else
    {
      return {barcode:tag,count:1};
    }
  })
}

function getCompare(array,barcode) {
  return array.find((customcount) =>customcount.barcode===barcode);
}
function countBarcodes(formattedtags) {
  return formattedtags.reduce((result,formattedtag) =>
  {
    let temp=getCompare(result,formattedtag.barcode);
    if(temp)
    {
      temp.count+=formattedtag.count;
    }
    else {result.push(formattedtag);}
    return result;
  },[]);
}
function buildCartItems(countedBarcodes, allItems) {
  return countedBarcodes.map(({barcode,count}) =>
  {
    let{name,unit,price}=getCompare(allItems,barcode);
    return {barcode,name,unit,price,count};
  })
}
function buildPromotedItems(cartItems, promotions){
   let custompromotions=promotions.find((promotion)=> promotion.type==='单品批发价出售') ;
   return cartItems.map((cartItem) =>{
     let hasPromotions=custompromotions.barcodes.includes(cartItem.barcode)&&cartItem.count>10;
     let totalPayprice=parseFloat((cartItem.price*cartItem.count).toFixed(2));
     let saved=0;
     if(hasPromotions)
     {saved=parseFloat((totalPayprice*0.05).toFixed(2));
     }
     let payPrice=totalPayprice-saved;
     return Object.assign({},cartItem,{payPrice,saved});
   })
}
function calculateTotalPrices(promotedItems) {
  return promotedItems.reduce((result,{payPrice,saved}) =>
  {
    result.totalPayPrice+=payPrice;
    result.totalSaved+=saved;
    return result;
  },{totalPayPrice: 0,totalSaved:0})
}
function  buildReceipt(promotedItems, {totalPayPrice,totalSaved}) {
  let savedItems=promotedItems.filter((promotedItem) =>promotedItem.saved>0).map(({name,count,unit}) =>
  {
    return {name,count,unit};
  });
  return {
    promotedItems : promotedItems.map(({name,count,unit,price,payPrice,saved}) =>
    {
      return {name,count,unit,price,payPrice,saved};
    }),
    savedItems,
    totalPayPrice,
    totalSaved
  }
}
function buildReceiptString(receipt) {
  let lines = ['***<没钱赚商店>购物清单***'];
  for (let {name, count, unit, price, payPrice, saved} of receipt.promotedItems) {
    let line = `名称：${name}，数量：${count}${unit}，单价：${price.toFixed(2)}(元)，小计：${payPrice.toFixed(2)}(元)`;
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
  console.log(receiptString);
 // return receiptString;
}
