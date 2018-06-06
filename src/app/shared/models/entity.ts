export abstract class Entity { 
    deserialize(input:Entity): Entity{
        Object.assign(this, input);
        return  this;
    }
}