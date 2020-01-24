export interface Warehouse {
  name: string,
  inventory: object;
}

/**
 * InventoryAllocator
 */
export class InventoryAllocator {
  /**
   * getShipment -> Array<Object>
   *   Returns an array representing a shipment of items from a set of warehouses assuming that the first warehouse is
   *   the cheapest and the goal is to minimize cost
   * @param order - dictionary of items requested in an order
   * @param inventoryDistribution - distribution of available inventory across warehouses
   */
  public static getShipment(order: object = {}, inventoryDistribution: Array<Warehouse> = []): Array<object> {
    const currentShipment: Array<object> = [];

    for (let warehouse of inventoryDistribution) {
      let warehouseShipment: object = {};

      for (let item of Object.keys(order)) {
        if (item in warehouse.inventory) {
          if (warehouse.inventory[item] >= order[item]) {
            warehouseShipment[item] = order[item];
            delete order[item];
          } else {
            warehouseShipment[item] = warehouse.inventory[item];
            order[item] = order[item] - warehouse.inventory[item];
            if (order[item] == 0) {
              delete order[item];
            }
          }
        }
      }

      if (Object.keys(warehouseShipment).length != 0) {
        currentShipment.push({ [warehouse.name]: warehouseShipment });
      }
    }

    return (Object.keys(order).length == 0)
      ? currentShipment
      : [];
  }
}
