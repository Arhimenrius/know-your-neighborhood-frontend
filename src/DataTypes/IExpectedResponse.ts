import { DrawableElement } from './DrawableElement';
import IResultGroup from './IResultGroup';

export default interface IExpectedResponse {
    results: IResultGroup[];
    drawable: DrawableElement[];
}
