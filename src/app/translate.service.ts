///<reference path="../../node_modules/@types/node/index.d.ts"/>
import {Observable} from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import {join} from 'path';
declare var require: any;
// @ts-ignore
const fs = require('fs');

export class TranslateUniversalLoader implements TranslateLoader {
  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      const assets_folder = join(process.cwd(), 'dist', 'browser', 'assets');
      observer.next(JSON.parse(fs.readFileSync(`${assets_folder}/i18n/${lang}.json`, 'utf8')));
      observer.complete();
    });
  }
}
