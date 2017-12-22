# JavaScript Object Graphs with Typescript

[![Build Status](https://travis-ci.org/emundo/jsog-typescript.svg?branch=master)](https://travis-ci.org/emundo/jsog-typescript)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1aa8312b430447083609f8ca5519136)](https://www.codacy.com/app/simonnagl/jsog-typescript?utm_source=github.com&utm_medium=referral&utm_content=emundo/jsog-typescript&utm_campaign=badger)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/f1aa8312b430447083609f8ca5519136)](https://www.codacy.com/app/simonnagl/jsog-typescript?utm_source=github.com&utm_medium=referral&utm_content=emundo/jsog-typescript&utm_campaign=Badge_Coverage)

This Typescript module implements [JSOG format](https://github.com/jsog/jsog).
It is able to instantiante typescript objects during deserialization.

## Usage

### Installation

```
npm install --save jsog-typescript
```

Enable typescript `experimentalDecorator` and `emitDecoratorMetadata` compiler options.

Minimal tslint.json:
```
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
    }
}
```

### General

Generate a new instance of the service. See Integration for integration to some popular frameworks.

```
import { jsogService } from 'jsog-typescript'

const jsog = new JsogService();
```

Use it to serialize and deserialize JavaScript Objects.
```
jsog.serialize(javaScriptObject);
jsog.deserialize(jsogObjectGraph);
```

### Instatiate Typescript Objects

Description how to instatiate Typescript objects to provide convinent methods and use the `typeof` operator.

Instantiate the root object or a list of rootObjects:
```
jsog.deserializeObject(jsogObjectGraph, ExampleClass);
jsog.deserializeArray(jsogObjectArray, ExampleClass);
```

To instantiate references somewhere in the tree decorate class properties to instantiate with `@JsonProperty()` and properties with Lists containing objects of type `ExamplecClass` use `@JsonProperty(ExampleClass)`.

### Integration

#### Angular 4

Provide JsogService as an Angular 4 Service which can be injected into your Components/Services.

```
import { NgModule } from '@angular/core';
import { JsogService } from 'jsog-typescript';

@NgModule({
    providers: [
        JsogService
    ]
)}
```

#### AngularJs

Register JsogService as an Angular Service

```
import { module } from 'angular';
import { JsogService } from 'jsog-typescript';

module.service('JsogService', JsogService)
```

## Developer Guide

### System dependencies
- [npm](https://www.npmjs.com/) (4.6.1)

## Author

* Simon Nagl (simon.nagl@e-mundo.de)

## License

This software is provided under the [MIT license](http://opensource.org/licenses/MIT)

This software uses code and ideas from:

- [JSOG - JavaScript Object Graph](https://github.com/jsog/jsog)
- [json-typescript-mapper](https://github.com/jf3096/json-typescript-mapper)
