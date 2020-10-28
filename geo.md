### Dataset
```
mongoimport -d=geo -c=restaurants ./DataSet/geo/restaurants.json 
mongoimport -d=geo -c=neighborhoods ./DataSet/geo/neighborhoods.json
```


Things to talk about
1. GeoJSON Types
    * Point
    * Polygon [First and last coordinates should be same]
    * Others
2. GeoWithin
    * Use it with centerSphere
3. NearSphere
    * Along with point and distance (It is by default sorted)
    
