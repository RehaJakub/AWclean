import type { ServicePageData } from "./types";
import { cisteniFasad } from "./cisteni-fasad";
import { cisteniStrech } from "./cisteni-strech";
import { cisteniDlazeb } from "./cisteni-dlazeb";
import { cisteniPrumyslovychObjektu } from "./cisteni-prumyslovych-objektu";
import { cisteniSvetliku } from "./cisteni-svetliku";
import { cisteniHlinikovychFasad } from "./cisteni-hlinikovych-fasad";
import { cisteniHistorickychFasad } from "./cisteni-historickych-fasad";
import { impregnaceFasadAStrech } from "./impregnace-fasad-a-strech";
import { cisteniPomniku } from "./cisteni-pomniku";
import { nanoImpregnace } from "./nano-impregnace";

import { nateryStrechAFasad } from "./natery-strech-a-fasad";
import { odstranovaniDopravnihoZnaceni } from "./odstranovani-dopravniho-znaceni";

export const servicePages: ServicePageData[] = [
  cisteniFasad,
  cisteniStrech,
  cisteniDlazeb,
  cisteniPrumyslovychObjektu,
  cisteniSvetliku,
  cisteniHlinikovychFasad,
  cisteniHistorickychFasad,
  cisteniPomniku,
  nateryStrechAFasad,
  impregnaceFasadAStrech,
  nanoImpregnace,
  odstranovaniDopravnihoZnaceni,
];
