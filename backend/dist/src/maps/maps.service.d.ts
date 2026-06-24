export declare class MapsService {
    private readonly logger;
    private readonly headers;
    private nominatimQueue;
    private enforceNominatimRateLimit;
    estimateRoute(originLat: number, originLng: number, destLat: number, destLng: number): Promise<{
        distance: any;
        distanceText: string;
        duration: any;
        durationText: string;
        polyline: any;
    }>;
    autocomplete(input: string, lat?: number, lng?: number): Promise<{
        predictions: any;
    }>;
    geocode(placeId: string): Promise<{
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
    reverseGeocode(lat: number, lng: number): Promise<{
        results: {
            formatted_address: any;
        }[];
    }>;
}
