import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import DomPurify from 'dompurify';


@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(
    protected sanitizer : DomSanitizer
    ){

    }

  public transform(value: any) :any {
   const sanitizedContent = DomPurify.sanitize(value);
   return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }

}
