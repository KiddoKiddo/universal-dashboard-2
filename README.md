# Universal Dashboard
## Prerequisite
1. Install MongoDB
2. Input the connection string of MongoDB in the file **/config/config.js**

## Installation

```
npm install
```

## Test run

![](/client/public/assets/gif/sample.gif)
1. Run sample mqtt data source
```
npm run test:mqtt
```
2. Run command
```
npm run start:dev
```
3. Using REST API to create new dashboard configuration as below.

4. Access to dashboard through link http://locahost:8080/dashboard/{_id}, where **_id** is the generated id for the dashboard configuration.

```
POST /api/dashboard
{
  "name": "Dashboard Sample",
  "datasources": [
    {
      "topics": [
        "ud-points",
        "ud-status"
      ],
      "name": "mqtt-test",
      "type": "MQTT",
      "host": "localhost",
      "rate": 1,
      "rateUnit": "s"
    }
  ],
  "panels": [
    {
      "datasource": {
        "name": "mqtt-test",
        "index": 0
      },
      "title": "Title 1",
      "panel": "Text",
      "options": {
        "path": "data[0]",
        "inlineStyle": {
          "color": "blue"
        }
      }
    },
    {
      "datasource": {
        "name": "mqtt-test",
        "index": 0
      },
      "title": "Title 2",
      "panel": "Text",
      "options": {
        "path": "data[1]",
        "inlineStyle": {
          "color": "red"
        }
      }
    },
    {
      "datasource": {
        "name": "mqtt-test",
        "index": 0
      },
      "title": "Title 3",
      "panel": "Text",
      "options": {
        "path": "data[2]",
        "inlineStyle": {
          "fontStyle": "italic"
        }
      }
    },
    {
      "datasource": {
        "name": "mqtt-test",
        "index": 0
      },
      "title": "Title 4",
      "panel": "Text",
      "options": {
        "path": "data[3]",
        "inlineStyle": {
          "fontSize": 70
        }
      }
    },
    {
      "datasource": {
        "name": "mqtt-test",
        "index": 0
      },
      "title": "Title 5",
      "panel": "Gauge",
      "options": {
        "path": "data[4]"
      }
    },
    {
      "datasource": {
        "name": "mqtt-test",
        "index": 1
      },
      "title": "Tile 6",
      "panel": "StatusText",
      "options": {
        "id": 1,
        "idPath": "machine",
        "statusPath": "status",
        "statusEncode": {
          "0": "Stop",
          "1": "Running",
          "2": "Idle"
        }
      }
    }
  ]
}
```


## Usage

## Configuration
### Data Sources
#### MySQL
Field | Description | Type | Required
----- | ----------- | ---- | --------
host  |
port  |
user  |
password|

## API

A version of API examples can be accessed from https://www.getpostman.com/collections/95a9355a87f3bf6fe205

1. Create new dashboard

```
POST /api/dashboard
{
  ...dashboard configuration...
}
```

Response

```
{
  ...dashboard configuration with generated _id...
}
```

2. Update dashboard

3. Delete dashboard

### Panels
#### Text

#### Status Text

#### Gauge

#### Image

## Contributing


## License
[MIT](https://choosealicense.com/licenses/mit/)
