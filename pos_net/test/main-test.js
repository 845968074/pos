'use strict';
describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const result = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
    expect(console.log).toHaveBeenCalledWith(result);
  });
})
;


//第一个测试
// describe("carItems of tags", function() {
//       let  tags = [
//       'ITEM000001',
//       'ITEM000003-2'
//     ];
//      let carItems=getCarItems(tags);
//   let expected=[
//     {
//       barcode:'ITEM000001',
//       count:1
//     },
//     {
//       barcode:'ITEM000003',
//       count:2
//     }
//   ];
//   it("test carItems the tags or not", function() {
//     expect(carItems).toEqual(expected);
//   });
// });
// //第二个测试
// describe("countedBarcodes of carItems", function() {
//   let  tags = [
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000003-2'
//   ];
//   let countedBarcodes=getCount(getCarItems(tags));
//   let expected=[
//     {
//       barcode:'ITEM000001',
//       count:2
//     },
//     {
//       barcode:'ITEM000003',
//       count:2
//     }
//   ];
//   it("test countedBarcodes the carItems or not", function() {
//     expect(countedBarcodes).toEqual(expected);
//   });
// });
// //第三个测试
// describe("countedBarcodes of customItems", function() {
//   let  tags = [
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000003-2'
//   ];
//   let customItems=getcustomItems(getCount(getCarItems(tags)),loadAllItems());
//   let expected=[
//     {
//       barcode: 'ITEM000001',
//       name: '雪碧',
//       unit: '瓶',
//       price: 3.00,
//       count: 2
//     },
//     {
//       barcode: 'ITEM000003',
//       name: '荔枝',
//       unit: '斤',
//       price: 15.00,
//       count: 2
//     }
//   ];
//   it("test countedBarcodes the carItems or not", function() {
//     expect(customItems).toEqual(expected);
//   });
// });
//
// //第四个测试
// describe("customItems of promotedItems", function() {
//   let  tags = [
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000003-2'
//   ];
//   let promotedItems=getSubtotal(getcustomItems(getCount(getCarItems(tags)),loadAllItems()),loadPromotions());
//   let expected=[
//     {
//       barcode: 'ITEM000001',
//       name: '雪碧',
//       unit: '瓶',
//       price: 3.00,
//       count: 3,
//       payPrice: 6,
//       saveSubtotal:3
//     },
//     {
//       barcode: 'ITEM000003',
//       name: '荔枝',
//       unit: '斤',
//       price: 15.00,
//       count: 2,
//       payPrice: 30,
//       saveSubtotal:0
//     }
//   ];
//   it("test customItems the promotedItems or not", function() {
//     expect(promotedItems).toEqual(expected);
//   });
// });
//
// //第五个测试
// describe("promotedItems of allPrices", function() {
//   let  tags = [
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000001',
//     'ITEM000003-2'
//   ];
//   let promotedItems=getSubtotal(getcustomItems(getCount(getCarItems(tags)),loadAllItems()),loadPromotions());
//   let allPrices=getPaymoney(promotedItems);
//   let expected=
//     {
//       pay:36,
//       save:3
//     };
//   it("test promotedItems ths allPrices or not", function() {
//     expect(allPrices).toEqual(expected);
//   });
// });

//第六个测试
describe("print of receipt", function() {
  let  tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2'
  ];
  let promotedItems=[
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00,
      count: 3,
      payPrice: 6,
      saveSubtotal:3
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      count: 2,
      payPrice: 30.00,
      saveSubtotal:0
    }
  ];
  let allPrices=   {
    pay:36.00,
    save:3.00
  };
  let recepitItems=getReceipt(promotedItems,allPrices);
  let recepit=[
    {
      name: '雪碧',
      unit: '瓶',
      price:3.00,
      count:3,
      payPrice:6
    },
    {
      name: '荔枝',
      unit: '斤',
      price:15.00,
      count:2,
      payPrice:30.00
    }];
  let expected={
    recepit,
    pay:36.00,
    save:3.00
  };
  it("test promotedItems ths allPrices or not", function() {
    expect(recepitItems).toEqual(expected);
  });
});
