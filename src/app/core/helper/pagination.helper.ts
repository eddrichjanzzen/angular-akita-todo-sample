import { PaginationResponse } from "@datorama/akita";
import { PaginatedRequestModel, PaginatedResponseModel } from "../models/generic.model";


export default class PaginationHelper {
    
    static transfomToAkitaPaginationMapper<T>(response: PaginatedResponseModel<T>, request: PaginatedRequestModel, idProp:string ="") : PaginationResponse<T> {
        
        let pagination: PaginationResponse<T> = {} as PaginationResponse<T>;
        
        var data: T[] = [];
        
        if(response.results && response.results.length > 0) {
            
            response.results.forEach((d: any, i: any ) => {
                if(idProp == null) 
                    data.push({...d, id: `${i}${request.page}`});
                else 
                    data.push({...d, id: d[idProp]});
            });

        }

        pagination.currentPage = request.page;
        pagination.data = data;
        pagination.perPage = 7;
        pagination.lastPage = Math.ceil(response.count / 7);
        pagination.total = response.count;
        
        return pagination;
    }
}