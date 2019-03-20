import { Converter } from "./Converter";
import { ConverterFactory } from "./ConverterFactory";
import { Converters } from "./Converters";

export interface MappingContext {
  converters: Converters;
}
