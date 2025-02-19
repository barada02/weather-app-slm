api end point for forcast data:
https://api.tomorrow.io/v4/weather/forecast?location=new%20york&apikey=jyEodjqRRldYkRohEGaoEgiXLN9A61pW

response example:
{

"timelines": {
"minutely": [60 items],
"hourly": [120 items],
"daily": [7 items]
},
"location": {
"lat": 43.15616989135742,
"lon": -75.8449935913086,
"name": "New York, United States",
"type": "administrative"
}
}