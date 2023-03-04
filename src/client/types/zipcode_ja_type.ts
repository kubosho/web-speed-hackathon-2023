export type ZipCodeJa = Record<
  string,
  {
    zipcode: string;
    zipcodeOld: string;
    jisX0402: string;
    address: string[];
    ruby: string[];
    status: number[];
  }
>;
