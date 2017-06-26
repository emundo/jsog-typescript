import { BackReference } from './BackReference';
import { JsonProperty } from '../../main/decorators/JsonProperty';

export class Reference {
    @JsonProperty()
    public reference: BackReference;
}
