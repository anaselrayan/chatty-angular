import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstWord'
})
export class FirstWordPipe implements PipeTransform {

  transform(value: string): string | boolean
    {
        if (value == null) {
          return value;
        }
        const words = value.split(' ');
        return words.length > 0 ? words[0] : value;
    }
}
