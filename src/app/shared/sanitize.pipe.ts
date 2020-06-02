import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**Deprecated: This was used in my initial approach to this problem to bypass the chrome security */
@Pipe({ name: 'noSanitize' })
export class NoSanitizePipe implements PipeTransform {
   constructor(private domSanitizer: DomSanitizer) {

   }
   transform(html: string): SafeHtml {
      return this.domSanitizer.bypassSecurityTrustHtml(html);
   }
}