// 'use strict';
//
// function loadAllItems() {
//   return [
//     {
//       barcode: 'ITEM000000',
//       name: '可口可乐',
//       unit: '瓶',
//       category: '食品',
//       subCategory: '碳酸饮料',
//       price: 3.00
//     },
//     {
//       barcode: 'ITEM000001',
//       name: '雪碧',
//       unit: '瓶',
//       category: '食品',
//       subCategory: '碳酸饮料',
//       price: 3.00
//     },
//     {
//       barcode: 'ITEM000002',
//       name: '苹果',
//       unit: '斤',
//       category: '食品',
//       subCategory: '水果',
//       price: 5.50
//     },
//     {
//       barcode: 'ITEM000003',
//       name: '荔枝',
//       unit: '斤',
//       category: '食品',
//       subCategory: '水果',
//       price: 15.00
//     },
//     {
//       barcode: 'ITEM000004',
//       name: '方便面',
//       unit: '袋',
//       category: '食品',
//       subCategory: '面食',
//       price: 4.50
//     }
//   ];
// }
//
// function loadPromotions() {
//   return [
//     {
//       type: 'More_Than_10_Discount_of_95%',
//       barcodes: [
//         'ITEM000000',
//         'ITEM000001',
//         'ITEM000004'
//       ]
//     }
//   ];
// }
'use strict';

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '羽毛球',
      unit: '个',
      price: 1.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: '单品批发价出售',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}
