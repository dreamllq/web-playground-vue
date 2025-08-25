import { Action } from '../models/action';
import { Component } from '../models/component';
import { Variable } from '../models/variable';

export type BuildPlaygroundOptions = {
 actions:Action[], 
 variables:Variable[], 
 components:Component[]
}