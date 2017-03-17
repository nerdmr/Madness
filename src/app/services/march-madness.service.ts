import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestOptionsArgs, URLSearchParams }          from '@angular/http';

import { WeightConfig } from '../components/weight-configurator.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MarchMadnessService {
    //private host: string = "http://71.90.79.66:2018";
    //private host: string = "http://localhost:2017";
    //private host: string = "http://localhost:50980";    
    private host: string = "http://windows.bruflodt.com.192-185-6-33.secure14.win.hostgator.com";
                              

    //private host: string = "http://localhost:2020";

    private weightsEndpoint: string = this.host + "/api/Madness/GetWeights";
    private bracketsEndpoint: string = this.host + "/api/Madness/GetProjectedBrackets";
    private singleBracketEndpoint: string = this.host + "/api/Madness/GetSingleProjectedBracket";
    private saveWeightsEndpoint: string =this.host +  "/api/Madness/SaveWeights";
    private loadWeightsEndpoint: string =this.host +  "/api/Madness/LoadWeightConfiguration";
    
    constructor(public http: Http) { }

    public GetWeights() { 
        return this.http.get(this.weightsEndpoint).map(this.response).catch(this.handleError);
    }

    public GetProjectedBrackets(weights: WeightConfig) {       
         var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = {
          headers: headers
      };

        return this.http.post(this.bracketsEndpoint, weights, options).map(this.response).catch(this.handleError);
    }

    public GetSingleProjectedBracket(weights: WeightConfig) {
         var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = {
          headers: headers
      };

        return this.http.post(this.singleBracketEndpoint, weights, options).map(this.response).catch(this.handleError);
    }

    public SaveWeights(weights: WeightConfig) {
             var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = {
          headers: headers
      };

        return this.http.post(this.saveWeightsEndpoint, weights, options).map(this.response).catch(this.handleError);
    }

    public LoadWeights(user:number, configName:string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('user', user.toString());
        params.set('configName', configName);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        return this.http.get(this.loadWeightsEndpoint, requestOptions).map(this.response).catch(this.handleError);
    }

    private response(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: Response | any) {
        let errorMessage:string = "uh oh";
        console.log (errorMessage);
        return Observable.throw(errorMessage);
    }
}