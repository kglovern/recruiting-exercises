import { InventoryAllocator } from '../src/InventoryAllocator';

describe('InventoryAllocator with various combinations', () => {
  test('should match exact inventory in first warehouse', () => {
    expect(InventoryAllocator.getShipment({ apple: 1 },
      [{ name: 'owd', inventory: { apple: 1 } }]))
      .toEqual(expect.arrayContaining([
        expect.objectContaining({
          owd: { apple: 1}
        })
      ]));
  });

  test('should match exact inventory in later warehouse', () => {
    expect(InventoryAllocator.getShipment({ banana: 5 },
      [{ name: 'owd', inventory: { apple: 5, orange: 10 } },
        { name: 'dm', inventory: { banana: 5, orange: 10 } } ]))
      .toEqual([{ dm: { banana: 5 }}]);
  });

  test('should match cheapest inventory when available across multiple warehouses', () => {
    expect(InventoryAllocator.getShipment({ apple: 1 },
      [{ name: 'owd', inventory: { apple: 1 } }]))
      .toEqual([{ owd: { apple: 1 }}]);
  });

  test('should return empty array if insufficient inventory in single warehouse', () => {
    expect(InventoryAllocator.getShipment({ apple: 1 },
      [{ name: 'owd', inventory: { apple: 0 } }]))
      .toEqual([]);
  });

  test('should return empty array if insufficient inventory across multiple warehouse', () => {
    expect(InventoryAllocator.getShipment({ apple: 3 },
      [{ name: 'owd', inventory: { apple: 1 } },
        { name: 'dm', inventory: { apple: 1 } }]))
      .toEqual([]);
  });

  test('should return empty array if item does not exist in any warehouse', () => {
    expect(InventoryAllocator.getShipment({ apple: 3 },
      [{ name: 'owd', inventory: { banana: 10 } },
        { name: 'dm', inventory: { orange: 1 } }]))
      .toEqual([]);
  });

  test('should match inventory available across multiple warehouses', () => {
    expect(InventoryAllocator.getShipment({ apple: 10 },
      [{ name: 'owd', inventory: { apple: 5 } },
        { name: 'dm', inventory: { apple: 5 }}]))
      .toEqual([{ owd: { apple: 5 }}, { dm: { apple: 5 } }]);
  });

});
