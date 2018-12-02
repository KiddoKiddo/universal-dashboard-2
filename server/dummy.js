const Dashboard = require('./models/Dashboard');

module.exports = () => {
  Dashboard.count().exec((err, count) => {
    if (count > 0) {
      Dashboard.findOne({ name: 'SEASL Sample Dashboard' })
        .exec()
        .then(dashboard => console.log(`Sample dashboard: ${dashboard._id}`))
      return;
    }
    const dashboard = new Dashboard({
      name: 'SEASL Sample Dashboard',
      datasources: [
        {
          topics: [
            'seasl'
          ],
          name: 'mqtt-test',
          type: 'MQTT',
          host: process.env.MQTT_BROKER || 'localhost',
          rate: 2,
          rateUnit: 's'
        }
      ],
      panels: [
        {
          panel: 'Image',
          options: {
            url: 'https://3dfabprint.com/wp-content/uploads/sites/4/2014/08/3DP_ARTC_LOGO_HERO-15.jpg'
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          panel: 'StatusText',
          options: {
            idPath: 'machineName',
            statusPath: 'status',
            statusEncode: {
              0: 'Stop',
              1: 'Run',
              2: 'Idle',
              3: 'Setup'
            },
            statusStyle: {
              0: '#ffa4a2',
              1: '#98ee99',
              3: '#ffff8b'
            },
            showId: false
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          title: 'Machine Name',
          panel: 'Text',
          options: {
            path: 'machineName'
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          title: 'Operator Name',
          panel: 'Text',
          options: {
            path: 'operatorName'
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          panel: 'Text',
          options: {
            path: 'reasonCode'
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          panel: 'Text',
          options: {
            markup: '<div class=\"status-text-custom\"><div><span class=\"status-text-key\">Stopping Time:</span> <span class=\"status-text-value\">{{data.0}}</span> hours</div> <div><span class=\"status-text-key\">Running Time:</span> <span class=\"status-text-value\">{{data.1}}</span> hours</div> <div><span class=\"status-text-key\">Idling Time:</span> <span class=\"status-text-value\">{{data.2}}</span> hours</div> <div><span class=\"status-text-key\">Setup Time:</span> <span class=\"status-text-value\">{{data.3}}</span> hours</div></div>',
            markupPaths: [
              'stopTime',
              'runTime',
              'idleTime',
              'setupTime'
            ]
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          panel: 'Text',
          options: {
            markup: '<div class=\"status-text-custom\"><div><span class=\"status-text-key\">Up Time:</span> <span class=\"status-text-value\">{{data.0}}</span> hours</div> <div><span class=\"status-text-key\">Down Time:</span> <span class=\"status-text-value\">{{data.1}}</span> hours</div></div>',
            markupPaths: [
              'upTime',
              'downTime'
            ]
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          panel: 'Text',
          options: {
            markup: 'Shift: {{data.0}}',
            markupPaths: [
              'shift'
            ]
          }
        },
        {
          datasource: {
            name: 'mqtt-test',
            index: 0
          },
          panel: 'PieChart',
          options: {
            title: "",
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: false
                },
                showInLegend: true
              }
            },
            series: [
              {
                type: 'pie',
                colorByPoint: true,
                name: 'Time of current shift',
                data: [
                  'runTime',
                  'stopTime',
                  'idleTime',
                  'setupTime'
                ]
              }
            ]
          }
        }
      ]
    });
    dashboard
      .save()
      .then(db => console.log(`Sample dashboard (created): ${db._id}`));
  });
};
