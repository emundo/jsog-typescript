import { Reference } from './Reference';
import { JsonProperty } from '../../main/decorators/JsonProperty';

export class BackReference {
    @JsonProperty()
    public backReference: Reference;
}
