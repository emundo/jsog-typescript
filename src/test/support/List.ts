import { ListItem } from './ListItem';
import { JsonProperty } from '../../main/decorators/JsonProperty';

export class List {
    @JsonProperty(ListItem)
    public allItem: ListItem[] = [];
}
