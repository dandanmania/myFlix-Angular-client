import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idConvert'
})
export class IdConvertPipe implements PipeTransform {
  
  /**
   * Filter Objects or ID's
   * @param items Array with ID's or Objects
   * @param filter Array of ID's that need to be filtered
   * @returns Array with filtered objects
   */
  transform(items: any[], filter: Object): any {
    // If items or filter doesn't have anything, return items
    if (!items || !filter) {
      return items;
    }
    let itemContainer = [];

    // Iterate over every item and check for ID inclusion and then pass to itemContainer if it exists
    for (let i = 0; i <= 10; i++){
      let filteredContainer = items.filter(item => item._id.includes(Object.values(filter)[i]))
      if (filteredContainer.length >= 1) {
        itemContainer.push(filteredContainer[0])
      }
    }

    return itemContainer
  }
}
