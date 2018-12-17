# Universal Dashboard

The dashboard can be run by manually installing all prerequisites or using Docker.
## Run with Docker

```
docker-compose build
docker-compose up
```

## Run
1. Install MongoDB
2. Install local MQTT broker or use any MQTT broker (optional for sample run)
3. Install all dependencies

```
npm install
```

4. Set NODE_ENV variables

```
# Default values if the environment is not set
MONGO_URL=mongodb://localhost:27017/universal-dashboard
MQTT_BROKER=mqtt://localhost
```

5. Run command

```
npm run start:dev
```

6. Look for sample dashboard id in the the print out. Access the dashboard using url: http://localhost:8080/dashboard/ [dashboard id]


![](/client/public/assets/gif/sample.gif)

![](/client/public/assets/img/saesl-dashboard.png)

## Architecture and Concepts

The universal dashboard is built with the idea that new dashboard can quickly built by plug-and-play different data sources and panels (UI widgets). The new data sources or panels can be easily implemented based on the well-defined interface and quickly added on in the existing package without having to build the whole application from scratch.

### Overall architecture and libraries/tools used

![](/client/public/assets/img/architecture.jpg)

[Edit](https://docs.google.com/drawings/d/15BdLE5HdutD2CGUDZv2gB6uqYpsvbTZkNyBlCpijWHU/edit?usp=sharing)

### Dashboard and panels (UI widgets)
A dashboard is comprised of multiple panels (UI widgets). The panel can be configured to populate the data sources of choice. There are several existing panels come with the package: Text, Gauge, Pie Chart, Bar Chart, etc. The developer can quickly write their own custom panel using the template below. As the whole dashboard is implemented using ReactJS/Redux, the panel is written just like a ReactJS component. Similar to existing panels, customised panels can be re-used in multiple dashboard.

``` javascript
const Text = (props) => {
  // 'data': Payload from the data source.
  // 'options': Panel options in configuration which is defined by developer
  const { data, options } = props;
  const extOptions = Object.assign({
    // Default options
  }, options);

  let shownText = extOptions.text

  return (
    <div className="text" style={extOptions.inlineStyle}>
      { shownText }
    </div>
  );
};
export default Text;
```

### Server & Socket.IO

The web server is written in NodeJS/Express using Socket.IO as the main method to communicate with the dashboard. When a particular dashboard is opened, the web server using relevant data services (MQTT, OPCUA, MySQL, etc) to connect the required data sources. Once it receives any data, it deliveries to client through Socket.IO. To prevent overload data in the client side, the user is able to set the rate where data is being sent to the client.

There are multiple REST APIs for CRUD operations on dashboard configurations, data sources and panels

### Database

MongoDB is used to store dashboard configurations which are defined in form of JSON format. The developer can modify the sources of data or panels used in a dashboard by using the user-friendly editor, REST API or modify directly in the database.

Example of the configuration:
```json

{
  "datasources": [
    {
      "name": "sample-datasource",
      "type": "mqtt",
      "host": "localhost",
      "topic": ["ud-points", "ud-status"],
      "rate": 5,
      "rateUnit": "s"
    }
  ],
  "panels": [
    {
      "datasource": {
          "name": "sample-datasource",
          "index": 0
      },
      "title": "Panel Title",
      "panel": "Text",
      "options": {
          "path": "data[0]",
          "inlineStyle": {
              "color": "blue"
          }
      }
    }
  ]
}
```

### Data services
The data services is meant for connecting data sources and listening/polling data. There are three existing data services: MQTT, OPCUA, MySQL. If a new type of data sources is required, the developer can write the customised service to cater for this and follow to the data service interface. Data will be automatically routed to according dashboard.

There is two main groups of data services: listening and polling. For MQTT and OPCUA, data service is listening for data from the data sources, and only push data to client when there is data coming from the data sources. The rate limiter is to prevent the unexpectedly high rate of data from the data sources which can causing congestion in the dashboard client. For MySQL and similar data service, rate limiter plays a role as scheduler which pulls data in specific interval.

## Configuration

### Data Sources


|          | Description                                                           | MQTT   | MYSQL   | OPCUA   |
|----------|-----------------------------------------------------------------------|--------|---------|---------|
| type     | Type of data services                                                 | 'MQTT' | 'MYSQL' | 'OPCUA' |
| name     | Unique identifier to be used in panels                                |        |         |         |
| rate     | Value for the rate limiter                                            |        |         |         |
| rateUnit | Unit for the key 'rate'. Values: 'h', 'm', 'ms'                       |        |         |         |
| url      | URL of the data source. If 'url' is set, 'host' and 'port' is ignored |        |         |         |
| host     |                                                                       |        |         |         |
| port     |                                                                       |        |         |         |
| topics   | MQTT topics to subscribe to. Format: ['topic1', 'topic2', 'topic3']   |        |         |         |
| username |                                                                       |        |         |         |
| password |                                                                       |        |         |         |
| database |                                                                       |        |         |         |
| queries  |                                                                       |        |         |         |
| nodeIds  |                                                                       |        |         |         |

Example:

Data source configuration to connect to MySQL
```
{
  "queries": [
      "select * from `tabSales Order Item` LIMIT 100"
  ],
  "name": "mysql-test",
  "type": "MYSQL",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "admin",
  "password": "admin",
  "database": "erp",
  "rate": 5,
  "rateUnit": "m"
}
```

### Panels
#### Text

#### Status Text

#### Gauge

#### Image

## API

### Create new dashboard

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

### Update dashboard

### Delete dashboard

## License
[MIT](https://choosealicense.com/licenses/mit/)
