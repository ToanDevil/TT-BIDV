import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Thực hiện điều kiện lọc dựa trên giá trị tìm kiếm
      return item.name.toLowerCase().includes(searchText)
          || item.email.toLowerCase().includes(searchText)
          // Thêm các điều kiện lọc khác nếu cần
    });
  }
}
