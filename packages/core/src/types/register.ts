import { Action } from '@core/models/action';
import { Component } from '@core/models/component';
import { Variable } from '@core/models/variable';

export type BuildPlaygroundOptions = {
 actions:Action[], 
 variables:Variable[], 
 components:Component[]
}