import { Injectable } from '@angular/core';
import { MeasurementUnitIdEnum } from '../app.models';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor() { }

  convertQtyByEnum(qty: any, unitId: any){
    console.log(qty)
    console.log(unitId)
    qty = parseFloat(qty)
    unitId = parseInt(unitId)
    let convertedQty:number;

    switch(unitId){
      //volume - milliliters
      case MeasurementUnitIdEnum.Pinch:
        convertedQty = qty * 0.31;
        break;
      case MeasurementUnitIdEnum.Dash:
        convertedQty = qty * 0.62;
        break;
      case MeasurementUnitIdEnum.Teaspoon:
        convertedQty = qty * 4.93;
        break;
      case MeasurementUnitIdEnum.Tablespoon:
        convertedQty = qty * 14.79;
        break;
      case MeasurementUnitIdEnum.Cup:
        convertedQty = qty * 236.59;
        break;
      case MeasurementUnitIdEnum.Gallon:
        convertedQty = qty * 3785.41;
        break;
      case MeasurementUnitIdEnum.Milliliter:
        convertedQty = qty * 1;
        break;
      case MeasurementUnitIdEnum.Liter:
        convertedQty = qty * 1000;
        break;
      case MeasurementUnitIdEnum.FluidOunce:
        convertedQty = qty * 29.57;
        break;

      //weight - grams
      case MeasurementUnitIdEnum.Ounce:
        convertedQty = qty * 28.35;
        break;
      case MeasurementUnitIdEnum.Can:
        convertedQty = qty * 425.24;
        break;
      case MeasurementUnitIdEnum.Pound:
        convertedQty = qty * 453.592;
        break;
      case MeasurementUnitIdEnum.Gram:
        convertedQty = qty * 1;
        break;
      case MeasurementUnitIdEnum.Sixteenth:
        convertedQty = qty * 0.0625;
        break;
      case MeasurementUnitIdEnum.Eighth:
        convertedQty = qty * 0.125;
        break;
      case MeasurementUnitIdEnum.Quarter:
        convertedQty = qty * 0.25;
        break;
      case MeasurementUnitIdEnum.Half:
        convertedQty = qty * 0.5;
        break;
      case MeasurementUnitIdEnum.Whole:
        convertedQty = qty * 1;
        break;
      default:
        convertedQty = qty;
        break;
    }
    console.log(convertedQty)
    return convertedQty;
  }

  convertQty(qty: number, unit: string){
    switch(unit){
      //volume - milliliters
      case "Pinch":
        return qty * 0.31;
      case "Dash":
        return qty * 0.62;
      case "Teaspoon":
        return qty * 4.93;
      case "Tablespoon":
        return qty * 14.79;
      case "Cup":
        return qty * 236.59;
      case "Gallon":
        return qty * 3785.41;
      case "Milliliter":
        return qty * 1;
      case "Liter":
        return qty * 1000;
      //weight - grams
      case "Ounce":
        return qty * 28.35;
      case "Can":
        return qty * 425.24;
      case "Pound":
        return qty * 453.592;
      case "Gram":
        return qty * 1;
      case "Sixteenth":
        return qty * 0.0625;
      case "Eighth":
        return qty * 0.125;
      case "Quarter":
        return qty * 0.25;
      case "Half":
        return qty * 0.5;
      case "Whole":
        return qty * 1;
      default:
        return qty;
    }
  }

  returnMeasurementUnits(){
    let measurementNames: string[] = [];
    for(let enumValue in MeasurementUnitIdEnum){
      if(isNaN(Number(enumValue))){
        measurementNames.push(enumValue)
      }
    }
    return measurementNames;
  }
}
