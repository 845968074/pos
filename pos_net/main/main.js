'use strict';
function printReceipt(tags) {
  let carItems=getCarItems(tags);
   let countedBarcodes=getCount(carItems);
   let allItems=loadAllItems();
  let customItems=getcustomItems(countedBarcodes,allItems);
  let promotions=loadPromotions();
  let promotedItems=getSubtotal(customItems,promotions);
  let allPrices=getPaymoney(promotedItems);
  let receiptItems=getReceipt(promotedItems,allPrices);
   let receiptString=getReceiptString(receiptItems);
  console.log(receiptString);
  // return receiptString;
}
function getCarItems(tags) {
  let carItems=tags.map((tag) =>
  {
    if(tag.includes("-"))
    {
      let temp=tag.split("-");
      return({barcode:temp[0],count:parseInt(temp[1])});
    }
    else
    {
      return({barcode:tag,count:1});
    }
  });
  //console.info(carItems);
  return carItems
}
function getCompare(arry,barcode) {
  let customcounts=arry;
  for(let customcount of customcounts)
  {
    if(customcount.barcode===barcode)
      return customcount;
  }
  return null;
}
function getCount(carItems)
{
  let countedBarcodes=[];
  for(let carItem of carItems)
  {
    let item=getCompare(countedBarcodes,carItem.barcode);
    if(item===null)
    {
     countedBarcodes.push({barcode:carItem.barcode,count:carItem.count})
    }
    else
    {
      item.count+=carItem.count;
    }
  }
  return countedBarcodes;
}
function getcustomItems(countedBarcodes,allItems){
  let customItems=[];
  for(let countBarcode of countedBarcodes)
  {
    let item=getCompare(allItems,countBarcode.barcode);
    let items=
    {
      barcode:item.barcode,
      name:item.name,
      unit:item.unit,
      price:item.price,
      count:countBarcode.count
    };
    customItems.push(items);
  }
  return customItems;
}
function getSubtotal(customItems,promotions) {
  let  custompromotion=promotions[0];
  let promotiomItems=[];
  for(let customItem of customItems)
  {
    let haspromotion=false;
    let saveSubtotal=0;
    for(let barcode of custompromotion.barcodes)
    {
      if(customItem.barcode===barcode)
      {
        haspromotion=true;
      }
    }
    if(custompromotion.type==='BUY_TWO_GET_ONE_FREE'&&haspromotion)
    {
      var saveCount=Math.floor(customItem.count/3);
      saveSubtotal=saveCount*customItem.price;
    }
    let payPrice=customItem.count*customItem.price-saveSubtotal;
    promotiomItems.push({
      barcode:customItem.barcode,
      name:customItem.name,
      unit:customItem.unit,
      price:customItem.price,
      count:customItem.count,
      payPrice:payPrice,
      saveSubtotal:saveSubtotal
    });
  }
  console.info(promotiomItems);
  return promotiomItems;
}
function getPaymoney(promotedItems) {
  let pay=0;
  let save=0;
  for(let promotedItem of promotedItems)
  {
    pay+=promotedItem.payPrice;
    save+=promotedItem.saveSubtotal;
  }
  let allPrices={
    pay:pay,
    save:save
  };
  return allPrices;
}
function getReceipt(promotedItems,allPrices) {
  let  recepit=promotedItems.map((promote) =>
  {
    return{
      name:promote.name,
      unit:promote.unit,
      price:promote.price,
      count:promote.count,
      payPrice:promote.payPrice
    }
  });
  return{
    recepit,
    pay:allPrices.pay,
    save:allPrices.save
  };
}
function getReceiptString(receiptItems) {
  let paymoney = receiptItems.pay;
  let savemoney = receiptItems.save;
  let expectText = "";
  for (let receiptItem of receiptItems.recepit) {
    expectText+='名称：${receiptItem.name},数量:${receiptItem.count},单价：${receiptItem.price.toFixed(2)}(元),小计：${receiptItem.payPrice.toFixed(2)}(元)';
    expectText += "\n";
  }
  expectText+= '***<没钱赚商店>收据***${receiptItemsString}----------------------总计：${totalPayPrice.toFixed(2)}(元)节省：${saved.toFixed(2)}(元)**********************';
  let result={
    expectText
  };
  console.info();
  return result;
}
