export class Utility {
    static isNumeric(value: string): boolean {
      return !isNaN(parseFloat(value)) && isFinite(Number(value));
    }
  }