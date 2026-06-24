import { MapsService } from './maps.service';
export declare class EstimateRouteDto {
    originLat: number;
    originLng: number;
    destLat: number;
    destLng: number;
}
export declare class AutocompleteDto {
    input: string;
    lat?: number;
    lng?: number;
}
export declare class GeocodeDto {
    placeId: string;
}
export declare class ReverseGeocodeDto {
    lat: number;
    lng: number;
}
export declare class MapsController {
    private readonly mapsService;
    constructor(mapsService: MapsService);
    estimateRoute(body: EstimateRouteDto): Promise<{
        distance: any;
        distanceText: string;
        duration: any;
        durationText: string;
        polyline: any;
    }>;
    autocomplete(body: AutocompleteDto): Promise<{
        predictions: any;
    }>;
    geocode(body: GeocodeDto): Promise<{
        result: {
            geometry: {
                location: {
                    lat: any;
                    lng: any;
                };
            };
            formatted_address: any;
            name: any;
        };
    }>;
    reverseGeocode(body: ReverseGeocodeDto): Promise<{
        results: {
            formatted_address: any;
        }[];
    }>;
}
